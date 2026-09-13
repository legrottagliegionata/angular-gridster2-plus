# angular-gridster2-plus

Community fork of [tiberiuzuld/angular-gridster2](https://github.com/tiberiuzuld/angular-gridster2), maintained as an independent open-source project. Upstream only bumps dependencies; this fork resumes bug fixing and development.

- Upstream remote: `upstream` → `https://github.com/tiberiuzuld/angular-gridster2.git`
- Upstream PR heads are fetched as `refs/upstream-pr/<number>` (`git fetch upstream pull/<n>/head:refs/upstream-pr/<n>`)
- Issues are disabled on the fork: read issues/PRs with `gh ... -R tiberiuzuld/angular-gridster2`
- Status of upstream PRs, known bugs and issue triage: [docs/upstream-tracking.md](docs/upstream-tracking.md)
- Package name, homepage, `angular.json` deploy target and `.github/workflows` still point to upstream. Renaming/publishing setup is intentionally deferred to the end.

## Commands

```bash
npm ci --legacy-peer-deps                 # plain `npm ci` fails: lockfile lacks peer zone.js
npm run test-lib -- --watch=false         # library unit tests (vitest + jsdom, zoneless)
npm run build-lib                         # ng-packagr build into dist/angular-gridster2
npm run lint                              # angular-eslint
npm start                                 # demo app (src/app) on localhost:4200
```

Do not commit incidental `package-lock.json` changes produced by `npm install`.

## Conventions

- Conventional commits, enforced by commitlint in the husky `commit-msg` hook; `pre-commit` runs prettier via lint-staged.
- When integrating an upstream PR: keep the original author (`--author`), reference it as `(upstream #<n>)` and the issues it fixes.
- Every behavioural fix comes with a regression spec in `projects/angular-gridster2/src/lib/tests/`.
- Components are standalone, `ChangeDetectionStrategy.OnPush`, `ViewEncapsulation.None`, signal `input()`/`output()`.

## Layout

- `projects/angular-gridster2/src/lib/` – the library (public surface in `src/public_api.ts`)
- `projects/angular-gridster2/src/lib/tests/` – specs
- `src/app/sections/*` – demo pages, one per feature; `src/assets/*.md` – their docs

## Architecture

```
Gridster (gridster.ts)            <gridster> container component
 ├─ $options                      computed: defaults (gridsterConfig.constant.ts) merged with options()
 ├─ layout                        setGridSize → setGridDimensions → calculateLayout → updateGrid
 ├─ collisions                    checkCollision / checkGridCollision / findItemWithItem(s)
 ├─ auto placement                getNextPossiblePosition / autoPositionItem
 ├─ GridsterRenderer              px styles for items, preview, grid lines (transform or top/left, RTL, mobile)
 ├─ GridsterCompact               compaction (up/left/right/down/combinations/grid)
 ├─ GridsterEmptyCell             click / contextmenu / HTML5 drop / drag-to-create on empty cells
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
- **Interaction lifecycle.** `dragStartDelay` → `dragStart` (registers document/window listeners, `mousemove`/`touchmove` outside the Angular zone) → `dragMove` → `calculateItemPosition` (push, swap, collision, preview) → `dragStop` → optional `stop` callback promise → `makeDrag`/`cancelDrag` (or `makeResize`/`cancelResize`). `dragStop` can fire after the item is destroyed: guard against `gridster`/`gridsterItem` being `null`.
- **Pixels ↔ cells.** `pixelsToPositionX/Y` clamp to `maxCols/maxRows` unless `noLimit`; `curColWidth`/`curRowHeight` include the margin; rendered item size is `cells * cur{Col,Row}Size - margin`.

### Testing notes

- Specs run zoneless (`provideZonelessChangeDetection`) under jsdom: no real layout, so `offsetWidth`, `getBoundingClientRect` etc. are 0 unless stubbed.
- Hand-written `GridsterItem` mocks must include the `isMoving` / `isResizing` signals used by drag/resize start/stop.
- Coverage of push/swap/resize logic is thin: add focused specs when touching it.
- When measuring layout in the demo from scripts, disable `transition` on `gridster-item` first: its `transition: .3s` animates sizes and even `flex-shrink`, so values are read mid-animation.
