# Upstream tracking

State of the work imported from [tiberiuzuld/angular-gridster2](https://github.com/tiberiuzuld/angular-gridster2). Numbers refer to upstream issues/PRs. Integration happens on branch `integrate/upstream-prs`, one squashed commit per PR, keeping the original author.

Last update: 2026-09-14.

## Community pull requests

Dependabot PRs are not tracked: dependencies are updated separately.

### Integrated

"Changed" means the upstream patch was modified before integration; every change has a spec that fails with the upstream version.

| PR    | Author              | Change                                                            | Fixes          | Notes                                                                                                                                                                                |
| ----- | ------------------- | ----------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1028 | Markus Mächler      | Auto-scroll reaches the very top/bottom                           | #1027          |                                                                                                                                                                                      |
| #993  | nexiumbiz-debug     | Chained push cannot land on the dragged item; rollback path index | #941, #715     | #941 symptom was already fixed by #955; upstream spec relied on the fallback removed there and was rewritten                                                                         |
| #990  | nexiumbiz-debug     | Display grid rows fit the grid without outer margin               | #922           |                                                                                                                                                                                      |
| #998  | nexiumbiz-debug     | Empty-cell drag ignores mousedown on the scrollbar                | #894           |                                                                                                                                                                                      |
| #1006 | nexiumbiz-debug     | Push attempts as a loop                                           | #943           | Rewritten on top of #955 (3 attempts instead of 4)                                                                                                                                   |
| #994  | nexiumbiz-debug     | Remove listeners on destroy, ignore late stop events              | #849 #850 #864 | Extended: also removes the `contextmenu` listener, releases `dragInProgress`/`movingItem` when destroyed mid-interaction, guards `makeDrag`/`cancelDrag`/`makeResize`/`cancelResize` |
| #1008 | nexiumbiz-debug     | Reset `positionX/Y` after a rejected `stop`                       | #694           |                                                                                                                                                                                      |
| #989  | nexiumbiz-debug     | `setGridSize` without outer margin                                | #920 #845      |                                                                                                                                                                                      |
| #1000 | nexiumbiz-debug     | Clamp loaded item size to min/max limits                          | #284           | Rewrites the user's item and emits `itemChange`                                                                                                                                      |
| #1001 | nexiumbiz-debug     | `getNextPossiblePosition` keeps a valid existing item             | #907           |                                                                                                                                                                                      |
| #1003 | nexiumbiz-debug     | `scrollVertical` rows do not shrink while dragging                | #794           | `verticalFixed` probably needs the same treatment                                                                                                                                    |
| #997  | nexiumbiz-debug     | Reset `lastMouse` at the start of every drag                      | #854 (1/2)     | Spec mock gained `isMoving`                                                                                                                                                          |
| #999  | nexiumbiz-debug     | Empty-cell drag honours `minItemCols/Rows`                        | #417           |                                                                                                                                                                                      |
| #992  | nexiumbiz-debug     | Clamp empty-cell click/drop items inside the grid                 | #912           | Changed: no clamp during drag-to-create, it moved the anchor cell                                                                                                                    |
| #991  | nexiumbiz-debug     | RTL empty-cell X position                                         | #909           | Changed: RTL subtracts the negative `scrollLeft` and uses the right outer margin                                                                                                     |
| #1002 | nexiumbiz-debug     | Mobile items keep the desktop order (flex `order`)                | #924           | Changed: `flex-shrink: 0` on mobile items. Measured in the demo at 375px with transitions disabled: without it 174px items shrink to 68px (27px in a 400px grid)                     |
| #1025 | Enrique Laffranconi | Feature: `enableEmptyCellHover` preview                           | –              | Changed: the hover only hides/replaces the preview it owns, click/contextmenu still ignore the click that ends another interaction. Checked in the demo                              |

### Decision needed

| PR    | Author          | Change                                                          | Fixes        | Notes                                                                                                                                                                   |
| ----- | --------------- | --------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #1026 | dvwid           | Auto-scroll triggered by pointer position instead of item edges | #1012 (#979) | Standard DnD behaviour and fixes oversized items, but changes UX for everyone (with the default `scrollSensitivity: 10` the pointer must reach the edge). Overlaps #988 |
| #988  | nexiumbiz-debug | Do not auto-scroll towards an edge the pointer moves away from  | #979 #784    | Conflicts with #1026; mostly redundant if #1026 is taken                                                                                                                |

### Needs rework / rejected

| PR    | Author          | Change                                     | Fixes | Reason                                                                                                                                                                                                                                                 |
| ----- | --------------- | ------------------------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1009 | nexiumbiz-debug | `ResizeObserver` on the host element       | #824  | Rework: callback runs outside NgZone (zone.js apps get no change detection for `itemResize` handlers); ignores `disableWindowResize` (the #824 reporter used that flag plus their own observer → double layout); check the `setGridSize` feedback loop |
| #1011 | nexiumbiz-debug | Reposition the dragged item on grid scroll | #735  | Rejected as-is: during auto-scroll `gridsterScroll` already adds the scroll delta to the pointer position, the new scroll listener adds it again from `scrollTop`, so the item runs ahead. Needs a single source of truth for pointer vs scroll offset |
| #987  | nexiumbiz-debug | `ignoreMarginInRow` item sizing            | #977  | Rejected: changes the intended semantics. `ignoreMarginInRow` was added by #227 (for #224) to make the row pitch `fixedRowHeight` while still subtracting one margin per item. #977 is a documentation problem                                         |

## Bugs found by code review (no upstream PR)

| Where                                      | Problem                                                                                               |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `gridsterRenderer.updateItem`              | Right outer margin is guarded by `outerMarginBottom !== null` instead of `outerMarginRight`           |
| `gridsterRenderer.updateItem` (mobile)     | `DirTypes.LTR ? 'margin-right' : 'margin-left'` is a constant condition, RTL clears the wrong margin  |
| `gridsterPushResize.restoreItems`          | Restores `$item.row` instead of `rows`                                                                |
| `gridsterCompact.checkCompactItem`         | Missing `compactRight` and `compactRight&Up` (handled in `checkCompact`)                              |
| `gridster.addItem` / `autoPositionItem`    | Warnings stringify the `item` signal instead of its value (prints `undefined`), `/n` instead of `\n`  |
| `gridsterScroll.ts`                        | `window` accessed at module load: breaks SSR (#548)                                                   |
| `gridsterEmptyCell.emptyCellMouseDown`     | `e instanceof TouchEvent` throws where `TouchEvent` is undefined (desktop Safari) on non-left buttons |
| `gridster.calculateLayout` (`setGridSize`) | Grid size adds `margin` for both outer sides, ignoring `outerMarginLeft/Right/Top/Bottom` overrides   |
| `gridsterItem.bringToFront/sendToBack`     | Mutate `item().layerIndex`, which the `zIndex` computed does not track (to verify)                    |

## Upstream issues already fixed in code but still open

#810 (optional chaining in resizable destroy), #916 (zoneless works, upstream #917), #941 (fixed by #955), likely #830.

## Notes for browser checks

`gridster-item` has `transition: .3s` on every property: disable transitions before measuring layout from scripts, otherwise sizes and even `flex-shrink` are read mid-animation.

## Lint

`ng lint angular-gridster2` is red on upstream master (checked 2026-09-14): 36 problems, mostly `consistent-type-definitions` on exported `type`s, `prefer-for-of`, `no-inferrable-types` and `any`/unused variables in `gridsterUtils.spec.ts`. The integration branch brings them down to 32 (upstream #1006 removes the four redundant `: string` annotations in `gridsterPush.ts`) and adds none. Switching the public `type`s to `interface` is an API-visible change to plan separately.

## Issue triage

Not started. Snapshot 2026-09-13: 324 open issues; labels: 42 question, 23 enhancement, 16 bug; 59% opened in 2018–2020.
