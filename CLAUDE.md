# angular-gridster2-plus

Community fork of [tiberiuzuld/angular-gridster2](https://github.com/tiberiuzuld/angular-gridster2), maintained as an independent open-source project. Upstream only bumps dependencies; this fork resumes bug fixing and development.

- Published as `angular-gridster2-plus` (not on npm yet: the first release is manual, later releases go through `publish.yml` on `v*` tags with npm trusted publishing)
- Demo: https://legrottagliegionata.github.io/angular-gridster2-plus, deployed by the `Deploy Demo` workflow from `master` to `gh-pages`
- Changes land on `master` through pull requests; the `CI` workflow runs the library tests and builds the library and the demo
- Upstream remote: `upstream` → `https://github.com/tiberiuzuld/angular-gridster2.git`
- Upstream PR heads are fetched as `refs/upstream-pr/<number>` (`git fetch upstream pull/<n>/head:refs/upstream-pr/<n>`)
- Issues are enabled on the fork; upstream issues/PRs are read with `gh ... -R tiberiuzuld/angular-gridster2`
- The repository is a GitHub fork: always pass `-R legrottagliegionata/angular-gridster2-plus` to `gh pr create`, otherwise gh may target upstream
- Status of upstream PRs and known bugs: [docs/upstream-tracking.md](docs/upstream-tracking.md); triage of the open upstream issues: [docs/issue-triage.md](docs/issue-triage.md)

## Commands

```bash
npm ci --legacy-peer-deps                 # plain `npm ci` fails: lockfile lacks peer zone.js
npm run test-lib -- --watch=false         # library unit tests (vitest + jsdom, zoneless)
npm run build-lib                         # ng-packagr build into dist/angular-gridster2
npx ng build gridster-app                 # production build of the demo (needs build-lib first), baseHref /angular-gridster2-plus/
npm run lint                              # angular-eslint; 32 problems inherited from upstream, do not add new ones
npm start                                 # demo app (src/app) on localhost:4200
```

Do not commit incidental `package-lock.json` changes produced by `npm install`.

## Conventions

- Conventional commits, enforced by commitlint in the husky `commit-msg` hook; `pre-commit` runs prettier via lint-staged.
- When integrating an upstream PR: keep the original author (`--author`), reference it as `(upstream #<n>)` and the issues it fixes.
- Every behavioural fix comes with a regression spec in `projects/angular-gridster2/src/lib/tests/`.
- Components are standalone, `ChangeDetectionStrategy.OnPush`, `ViewEncapsulation.None`, signal `input()`/`output()`.
- Upstream is referenced only for credits and upstream tracking: package metadata, demo links and workflows point to this repository.

## Layout

- `projects/angular-gridster2/src/lib/` – the library (public surface in `src/public_api.ts`); the folder, the Angular project and `dist/angular-gridster2` keep the upstream name, the npm package is `angular-gridster2-plus`
- `projects/angular-gridster2/src/lib/tests/` – specs
- `projects/angular-gridster2/README.md` and `LICENSE` are symlinks to the root files: edit the root ones
- `src/app/sections/*` – demo pages, one per feature. They only show examples and link to the matching wiki page (Docs button). The demo imports `angular-gridster2-plus`, mapped by the `tsconfig.json` path alias to `dist/angular-gridster2` or the library sources
- `wiki/` – source of the GitHub wiki (the user documentation). Update it in the same PR as any behaviour or option change; `wiki.yml` publishes it on merge. Internal links are `[Text](Page-Name#anchor)`
- `.github/workflows/` – `ci.yml` (pull requests and `master`), `deploy-demo.yml` (`master`, manual), `wiki.yml` (`wiki/` changes on `master`, manual), `publish.yml` (`v*` tags)

## Architecture

```
Gridster (gridster.ts)            <gridster> container component
 ├─ $options                      computed: defaults (gridsterConfig.constant.ts) merged with options()
 ├─ layout                        setGridSize → setGridDimensions → calculateLayout → updateGrid
 ├─ collisions                    checkCollision / checkGridCollision / findItemWithItem(s)
 ├─ auto placement                getNextPossiblePosition / autoPositionItem
 ├─ GridsterRenderer              px styles for items, preview, grid lines, scroll spacer (transform or top/left, RTL, mobile)
 ├─ GridsterCompact               compaction (up/left/right/down/combinations/grid)
 ├─ GridsterEmptyCell             click / contextmenu / HTML5 drop / drag-to-create / hover preview on empty cells
 └─ GridsterPreview               <gridster-preview>, shadow of the target position
GridsterItem (gridsterItem.ts)    <gridster-item>
 ├─ GridsterDraggable             mouse → px → cell, then GridsterPush + GridsterSwap
 └─ GridsterResizable             8 handles, GridsterPushResize + GridsterPush, aspect ratio
Per-interaction helpers           GridsterPush, GridsterPushResize, GridsterSwap (created on drag/resize start, destroyed on stop)
gridsterScroll.ts                 edge auto-scroll; keeps its state in MODULE-LEVEL variables
```

### Key concepts

- **Two copies of every item.** `item()` is the user's object (committed state). `$item()` is a working copy built with `GridsterUtils.merge` and **mutated in place** during drag/resize (it is not reactive). On stop, `checkItemChanges($item, item)` validates and writes back to `item()` and emits `itemChange`; on cancel, `restoreItems()` / `cancelDrag()` copy `item()` back into `$item()`. Most push/swap/resize bugs are a desync between the two.
- **Options merge.** `$options` is recomputed only when the `options` input gets a new object reference (there is no `api.optionsChanged()` anymore). `GridsterUtils.merge` only copies keys that exist in `GridsterConfigService`, so a new option must be added to both `gridsterConfig.ts` (type) and `gridsterConfig.constant.ts` (default), otherwise it is silently dropped from `$options`.
- **Interaction lifecycle.** `dragStartDelay` → `dragStart` (registers document/window listeners, `mousemove`/`touchmove` outside the Angular zone) → `dragMove` → `calculateItemPosition` (push, swap, collision, preview) → `dragStop` → optional `stop` callback promise → `makeDrag`/`cancelDrag` (or `makeResize`/`cancelResize`). `dragStop` and the `stop` promise can settle after the item is destroyed: guard against `gridster`/`gridsterItem` being `null`.
- **Shared preview.** `gridster.movingItem` drives `<gridster-preview>` and is shared by item drag, empty-cell drag, HTML5 drop and the empty-cell hover; the hover only touches the preview it owns (`GridsterEmptyCell.hoverItem`).
- **Pixels ↔ cells.** `pixelsToPositionX/Y` clamp to `maxCols/maxRows` unless `noLimit`; `curColWidth`/`curRowHeight` include the margin; rendered item size is `cells * cur{Col,Row}Size - margin`. In RTL, horizontal positions are measured from the right edge and `scrollLeft` is negative.

### Testing notes

- Specs run zoneless (`provideZonelessChangeDetection`) under jsdom: no real layout, so `offsetWidth`, `getBoundingClientRect` etc. are 0 unless stubbed.
- Hand-written `GridsterItem` mocks must include the `isMoving` / `isResizing` signals used by drag/resize start/stop; pass untyped mocks `as never` instead of typing them `any`.
- Coverage of push/swap/resize logic is thin: add focused specs when touching it.
- When measuring layout in the demo from scripts, disable `transition` on `gridster-item` first: its `transition: .3s` animates sizes and even `flex-shrink`, so values are read mid-animation.
- Resize and scrollbar behaviour needs real layout. The Browser pane on macOS uses overlay scrollbars: force classic ones with `::-webkit-scrollbar { width: 15px; height: 15px }`. The `/misc` demo sets `disableWindowResize: true` (no `ResizeObserver`, no window listener): override it before testing resizes.
- Push/swap bugs are best reproduced on real components in jsdom: drive `item.drag.dragStart()` → set `drag.left/top` → `drag.calculateItemPosition()` → `drag.dragStop()` with a `fixed` grid (`fixedColWidth`/`fixedRowHeight` 100, margin 0) and `gridster.calculateLayout()` first (see `tests/gridsterSwap.spec.ts`).
- On GitHub Pages, deep links such as `/emptyCell` are served through `404.html`: they work in the browser but return HTTP 404.
