# Upstream issue triage

Triage of the open issues of [tiberiuzuld/angular-gridster2](https://github.com/tiberiuzuld/angular-gridster2/issues) against this fork. Snapshot: 2026-09-14, 324 open issues. "Interest" is comments plus reactions. Generated from the triage data; status of pull requests and fixes is in [upstream-tracking.md](upstream-tracking.md).

## Summary

| Category                     | Issues |
| ---------------------------- | ------ |
| Fixed or already covered     | 33     |
| Probable bugs to reproduce   | 60     |
| Feature requests             | 109    |
| Questions for the docs / FAQ | 77     |
| Can be closed                | 45     |

Most open issues are old: 193 were opened before 2021.

## Suggested next steps

1. **Reproduce the probable bugs in the demo**, starting from the most requested themes (below, sorted by interest). Open an issue on this repository for each confirmed one.
2. **Check the issues marked as probably fixed** (upstream #371, #838, #919, #784, #779, #752 and the hidden or nested container group) against the current demo.
3. **Write a FAQ** from the question groups; a handful of pages would answer most of them.
4. **Pick roadmap themes** from the feature requests; by interest, drag between grids and from outside (66), drag and resize constraints (38), events and callbacks (33), programmatic changes with push (24) and sizing (23) lead. Accessibility has little interest upstream but matters for anyone with accessibility requirements.
5. Issues in "Can be closed" need no work in the fork.

## Fixed or already covered

### Fixed by the fork or by upstream changes merged before the fork

| Issue                                                                 | Title                                                                                                                                            | Opened     | Interest | Note                                                                                                           |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| [#916](https://github.com/tiberiuzuld/angular-gridster2/issues/916)   | Zoneless angular support                                                                                                                         | 2024-06-07 | 6        | zoneless works since upstream #917                                                                             |
| [#850](https://github.com/tiberiuzuld/angular-gridster2/issues/850)   | Cannot read properties of undefined (reading 'renderer')                                                                                         | 2023-01-24 | 6        | #1 (upstream #994)                                                                                             |
| [#765](https://github.com/tiberiuzuld/angular-gridster2/issues/765)   | Question: How to make dragged-item appear overtop all other items?                                                                               | 2021-09-02 | 6        | same as #870 (upstream #985)                                                                                   |
| [#870](https://github.com/tiberiuzuld/angular-gridster2/issues/870)   | How to get the item dragged always over others?                                                                                                  | 2023-03-08 | 5        | items get a higher z-index while moving or resizing (upstream #985)                                            |
| [#725](https://github.com/tiberiuzuld/angular-gridster2/issues/725)   | Bind (drop) listener to gridster-item. Allow dropping on existing item.                                                                          | 2021-03-11 | 5        | enableOccupiedCellDrop allows dropping on occupied cells                                                       |
| [#845](https://github.com/tiberiuzuld/angular-gridster2/issues/845)   | Using VerticalFixed with setGridSize causes the grid to become wider on each update                                                              | 2022-11-25 | 4        | #1 (upstream #989)                                                                                             |
| [#562](https://github.com/tiberiuzuld/angular-gridster2/issues/562)   | Gridster Item drag stuck                                                                                                                         | 2019-10-18 | 4        | drag stops on contextmenu, which Ctrl+click on macOS triggers (upstream #995)                                  |
| [#1012](https://github.com/tiberiuzuld/angular-gridster2/issues/1012) | Dragging an oversized item always moves downwards                                                                                                | 2026-07-02 | 3        | #5 (upstream #1026)                                                                                            |
| [#941](https://github.com/tiberiuzuld/angular-gridster2/issues/941)   | Unexpected swap of first/second items when dragging fourth item in vertical push (pushDirections: north/south only)                              | 2025-07-14 | 3        | #1 (upstream #955 and #993)                                                                                    |
| [#849](https://github.com/tiberiuzuld/angular-gridster2/issues/849)   | Cannot set properties of undefined (setting 'dragInProgress')                                                                                    | 2023-01-24 | 3        | #1 (upstream #994)                                                                                             |
| [#794](https://github.com/tiberiuzuld/angular-gridster2/issues/794)   | Rows are being deleted automatically while scrolling up just for a little bit and I can't control that behavior inside Scroll Vertical grid type | 2022-02-28 | 3        | #1 (upstream #1003) and #4 for verticalFixed                                                                   |
| [#548](https://github.com/tiberiuzuld/angular-gridster2/issues/548)   | Angular-gridster SSR support ?                                                                                                                   | 2019-09-06 | 3        | #4 removes the module-level window access; useBodyForBreakpoint still reads document                           |
| [#349](https://github.com/tiberiuzuld/angular-gridster2/issues/349)   | Disable resize for some grid elements                                                                                                            | 2018-05-23 | 3        | per-item resizeEnabled and resizableHandles cover this                                                         |
| [#139](https://github.com/tiberiuzuld/angular-gridster2/issues/139)   | Add Unit Tests to the codebase                                                                                                                   | 2017-10-08 | 3        | every fix in the fork adds specs (33 to 123 tests); push/swap/resize coverage is still thin                    |
| [#830](https://github.com/tiberiuzuld/angular-gridster2/issues/830)   | GridsterItem resizableHandles property overrides the whole grid instead of each item                                                             | 2022-08-25 | 2        | per-item resizableHandles are merged with the grid ones in getResizableHandles; confirm                        |
| [#824](https://github.com/tiberiuzuld/angular-gridster2/issues/824)   | Suggestion: track resize with ResizeObserver.                                                                                                    | 2022-07-14 | 2        | #5 (upstream #1009)                                                                                            |
| [#1027](https://github.com/tiberiuzuld/angular-gridster2/issues/1027) | Vertical scroll not scrolling to the very top                                                                                                    | 2026-08-31 | 1        | #1 (upstream #1028)                                                                                            |
| [#943](https://github.com/tiberiuzuld/angular-gridster2/issues/943)   | Refactor repeated if/else if branches in push logic to loop for maintainability                                                                  | 2025-08-11 | 1        | #1 (upstream #1006)                                                                                            |
| [#922](https://github.com/tiberiuzuld/angular-gridster2/issues/922)   | When dragging an item to the last column an unusable column appears on the grid                                                                  | 2024-08-12 | 1        | #1 (upstream #990)                                                                                             |
| [#912](https://github.com/tiberiuzuld/angular-gridster2/issues/912)   | Gridster not allowing to add item when defaultItemCols and defaultItemRows is more then 1.                                                       | 2024-04-29 | 1        | #1 (upstream #992)                                                                                             |
| [#864](https://github.com/tiberiuzuld/angular-gridster2/issues/864)   | Cannot read properties of null (reading 'renderer')\n at dragStop                                                                                | 2023-02-09 | 1        | #1 (upstream #994)                                                                                             |
| [#810](https://github.com/tiberiuzuld/angular-gridster2/issues/810)   | Probably noticed a bug during code review                                                                                                        | 2022-04-18 | 1        | the resizable teardown already uses optional chaining                                                          |
| [#979](https://github.com/tiberiuzuld/angular-gridster2/issues/979)   | Grid type "fixed": Moving and resizing the bottom-most panel is very difficult                                                                   | 2026-04-07 | 0        | #5 (upstream #1026, pointer-based auto-scroll): confirm in the demo                                            |
| [#924](https://github.com/tiberiuzuld/angular-gridster2/issues/924)   | Gridster2 Items Not Ordering in Mobile View as in Desktop View                                                                                   | 2024-09-23 | 0        | #1 (upstream #1002)                                                                                            |
| [#920](https://github.com/tiberiuzuld/angular-gridster2/issues/920)   | Gridster height does not exclude outerMargin when unused                                                                                         | 2024-07-17 | 0        | #1 (upstream #989)                                                                                             |
| [#909](https://github.com/tiberiuzuld/angular-gridster2/issues/909)   | Empty Cell drop effect - RTL issue                                                                                                               | 2024-03-28 | 0        | #1 (upstream #991)                                                                                             |
| [#907](https://github.com/tiberiuzuld/angular-gridster2/issues/907)   | getNextPossiblePosition() method issue                                                                                                           | 2024-03-20 | 0        | #1 (upstream #1001)                                                                                            |
| [#894](https://github.com/tiberiuzuld/angular-gridster2/issues/894)   | Scrolling the grid with "verticalFixed" mode and emptyCellDrag enabled                                                                           | 2023-09-21 | 0        | #1 (upstream #998)                                                                                             |
| [#854](https://github.com/tiberiuzuld/angular-gridster2/issues/854)   | More issues with enableBoundaryControl (with suggested fixes)                                                                                    | 2023-01-30 | 0        | #1 (upstream #997) fixes the stale pointer baseline; the other enableBoundaryControl points still need a check |
| [#715](https://github.com/tiberiuzuld/angular-gridster2/issues/715)   | bug and the fix for two way direction push (north/south)                                                                                         | 2021-02-09 | 0        | #1 (upstream #993)                                                                                             |
| [#694](https://github.com/tiberiuzuld/angular-gridster2/issues/694)   | draggable.stop callback rejection - still contains old drag position                                                                             | 2020-11-20 | 0        | #1 (upstream #1008)                                                                                            |
| [#417](https://github.com/tiberiuzuld/angular-gridster2/issues/417)   | Create item from empty cell                                                                                                                      | 2018-09-18 | 0        | #1 (upstream #999)                                                                                             |
| [#284](https://github.com/tiberiuzuld/angular-gridster2/issues/284)   | bug max/min item cols/rows does not limit rows,cols if not resize                                                                                | 2018-03-30 | 0        | #1 (upstream #1000)                                                                                            |

## Probable bugs to reproduce

| Theme                                                             | Issues | Interest |
| ----------------------------------------------------------------- | ------ | -------- |
| Outer margins in scrolling grids                                  | 7      | 47       |
| Push and swap                                                     | 15     | 36       |
| Resize and scrollbar feedback loops                               | 6      | 26       |
| Layout and options                                                | 9      | 21       |
| Hidden or nested containers, likely helped by #5 (ResizeObserver) | 8      | 18       |
| Drag and resize interaction                                       | 9      | 15       |
| Display grid lines                                                | 2      | 2        |
| Browser zoom and scale                                            | 4      | 2        |

### Outer margins in scrolling grids

| Issue                                                               | Title                                                   | Opened     | Interest | Note                                                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------------------- |
| [#696](https://github.com/tiberiuzuld/angular-gridster2/issues/696) | Grid Type VerticalFixed ignores outerMarginBottom       | 2020-12-01 | 21       | verticalFixed ignores outerMarginBottom, most upvoted bug                          |
| [#721](https://github.com/tiberiuzuld/angular-gridster2/issues/721) | Bug: Grid Margin Bottom for Scroll Vertical not working | 2021-02-24 | 19       | bottom outer margin missing with scrollVertical, reproducible in the upstream demo |
| [#547](https://github.com/tiberiuzuld/angular-gridster2/issues/547) | outerMargin not applied when grid type is 'fixed'       | 2019-09-04 | 3        | right outer margin with gridType fixed                                             |
| [#491](https://github.com/tiberiuzuld/angular-gridster2/issues/491) | Margin Bottom Edge/Firefox Scroll Vertical              | 2019-04-16 | 2        | bottom margin with scrollVertical in Firefox                                       |
| [#739](https://github.com/tiberiuzuld/angular-gridster2/issues/739) | Outer margin features within a containing div tag       | 2021-05-14 | 1        | outerMarginBottom inside a container                                               |
| [#505](https://github.com/tiberiuzuld/angular-gridster2/issues/505) | Extra margin at the bottom                              | 2019-05-27 | 1        | extra bottom space with decimal row counts                                         |
| [#515](https://github.com/tiberiuzuld/angular-gridster2/issues/515) | outermargin right and bottom problems                   | 2019-06-18 | 0        | right/bottom outer margin with many rows (repro)                                   |

### Push and swap

| Issue                                                               | Title                                                                       | Opened     | Interest | Note                                                                     |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------- | -------- | ------------------------------------------------------------------------ |
| [#281](https://github.com/tiberiuzuld/angular-gridster2/issues/281) | Big item can not push smaller item via push.pushItems                       | 2018-03-27 | 15       | a bigger item cannot push smaller ones through pushItems                 |
| [#514](https://github.com/tiberiuzuld/angular-gridster2/issues/514) | Items sometimes overlap after dragging item                                 | 2019-06-17 | 8        | items overlap after dragging                                             |
| [#779](https://github.com/tiberiuzuld/angular-gridster2/issues/779) | Bug: Strange behavior on dragging the lowest element                        | 2021-12-20 | 4        | dragging the lowest item moves the first one (repro); may be fixed by #1 |
| [#368](https://github.com/tiberiuzuld/angular-gridster2/issues/368) | Vertical resizing can be prevented by an item in column 0                   | 2018-06-20 | 2        | vertical resize blocked by an item in column 0                           |
| [#363](https://github.com/tiberiuzuld/angular-gridster2/issues/363) | push api doesnt work even when width of each item is same                   | 2018-06-09 | 2        | push API with same-size items                                            |
| [#882](https://github.com/tiberiuzuld/angular-gridster2/issues/882) | drag and swap according to bottom tile height not working                   | 2023-05-18 | 1        | swap waits for the full height of the bigger item                        |
| [#818](https://github.com/tiberiuzuld/angular-gridster2/issues/818) | Gridster item order changes when drag and drop or resize a widget from side | 2022-06-02 | 1        | other items change order when dragging or resizing into a column         |
| [#753](https://github.com/tiberiuzuld/angular-gridster2/issues/753) | Swapping and dragging issue                                                 | 2021-06-30 | 1        | disablePushOnDrag still pushes while swapping                            |
| [#752](https://github.com/tiberiuzuld/angular-gridster2/issues/752) | All rows moved when I just moved one row                                    | 2021-06-29 | 1        | moving one row moves the first row; may be fixed by #1                   |
| [#484](https://github.com/tiberiuzuld/angular-gridster2/issues/484) | Widgets can be placed on top of each other                                  | 2019-03-28 | 1        | items can end up on top of each other (repro)                            |
| [#893](https://github.com/tiberiuzuld/angular-gridster2/issues/893) | cannot swap and push items smoothly in vertical scroll                      | 2023-09-20 | 0        | items of different sizes cannot swap/push in scrollVertical (repro)      |
| [#892](https://github.com/tiberiuzuld/angular-gridster2/issues/892) | Indefinite swap of items when they are in the top left corner of the grid   | 2023-09-13 | 0        | endless swap near the top-left corner                                    |
| [#613](https://github.com/tiberiuzuld/angular-gridster2/issues/613) | allowMultiLayer is not working                                              | 2020-04-16 | 0        | allowMultiLayer item drawn under a lower layer                           |
| [#558](https://github.com/tiberiuzuld/angular-gridster2/issues/558) | Pushing down problems when Items are on top.                                | 2019-10-04 | 0        | a same-size item cannot push two items at the top                        |
| [#543](https://github.com/tiberiuzuld/angular-gridster2/issues/543) | push itemsfrom East are not working                                         | 2019-08-27 | 0        | GridsterPush.pushItems(fromEast) pushes west                             |

### Resize and scrollbar feedback loops

| Issue                                                               | Title                                                                                                                                                                                                                                             | Opened     | Interest | Note                                                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ----------------------------------------------------------------------------------- |
| [#371](https://github.com/tiberiuzuld/angular-gridster2/issues/371) | Set OuterMargin = false make grid to expand indefinitely.                                                                                                                                                                                         | 2018-06-24 | 14       | outerMargin false makes the grid grow; probably fixed by #1 (upstream #989)         |
| [#669](https://github.com/tiberiuzuld/angular-gridster2/issues/669) | Resizing screen causes wobbling when scrollbar appears and dissappears                                                                                                                                                                            | 2020-09-10 | 6        | wobbling when the scrollbar appears                                                 |
| [#899](https://github.com/tiberiuzuld/angular-gridster2/issues/899) | [BUG] - Grid is bouncing/jumping in specifc browser size                                                                                                                                                                                          | 2023-11-23 | 3        | grid bounces at specific widths (repro)                                             |
| [#919](https://github.com/tiberiuzuld/angular-gridster2/issues/919) | Gridster items 'fly away' when dragged near the grid boundary                                                                                                                                                                                     | 2024-07-17 | 2        | items fly away near the boundary with setGridSize + fixed; re-check after #5        |
| [#678](https://github.com/tiberiuzuld/angular-gridster2/issues/678) | Does not allow scrolling when empty                                                                                                                                                                                                               | 2020-10-01 | 1        | empty grid keeps scrolling back to the top (onResize loop)                          |
| [#838](https://github.com/tiberiuzuld/angular-gridster2/issues/838) | When I am setting setGridSize to "true" and gridType: GridType.VerticalFixed with fixedRowHeight: 202. I am getting horizontal scroll. Which I have fixed by setting gridster width to 100%. But issue is gridster container is now not centered. | 2022-10-04 | 0        | setGridSize + verticalFixed horizontal scroll; probably fixed by #1 (upstream #989) |

### Layout and options

| Issue                                                               | Title                                                                    | Opened     | Interest | Note                                                                                   |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------- | -------- | -------------------------------------------------------------------------------------- |
| [#525](https://github.com/tiberiuzuld/angular-gridster2/issues/525) | gridSizeChangedCallback not working                                      | 2019-07-09 | 10       | gridSizeChangedCallback fires only when rows/columns change, not on pixel size changes |
| [#402](https://github.com/tiberiuzuld/angular-gridster2/issues/402) | Block scroll according to the number of columns                          | 2018-08-06 | 5        | horizontal scroll with a single column                                                 |
| [#616](https://github.com/tiberiuzuld/angular-gridster2/issues/616) | Text blur issue by using translate3D repeat issue                        | 2020-05-19 | 3        | blurry text with translate3d positioning                                               |
| [#513](https://github.com/tiberiuzuld/angular-gridster2/issues/513) | emptyCellDropCallback is called twice                                    | 2019-06-17 | 2        | emptyCellDropCallback called twice                                                     |
| [#949](https://github.com/tiberiuzuld/angular-gridster2/issues/949) | gridster height is not correct                                           | 2025-10-29 | 1        | verticalFixed height with a computed fixedRowHeight                                    |
| [#904](https://github.com/tiberiuzuld/angular-gridster2/issues/904) | The vertical scroll does not work in mobile with fixedVertical           | 2024-01-25 | 0        | verticalFixed does not scroll in the mobile layout                                     |
| [#875](https://github.com/tiberiuzuld/angular-gridster2/issues/875) | can not adding new item                                                  | 2023-03-15 | 0        | cannot add an item after deleting the first one (demo)                                 |
| [#777](https://github.com/tiberiuzuld/angular-gridster2/issues/777) | check option addEmptyRowsCount                                           | 2021-12-07 | 0        | addEmptyRowsCount reported as not working                                              |
| [#606](https://github.com/tiberiuzuld/angular-gridster2/issues/606) | Position does not persisting when switching between multiple dashboards. | 2020-03-17 | 0        | positions reverted when switching between dashboards with compaction                   |

### Hidden or nested containers, likely helped by #5 (ResizeObserver)

| Issue                                                               | Title                                                                                         | Opened     | Interest | Note                                                                         |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------------- |
| [#590](https://github.com/tiberiuzuld/angular-gridster2/issues/590) | Issue when using setting gridType: GridType.FIT,                                              | 2020-02-11 | 7        | gridType fit inside ngb-tabset                                               |
| [#486](https://github.com/tiberiuzuld/angular-gridster2/issues/486) | Not detect window resize                                                                      | 2019-03-31 | 4        | container resize not detected (setGridSize keeps the content size by design) |
| [#624](https://github.com/tiberiuzuld/angular-gridster2/issues/624) | Issue while fetching curColWidth/curRowHeight for inner gridster when used in nested gridster | 2020-06-14 | 3        | nested grid computes cell size late                                          |
| [#649](https://github.com/tiberiuzuld/angular-gridster2/issues/649) | Question: Gridster with Material Tabs                                                         | 2020-07-22 | 2        | grid inside Material tabs                                                    |
| [#557](https://github.com/tiberiuzuld/angular-gridster2/issues/557) | Issue when loading same component on two tabs on same page                                    | 2019-10-03 | 2        | same component in two tabs                                                   |
| [#598](https://github.com/tiberiuzuld/angular-gridster2/issues/598) | Width and Height issue when using gridster in two level                                       | 2020-02-28 | 0        | nested grid does not get its size                                            |
| [#594](https://github.com/tiberiuzuld/angular-gridster2/issues/594) | Issue when using gridster with ngb nav with setting destroy on hide false                     | 2020-02-25 | 0        | ng-bootstrap nav with destroyOnHide=false                                    |
| [#575](https://github.com/tiberiuzuld/angular-gridster2/issues/575) | Issue when loading gridster with ngbtabset                                                    | 2019-12-20 | 0        | ng-bootstrap tabset with destroyOnHide=false                                 |

### Drag and resize interaction

| Issue                                                               | Title                                                                                       | Opened     | Interest | Note                                                                                       |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------ |
| [#700](https://github.com/tiberiuzuld/angular-gridster2/issues/700) | Can't drag&drop and resize grid item properly when grid type is set to fixed.               | 2020-12-11 | 5        | drag and resize in fixed grids stop before maxCols                                         |
| [#735](https://github.com/tiberiuzuld/angular-gridster2/issues/735) | Dragged item doesn't move when scrolling                                                    | 2021-04-30 | 4        | dragged item does not follow wheel scrolling; upstream #1011 was rejected, needs a new fix |
| [#784](https://github.com/tiberiuzuld/angular-gridster2/issues/784) | Continuous resizing item when placed on the edge without moving mouse                       | 2022-01-26 | 2        | continuous resize at the grid edge; probably fixed by #5                                   |
| [#691](https://github.com/tiberiuzuld/angular-gridster2/issues/691) | Click on the edge of the gridster-item and it will jump                                     | 2020-11-11 | 2        | clicking the edge of an item makes it jump                                                 |
| [#421](https://github.com/tiberiuzuld/angular-gridster2/issues/421) | delayStart and text selection bug                                                           | 2018-09-24 | 1        | delayStart with selected text leaves the item floating                                     |
| [#358](https://github.com/tiberiuzuld/angular-gridster2/issues/358) | Resize Issue related with margin                                                            | 2018-06-04 | 1        | resize with margin 0                                                                       |
| [#727](https://github.com/tiberiuzuld/angular-gridster2/issues/727) | When I drag and drop an item, I can change the size of the item without releasing the mouse | 2021-03-25 | 0        | an item can be resized while it is dragged                                                 |
| [#563](https://github.com/tiberiuzuld/angular-gridster2/issues/563) | Console errors while dragging items in iPad Pro mode.                                       | 2019-10-25 | 0        | touchmove interventions while resizing on iPad                                             |
| [#359](https://github.com/tiberiuzuld/angular-gridster2/issues/359) | Resize Issue related with max columns and rows                                              | 2018-06-04 | 0        | resize limited by max item rows/cols                                                       |

### Display grid lines

| Issue                                                               | Title                                                               | Opened     | Interest | Note                                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------- | -------- | ------------------------------------------------------------------ |
| [#790](https://github.com/tiberiuzuld/angular-gridster2/issues/790) | How to restrict DisplayGrid.Always to show only maxCols and maxRows | 2022-02-15 | 2        | grid lines drawn beyond maxCols/maxRows                            |
| [#897](https://github.com/tiberiuzuld/angular-gridster2/issues/897) | The row width is too large                                          | 2023-11-16 | 0        | row overlays wider than the columns by 2 x margin with outerMargin |

### Browser zoom and scale

| Issue                                                               | Title                                                               | Opened     | Interest | Note                                                                 |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------- | -------- | -------------------------------------------------------------------- |
| [#605](https://github.com/tiberiuzuld/angular-gridster2/issues/605) | Page zoom                                                           | 2020-03-14 | 2        | drag distance differs from the pointer when the page is zoomed       |
| [#817](https://github.com/tiberiuzuld/angular-gridster2/issues/817) | resolution issue while zoom in and out                              | 2022-05-30 | 0        | content hidden when zooming                                          |
| [#760](https://github.com/tiberiuzuld/angular-gridster2/issues/760) | Drag Speed of grid elements is dependent on the zoom in the browser | 2021-07-29 | 0        | drag speed depends on browser zoom or css zoom                       |
| [#693](https://github.com/tiberiuzuld/angular-gridster2/issues/693) | Gridster2 with panzoom                                              | 2020-11-16 | 0        | empty-cell drag selects the wrong column inside a pan/zoom container |

## Feature requests

| Theme                                                        | Issues | Interest |
| ------------------------------------------------------------ | ------ | -------- |
| Drag between grids and from outside with live insertion      | 14     | 66       |
| Drag and resize constraints                                  | 17     | 38       |
| Events and callbacks                                         | 14     | 33       |
| Programmatic changes with push                               | 9      | 24       |
| Sizing                                                       | 15     | 23       |
| Selection, grouping and swap variants                        | 6      | 22       |
| Responsive layouts                                           | 10     | 19       |
| Empty cell UI (partly covered by enableEmptyCellHover in #1) | 5      | 15       |
| Performance                                                  | 5      | 12       |
| Scroll the page or a parent container while dragging         | 3      | 9        |
| Item data model                                              | 3      | 8        |
| Other                                                        | 4      | 7        |
| Accessibility                                                | 3      | 5        |
| Multi-layer                                                  | 1      | 0        |

### Drag between grids and from outside with live insertion

| Issue                                                               | Title                                                                                                                                                     | Opened     | Interest | Note                                                |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | --------------------------------------------------- |
| [#245](https://github.com/tiberiuzuld/angular-gridster2/issues/245) | Allow dragging item out of grid container                                                                                                                 | 2018-02-14 | 35       | drag an item out of the grid (34 comments)          |
| [#357](https://github.com/tiberiuzuld/angular-gridster2/issues/357) | Drag other components onto gridster                                                                                                                       | 2018-06-01 | 7        | external drag that pushes items while hovering      |
| [#664](https://github.com/tiberiuzuld/angular-gridster2/issues/664) | Drag items between grids?                                                                                                                                 | 2020-08-27 | 4        | drag between grids                                  |
| [#659](https://github.com/tiberiuzuld/angular-gridster2/issues/659) | Gridster2 drag drop                                                                                                                                       | 2020-08-14 | 4        | drop an item into another grid                      |
| [#632](https://github.com/tiberiuzuld/angular-gridster2/issues/632) | Gridster is awesome but ...                                                                                                                               | 2020-06-27 | 4        | umbrella: drag between grids, nesting, multi-select |
| [#713](https://github.com/tiberiuzuld/angular-gridster2/issues/713) | Item transfer from one gridster to another gridster                                                                                                       | 2021-02-08 | 3        | transfer items between grids                        |
| [#472](https://github.com/tiberiuzuld/angular-gridster2/issues/472) | Is it possible to exchange elements between Grids ?                                                                                                       | 2019-02-11 | 3        | exchange items between grids                        |
| [#822](https://github.com/tiberiuzuld/angular-gridster2/issues/822) | I want Drag And Drop on other grid                                                                                                                        | 2022-06-29 | 2        | drag and drop on another grid                       |
| [#755](https://github.com/tiberiuzuld/angular-gridster2/issues/755) | Would this be possible if, as an item is dragged, the following item is placed in the same place as the previous item, rather than having to push it down | 2021-07-07 | 2        | sortable-like placement                             |
| [#731](https://github.com/tiberiuzuld/angular-gridster2/issues/731) | Drop an item at a specified index                                                                                                                         | 2021-03-31 | 1        | drop at an index                                    |
| [#714](https://github.com/tiberiuzuld/angular-gridster2/issues/714) | Dragging Items from a grid to another                                                                                                                     | 2021-02-09 | 1        | drag items between dashboards                       |
| [#930](https://github.com/tiberiuzuld/angular-gridster2/issues/930) | Gridster drop placeholder ui behaviour                                                                                                                    | 2024-12-17 | 0        | insertion line instead of pushing                   |
| [#674](https://github.com/tiberiuzuld/angular-gridster2/issues/674) | create "white spaces" while dragging                                                                                                                      | 2020-09-25 | 0        | leave a gap while dragging from outside             |
| [#607](https://github.com/tiberiuzuld/angular-gridster2/issues/607) | Is there any way to implement the interaction dragging item and push away the items around                                                                | 2020-03-23 | 0        | external drag pushing items away                    |

### Drag and resize constraints

| Issue                                                               | Title                                                                                             | Opened     | Interest | Note                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------- | -------- | ------------------------------------------- |
| [#404](https://github.com/tiberiuzuld/angular-gridster2/issues/404) | Is it possible to have sticky items?                                                              | 2018-08-08 | 9        | snap to neighbours on pixel grids           |
| [#432](https://github.com/tiberiuzuld/angular-gridster2/issues/432) | Optimizing item position when pushing big elements with smaller one                               | 2018-11-01 | 8        | push with less empty space                  |
| [#445](https://github.com/tiberiuzuld/angular-gridster2/issues/445) | is it possible to have minCols and minWidth for each gridster item ?                              | 2018-12-04 | 4        | pushResize keeping minimum sizes            |
| [#635](https://github.com/tiberiuzuld/angular-gridster2/issues/635) | Creating a Push API option for moving all items in the direction of the push. Row/ column pushing | 2020-06-30 | 3        | push a whole row or column                  |
| [#425](https://github.com/tiberiuzuld/angular-gridster2/issues/425) | Request: Allow Expanding Items                                                                    | 2018-10-11 | 3        | expand an item over the grid                |
| [#750](https://github.com/tiberiuzuld/angular-gridster2/issues/750) | Pushing right or left grid item to down when one grid item is resizing horizontally.              | 2021-06-23 | 2        | push down when resizing horizontally        |
| [#596](https://github.com/tiberiuzuld/angular-gridster2/issues/596) | Maximize gridster item browser screen                                                             | 2020-02-26 | 2        | maximize an item                            |
| [#375](https://github.com/tiberiuzuld/angular-gridster2/issues/375) | Making a specific gridster-item pushable but not draggable                                        | 2018-06-25 | 2        | pushable but not draggable items            |
| [#319](https://github.com/tiberiuzuld/angular-gridster2/issues/319) | Allow GridsterItem to be anchored to their location during item dragging                          | 2018-05-04 | 2        | anchored items that are never pushed        |
| [#726](https://github.com/tiberiuzuld/angular-gridster2/issues/726) | Automatic resizing of other items when scaling down an item                                       | 2021-03-23 | 1        | resize neighbours when shrinking an item    |
| [#480](https://github.com/tiberiuzuld/angular-gridster2/issues/480) | is it possible to allow dragging only vertically                                                  | 2019-03-21 | 1        | drag only vertically                        |
| [#387](https://github.com/tiberiuzuld/angular-gridster2/issues/387) | Feature Request: Column/row add/remove on drag configuration                                      | 2018-07-06 | 1        | threshold to add/remove rows while dragging |
| [#908](https://github.com/tiberiuzuld/angular-gridster2/issues/908) | What configuration setting allows to maximize item in available nearby space                      | 2024-03-21 | 0        | grow an item into the free space            |
| [#806](https://github.com/tiberiuzuld/angular-gridster2/issues/806) | Restore gridster item to original position                                                        | 2022-04-14 | 0        | restore positions after removing an item    |
| [#609](https://github.com/tiberiuzuld/angular-gridster2/issues/609) | I have to drag at least 50% of the current item into target cell in order it for it to work.      | 2020-04-03 | 0        | drop threshold smaller than half a cell     |
| [#507](https://github.com/tiberiuzuld/angular-gridster2/issues/507) | push items on resize doesn't work                                                                 | 2019-05-30 | 0        | push on resize when drag is disabled        |
| [#471](https://github.com/tiberiuzuld/angular-gridster2/issues/471) | Force the column vertical alignment                                                               | 2019-02-07 | 0        | vertical-only moves without swapping        |

### Events and callbacks

| Issue                                                               | Title                                                                                       | Opened     | Interest | Note                                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------- | -------- | --------------------------------------------------------------------------- |
| [#796](https://github.com/tiberiuzuld/angular-gridster2/issues/796) | [Documentation] Better basic examples?                                                      | 2022-03-16 | 5        | swap event                                                                  |
| [#434](https://github.com/tiberiuzuld/angular-gridster2/issues/434) | How to avoid click event trigger when drag and resize gridster-item ?                       | 2018-11-02 | 5        | suppress the click after a drag                                             |
| [#394](https://github.com/tiberiuzuld/angular-gridster2/issues/394) | Gridster event to continuously monitor griditem resizing                                    | 2018-07-22 | 5        | event during item resize                                                    |
| [#315](https://github.com/tiberiuzuld/angular-gridster2/issues/315) | Enhancement Request: old item position included in itemChangeCallback                       | 2018-04-30 | 3        | previous position in itemChangeCallback                                     |
| [#918](https://github.com/tiberiuzuld/angular-gridster2/issues/918) | Gridster Item resize callback                                                               | 2024-06-27 | 2        | continuous resize callback                                                  |
| [#826](https://github.com/tiberiuzuld/angular-gridster2/issues/826) | Get current X & Y points value while drag.                                                  | 2022-08-01 | 2        | current x/y while dragging                                                  |
| [#524](https://github.com/tiberiuzuld/angular-gridster2/issues/524) | Draggable Start, Draggable Stop Functionality                                               | 2019-07-08 | 2        | drag lifecycle events                                                       |
| [#496](https://github.com/tiberiuzuld/angular-gridster2/issues/496) | is there any mouse over function to get coordinates without clicking the empty cell ?       | 2019-04-30 | 2        | hover coordinates without clicking (partly covered by enableEmptyCellHover) |
| [#423](https://github.com/tiberiuzuld/angular-gridster2/issues/423) | Event when an item is pushed                                                                | 2018-10-04 | 2        | event when an item is pushed                                                |
| [#360](https://github.com/tiberiuzuld/angular-gridster2/issues/360) | Detetcting grid overflow                                                                    | 2018-06-07 | 2        | detect that the grid is full                                                |
| [#890](https://github.com/tiberiuzuld/angular-gridster2/issues/890) | Gridster drag continue event for item is not available                                      | 2023-07-19 | 1        | event while dragging                                                        |
| [#783](https://github.com/tiberiuzuld/angular-gridster2/issues/783) | dropOverItemsCallback without need for dropOverItems and available in emptyCellDropCallback | 2022-01-07 | 1        | dropOverItemsCallback without dropOverItems                                 |
| [#655](https://github.com/tiberiuzuld/angular-gridster2/issues/655) | how to find if there is any change to grid to check if its dirty?                           | 2020-08-07 | 1        | dirty state after changes                                                   |
| [#771](https://github.com/tiberiuzuld/angular-gridster2/issues/771) | Is there any way to handle when auto position item fails?                                   | 2021-10-16 | 0        | callback when auto-positioning fails                                        |

### Programmatic changes with push

| Issue                                                               | Title                                                                                 | Opened     | Interest | Note                                                       |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------- |
| [#549](https://github.com/tiberiuzuld/angular-gridster2/issues/549) | Force Add an Item                                                                     | 2019-09-09 | 8        | force-add an item at a position                            |
| [#706](https://github.com/tiberiuzuld/angular-gridster2/issues/706) | Widget Resize Issue (Overlapping with nearby widgets)                                 | 2021-01-21 | 7        | programmatic resize overlaps neighbours instead of pushing |
| [#478](https://github.com/tiberiuzuld/angular-gridster2/issues/478) | Not pushing when resize programatically                                               | 2019-03-07 | 3        | changing rows/cols from code does not push                 |
| [#702](https://github.com/tiberiuzuld/angular-gridster2/issues/702) | Updating gridster component programmatically gets a gridster-item stuck under another | 2020-12-16 | 2        | programmatic update leaves an item under another           |
| [#931](https://github.com/tiberiuzuld/angular-gridster2/issues/931) | How to push an item to its exact location, not to the free space                      | 2024-12-29 | 1        | place an item at an exact position pushing others          |
| [#667](https://github.com/tiberiuzuld/angular-gridster2/issues/667) | able to add on top of the container.                                                  | 2020-09-07 | 1        | add an item at the beginning                               |
| [#464](https://github.com/tiberiuzuld/angular-gridster2/issues/464) | How can I push a new cell into the first row even if the first row is occupied?       | 2019-01-24 | 1        | insert into the first row and push the rest down           |
| [#331](https://github.com/tiberiuzuld/angular-gridster2/issues/331) | Improve Push API                                                                      | 2018-05-10 | 1        | push API that takes an item                                |
| [#506](https://github.com/tiberiuzuld/angular-gridster2/issues/506) | disableAutoPositionOnConflict dosent work in live modification                        | 2019-05-30 | 0        | content-driven size changes overlap                        |

### Sizing

| Issue                                                               | Title                                                                                                      | Opened     | Interest | Note                                      |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------- | -------- | ----------------------------------------- |
| [#228](https://github.com/tiberiuzuld/angular-gridster2/issues/228) | Item min-height and min-width in pixels                                                                    | 2018-01-24 | 5        | pixel min width/height (upstream wontfix) |
| [#786](https://github.com/tiberiuzuld/angular-gridster2/issues/786) | Height adjustment based on inside contents of the widget                                                   | 2022-02-01 | 4        | height from content                       |
| [#642](https://github.com/tiberiuzuld/angular-gridster2/issues/642) | Make gridster item responsive                                                                              | 2020-07-10 | 3        | item height from content                  |
| [#503](https://github.com/tiberiuzuld/angular-gridster2/issues/503) | Content wrapping in gridster item                                                                          | 2019-05-17 | 3        | scroll inside the item content            |
| [#837](https://github.com/tiberiuzuld/angular-gridster2/issues/837) | How to make the each gridster item height responsive or flexible with the content of the gridster item.    | 2022-10-04 | 2        | responsive item height                    |
| [#611](https://github.com/tiberiuzuld/angular-gridster2/issues/611) | Fixed row height with Gridtype.Fit                                                                         | 2020-04-10 | 2        | fixed row height with fit                 |
| [#468](https://github.com/tiberiuzuld/angular-gridster2/issues/468) | Height of widgets in mobile mode                                                                           | 2019-02-05 | 2        | item height in mobile                     |
| [#811](https://github.com/tiberiuzuld/angular-gridster2/issues/811) | Fixed row height with Gridtype.ScrollVertical                                                              | 2022-04-27 | 1        | fixed row height with scrollVertical      |
| [#658](https://github.com/tiberiuzuld/angular-gridster2/issues/658) | gridster-item height: auto when in mobile                                                                  | 2020-08-13 | 1        | height auto in the mobile layout          |
| [#932](https://github.com/tiberiuzuld/angular-gridster2/issues/932) | The ability to fix the size of particular rows or columns, while other rows and columns adjust dynamically | 2025-01-06 | 0        | fixed-size rows or columns mixed with fit |
| [#851](https://github.com/tiberiuzuld/angular-gridster2/issues/851) | Can we have a row's minHeight parameter for gridType.Fit ?                                                 | 2023-01-26 | 0        | minimum row height for fit                |
| [#636](https://github.com/tiberiuzuld/angular-gridster2/issues/636) | Change to widget not detecting                                                                             | 2020-07-01 | 0        | grow item with its content                |
| [#586](https://github.com/tiberiuzuld/angular-gridster2/issues/586) | Mobile gridster-item height for GridType.ScrollVertical                                                    | 2020-01-22 | 0        | mobile item height with scrollVertical    |
| [#564](https://github.com/tiberiuzuld/angular-gridster2/issues/564) | How to override grid fixed row height                                                                      | 2019-11-11 | 0        | per-item row height                       |
| [#481](https://github.com/tiberiuzuld/angular-gridster2/issues/481) | feature to resize widget that would not take up a full cell                                                | 2019-03-21 | 0        | items smaller than a cell                 |

### Selection, grouping and swap variants

| Issue                                                               | Title                                       | Opened     | Interest | Note                                                   |
| ------------------------------------------------------------------- | ------------------------------------------- | ---------- | -------- | ------------------------------------------------------ |
| [#689](https://github.com/tiberiuzuld/angular-gridster2/issues/689) | Swap multiple items at the same time        | 2020-11-02 | 6        | swap several items                                     |
| [#772](https://github.com/tiberiuzuld/angular-gridster2/issues/772) | Two questions on Swap and Push              | 2021-11-02 | 4        | swap items of different sizes, swap together with push |
| [#729](https://github.com/tiberiuzuld/angular-gridster2/issues/729) | Need a solution for invalid swap situation  | 2021-03-26 | 4        | swap when the target lacks space                       |
| [#710](https://github.com/tiberiuzuld/angular-gridster2/issues/710) | While using multilayer grouping two widgets | 2021-02-04 | 4        | group items in multi-layer                             |
| [#267](https://github.com/tiberiuzuld/angular-gridster2/issues/267) | Make items selection in grid possible       | 2018-03-06 | 3        | item selection and multi-select                        |
| [#827](https://github.com/tiberiuzuld/angular-gridster2/issues/827) | Can I drag multiple items at once           | 2022-08-01 | 1        | drag several items at once                             |

### Responsive layouts

| Issue                                                               | Title                                                                                             | Opened     | Interest | Note                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------- | -------- | ----------------------------------------------------------- |
| [#229](https://github.com/tiberiuzuld/angular-gridster2/issues/229) | Grid responsiveness for different device sizes (xl, lg, md, sm, xs)                               | 2018-01-24 | 10       | breakpoints (upstream wontfix: css grid + mobileBreakpoint) |
| [#493](https://github.com/tiberiuzuld/angular-gridster2/issues/493) | is it auto resize possible?                                                                       | 2019-04-17 | 6        | responsive fixed grid                                       |
| [#903](https://github.com/tiberiuzuld/angular-gridster2/issues/903) | is there a way to change grid matrix?                                                             | 2024-01-20 | 1        | change columns on resize                                    |
| [#860](https://github.com/tiberiuzuld/angular-gridster2/issues/860) | load different configs(configs for tablet-, mobile-, desktop-view) without refreshing the browser | 2023-02-02 | 1        | configs per device without reload                           |
| [#856](https://github.com/tiberiuzuld/angular-gridster2/issues/856) | Widgets side by side in tablet view                                                               | 2023-01-30 | 1        | side by side items on tablets                               |
| [#902](https://github.com/tiberiuzuld/angular-gridster2/issues/902) | Responsive and size of items                                                                      | 2024-01-12 | 0        | columns per breakpoint                                      |
| [#900](https://github.com/tiberiuzuld/angular-gridster2/issues/900) | Auto Position Items When Browser Window Is Resized                                                | 2024-01-04 | 0        | auto-position on window resize                              |
| [#773](https://github.com/tiberiuzuld/angular-gridster2/issues/773) | Responsive not working for smaller devices                                                        | 2021-11-02 | 0        | layout on small devices                                     |
| [#608](https://github.com/tiberiuzuld/angular-gridster2/issues/608) | Items not moved to the 2nd row when there is no place                                             | 2020-04-03 | 0        | reflow items when the width shrinks                         |
| [#510](https://github.com/tiberiuzuld/angular-gridster2/issues/510) | [Question] How to stop grid item resize when window size changes                                  | 2019-06-11 | 0        | different maxCols per device                                |

### Empty cell UI (partly covered by enableEmptyCellHover in #1)

| Issue                                                               | Title                                                                                                                                                        | Opened     | Interest | Note                            |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | -------- | ------------------------------- |
| [#366](https://github.com/tiberiuzuld/angular-gridster2/issues/366) | How to fill the margin lines between cells                                                                                                                   | 2018-06-18 | 7        | fill the gaps between cells     |
| [#583](https://github.com/tiberiuzuld/angular-gridster2/issues/583) | Add icon when Gridster Item is empty (EmptyCell)?                                                                                                            | 2020-01-07 | 6        | icon in empty cells             |
| [#934](https://github.com/tiberiuzuld/angular-gridster2/issues/934) | Style empty cells                                                                                                                                            | 2025-01-13 | 1        | hover indication on empty cells |
| [#385](https://github.com/tiberiuzuld/angular-gridster2/issues/385) | Is it possible to change border color on hover of the specific one box?                                                                                      | 2018-07-05 | 1        | highlight the hovered cell      |
| [#895](https://github.com/tiberiuzuld/angular-gridster2/issues/895) | Hi, In the context of using angular-gridster2, is there a method to assign a label or button to vacant grid cells, allowing the addition of a new grid cell? | 2023-10-10 | 0        | button on empty cells           |

### Performance

| Issue                                                               | Title                                                          | Opened     | Interest | Note                                                       |
| ------------------------------------------------------------------- | -------------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------- |
| [#420](https://github.com/tiberiuzuld/angular-gridster2/issues/420) | Google chrome violations related to gridster2                  | 2018-09-21 | 6        | passive listener violations                                |
| [#407](https://github.com/tiberiuzuld/angular-gridster2/issues/407) | Is it possible to add multiple items to grid at once?          | 2018-08-14 | 5        | add many items at once                                     |
| [#948](https://github.com/tiberiuzuld/angular-gridster2/issues/948) | Chrome [Violation] non-passive event listener                  | 2025-10-22 | 1        | passive touch listeners where preventDefault is not needed |
| [#812](https://github.com/tiberiuzuld/angular-gridster2/issues/812) | Do not add gridster-item-moving (or add an option to avoid it) | 2022-04-29 | 0        | avoid style recalculation from gridster-item-moving        |
| [#483](https://github.com/tiberiuzuld/angular-gridster2/issues/483) | Don't add gridColumns and gridRows when displayGrid='none'     | 2019-03-27 | 0        | no grid line elements when displayGrid is none             |

### Scroll the page or a parent container while dragging

| Issue                                                               | Title                                                            | Opened     | Interest | Note                                                  |
| ------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------- | -------- | ----------------------------------------------------- |
| [#498](https://github.com/tiberiuzuld/angular-gridster2/issues/498) | Dragging gridster item to top not auto scrolling the page        | 2019-05-08 | 5        | dragging to the top does not scroll the page          |
| [#756](https://github.com/tiberiuzuld/angular-gridster2/issues/756) | How can I do to scroll de parent element while dragging an item? | 2021-07-16 | 3        | auto-scroll does not work with setGridSize            |
| [#495](https://github.com/tiberiuzuld/angular-gridster2/issues/495) | setGridSize: true; Scroll issue                                  | 2019-04-26 | 1        | setGridSize: the body scroll does not follow the drag |

### Item data model

| Issue                                                               | Title                                                | Opened     | Interest | Note                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------- | ---------- | -------- | ----------------------------------------------- |
| [#512](https://github.com/tiberiuzuld/angular-gridster2/issues/512) | Is there any property for gridster item to hidden it | 2019-06-13 | 5        | hide an item                                    |
| [#676](https://github.com/tiberiuzuld/angular-gridster2/issues/676) | ERROR TypeError: "cols" is read-only                 | 2020-09-28 | 3        | frozen or read-only items ('cols' is read-only) |
| [#615](https://github.com/tiberiuzuld/angular-gridster2/issues/615) | Can't use get/set properties in an GridsterItem      | 2020-04-28 | 0        | items with getters/setters                      |

### Other

| Issue                                                               | Title                                                                                               | Opened     | Interest | Note                             |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------- | -------- | -------------------------------- |
| [#871](https://github.com/tiberiuzuld/angular-gridster2/issues/871) | Rotate Gridster Item                                                                                | 2023-03-09 | 3        | rotate an item                   |
| [#555](https://github.com/tiberiuzuld/angular-gridster2/issues/555) | Allow a way to pass the query selector to apply gridster-item-content class on specific DOM element | 2019-09-23 | 2        | ignoreContentClass as a selector |
| [#303](https://github.com/tiberiuzuld/angular-gridster2/issues/303) | Enhancement: Add a page to the demo which allows full customization of the grid.                    | 2018-04-11 | 2        | demo page with every option      |
| [#640](https://github.com/tiberiuzuld/angular-gridster2/issues/640) | Is it possible to make rows sticky?                                                                 | 2020-07-06 | 0        | sticky rows                      |

### Accessibility

| Issue                                                               | Title                                                                       | Opened     | Interest | Note                                                          |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------- | -------- | ------------------------------------------------------------- |
| [#876](https://github.com/tiberiuzuld/angular-gridster2/issues/876) | Content is unable to drag and drop by using keyboard.                       | 2023-03-16 | 4        | keyboard drag and drop                                        |
| [#831](https://github.com/tiberiuzuld/angular-gridster2/issues/831) | Accessibility For Screen Reader/keyboard Nav Users                          | 2022-08-30 | 1        | DOM order does not follow the visual order for screen readers |
| [#886](https://github.com/tiberiuzuld/angular-gridster2/issues/886) | Accessibility issue - cannot drag the widgets by use of keyboard arrow keys | 2023-06-26 | 0        | move items with the keyboard                                  |

### Multi-layer

| Issue                                                               | Title                                       | Opened     | Interest | Note          |
| ------------------------------------------------------------------- | ------------------------------------------- | ---------- | -------- | ------------- |
| [#763](https://github.com/tiberiuzuld/angular-gridster2/issues/763) | Feature Request: Focus layer in multi layer | 2021-08-27 | 0        | focus a layer |

## Questions for the docs / FAQ

| Theme                                         | Issues | Interest |
| --------------------------------------------- | ------ | -------- |
| Content inside items: charts, menus, overflow | 16     | 43       |
| Empty cells and external drop                 | 5      | 30       |
| Saving and restoring layouts                  | 9      | 29       |
| Angular usage and integration                 | 13     | 22       |
| Updating options and items at runtime         | 10     | 21       |
| Styling                                       | 9      | 20       |
| Grid types and sizes                          | 9      | 18       |
| Documentation in general                      | 3      | 7        |
| Multi-layer                                   | 3      | 3        |

### Content inside items: charts, menus, overflow

| Issue                                                               | Title                                                                                                                 | Opened     | Interest | Note                                                 |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------- |
| [#536](https://github.com/tiberiuzuld/angular-gridster2/issues/536) | Position Fixed (Bootstrap Modals/Dropdowns) does not work inside gridster-item due totransform: translate3d property. | 2019-08-06 | 9        | position: fixed needs useTransformPositioning: false |
| [#473](https://github.com/tiberiuzuld/angular-gridster2/issues/473) | Is it possible to change CSS/HTML attributes from GridsterItems ?                                                     | 2019-02-11 | 8        |                                                      |
| [#749](https://github.com/tiberiuzuld/angular-gridster2/issues/749) | Gridster resize contents as grid is resizing.                                                                         | 2021-06-19 | 7        |                                                      |
| [#487](https://github.com/tiberiuzuld/angular-gridster2/issues/487) | resize not resizing inner childs                                                                                      | 2019-04-01 | 7        |                                                      |
| [#626](https://github.com/tiberiuzuld/angular-gridster2/issues/626) | Resize with handles => no update of content-size                                                                      | 2020-06-16 | 6        |                                                      |
| [#589](https://github.com/tiberiuzuld/angular-gridster2/issues/589) | Display only support                                                                                                  | 2020-02-10 | 2        |                                                      |
| [#884](https://github.com/tiberiuzuld/angular-gridster2/issues/884) | I am unable to resize apex charts height and width according to grid item dimensions                                  | 2023-05-26 | 1        |                                                      |
| [#482](https://github.com/tiberiuzuld/angular-gridster2/issues/482) | widget not showing content when come from async function                                                              | 2019-03-23 | 1        | content loaded asynchronously appears after a click  |
| [#426](https://github.com/tiberiuzuld/angular-gridster2/issues/426) | Fit grid size with scrollable content of grid items                                                                   | 2018-10-17 | 1        |                                                      |
| [#419](https://github.com/tiberiuzuld/angular-gridster2/issues/419) | Map takes only 40% of width when Placed inside Gridster                                                               | 2018-09-20 | 1        |                                                      |
| [#925](https://github.com/tiberiuzuld/angular-gridster2/issues/925) | Overlapping issue                                                                                                     | 2024-10-07 | 0        |                                                      |
| [#911](https://github.com/tiberiuzuld/angular-gridster2/issues/911) | How do I insert a container on top of the gridster-item?                                                              | 2024-04-15 | 0        |                                                      |
| [#910](https://github.com/tiberiuzuld/angular-gridster2/issues/910) | gridster-item initial position and display values are messing up Gantt Components                                     | 2024-03-29 | 0        |                                                      |
| [#833](https://github.com/tiberiuzuld/angular-gridster2/issues/833) | Move component out of gridster                                                                                        | 2022-09-06 | 0        |                                                      |
| [#712](https://github.com/tiberiuzuld/angular-gridster2/issues/712) | Custom theme                                                                                                          | 2021-02-05 | 0        |                                                      |
| [#686](https://github.com/tiberiuzuld/angular-gridster2/issues/686) | Dropdown value is not show proper                                                                                     | 2020-10-28 | 0        |                                                      |

### Empty cells and external drop

| Issue                                                               | Title                                                             | Opened     | Interest | Note                                                   |
| ------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------- | -------- | ------------------------------------------------------ |
| [#399](https://github.com/tiberiuzuld/angular-gridster2/issues/399) | Drag & drop component into gridster                               | 2018-08-01 | 21       |                                                        |
| [#444](https://github.com/tiberiuzuld/angular-gridster2/issues/444) | Q: Is it possible to size "enable drop to add" item placeholders? | 2018-11-21 | 4        | set defaultItemCols/Rows when the external drag starts |
| [#584](https://github.com/tiberiuzuld/angular-gridster2/issues/584) | Prevent Drop to empty cell.                                       | 2020-01-08 | 3        |                                                        |
| [#745](https://github.com/tiberiuzuld/angular-gridster2/issues/745) | Drag and Drop configure to show different number of shadow cells? | 2021-06-12 | 1        |                                                        |
| [#698](https://github.com/tiberiuzuld/angular-gridster2/issues/698) | drag from outside the grid                                        | 2020-12-03 | 1        |                                                        |

### Saving and restoring layouts

| Issue                                                               | Title                                                             | Opened     | Interest | Note |
| ------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------- | -------- | ---- |
| [#380](https://github.com/tiberiuzuld/angular-gridster2/issues/380) | Serialization                                                     | 2018-07-02 | 8        |      |
| [#724](https://github.com/tiberiuzuld/angular-gridster2/issues/724) | Optimized way of saving gridster item params to database.         | 2021-03-09 | 4        |      |
| [#648](https://github.com/tiberiuzuld/angular-gridster2/issues/648) | Get the gridsterItem serialized positions array                   | 2020-07-20 | 4        |      |
| [#520](https://github.com/tiberiuzuld/angular-gridster2/issues/520) | How to get rows and columns of a gridster                         | 2019-07-02 | 4        |      |
| [#488](https://github.com/tiberiuzuld/angular-gridster2/issues/488) | Not able to get used(acquired) row count                          | 2019-04-04 | 3        |      |
| [#836](https://github.com/tiberiuzuld/angular-gridster2/issues/836) | How to get all grid items and their positions?                    | 2022-09-23 | 2        |      |
| [#801](https://github.com/tiberiuzuld/angular-gridster2/issues/801) | Calculating the width and height of the grid area that has blocks | 2022-04-02 | 2        |      |
| [#778](https://github.com/tiberiuzuld/angular-gridster2/issues/778) | How to save data in local storage                                 | 2021-12-15 | 1        |      |
| [#578](https://github.com/tiberiuzuld/angular-gridster2/issues/578) | Get final positions of the swapped components                     | 2019-12-31 | 1        |      |

### Angular usage and integration

| Issue                                                               | Title                                                                              | Opened     | Interest | Note                           |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------- | -------- | ------------------------------ |
| [#709](https://github.com/tiberiuzuld/angular-gridster2/issues/709) | Not able to automate drag and drop behavior                                        | 2021-02-04 | 7        | synthetic events for e2e tests |
| [#489](https://github.com/tiberiuzuld/angular-gridster2/issues/489) | How to insert value into child component in one widget Component                   | 2019-04-07 | 4        |                                |
| [#430](https://github.com/tiberiuzuld/angular-gridster2/issues/430) | Wrap gridster-item in a custom component                                           | 2018-10-29 | 2        |                                |
| [#424](https://github.com/tiberiuzuld/angular-gridster2/issues/424) | Auto update Coordinates of all the items, when changing the position of any Item.  | 2018-10-08 | 2        |                                |
| [#877](https://github.com/tiberiuzuld/angular-gridster2/issues/877) | How to implement data communication and DOM operation between gridster-item?       | 2023-03-31 | 1        |                                |
| [#863](https://github.com/tiberiuzuld/angular-gridster2/issues/863) | Is there a way to preview the gridster items without the grid and the extra space? | 2023-02-08 | 1        |                                |
| [#769](https://github.com/tiberiuzuld/angular-gridster2/issues/769) | Unable to detect http call errors inside a single gridster component               | 2021-09-28 | 1        |                                |
| [#672](https://github.com/tiberiuzuld/angular-gridster2/issues/672) | Refresh Widgets in Gridster2                                                       | 2020-09-22 | 1        |                                |
| [#535](https://github.com/tiberiuzuld/angular-gridster2/issues/535) | use grid event in nested gridster in gridster                                      | 2019-08-06 | 1        |                                |
| [#462](https://github.com/tiberiuzuld/angular-gridster2/issues/462) | Does it support with kendo UI ?                                                    | 2019-01-17 | 1        |                                |
| [#450](https://github.com/tiberiuzuld/angular-gridster2/issues/450) | Customized design and preview mode independent of each other                       | 2018-12-17 | 1        |                                |
| [#688](https://github.com/tiberiuzuld/angular-gridster2/issues/688) | Is there a way to limit how much information an item can store?                    | 2020-10-29 | 0        |                                |
| [#566](https://github.com/tiberiuzuld/angular-gridster2/issues/566) | How to pass data from service to each grid?                                        | 2019-11-26 | 0        |                                |

### Updating options and items at runtime

| Issue                                                               | Title                                                                                 | Opened     | Interest | Note |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------- | -------- | ---- |
| [#866](https://github.com/tiberiuzuld/angular-gridster2/issues/866) | How to change x, y gridsterItem with typescript code                                  | 2023-02-27 | 4        |      |
| [#560](https://github.com/tiberiuzuld/angular-gridster2/issues/560) | Not updating on position change                                                       | 2019-10-16 | 4        |      |
| [#511](https://github.com/tiberiuzuld/angular-gridster2/issues/511) | Auto Arrange Gridster items                                                           | 2019-06-12 | 3        |      |
| [#485](https://github.com/tiberiuzuld/angular-gridster2/issues/485) | changes not detected                                                                  | 2019-03-28 | 3        |      |
| [#679](https://github.com/tiberiuzuld/angular-gridster2/issues/679) | Gridster does not update view if the array of gridsteritems is empty at the beginning | 2020-10-11 | 2        |      |
| [#926](https://github.com/tiberiuzuld/angular-gridster2/issues/926) | Auto adjustable grids on resizing                                                     | 2024-11-15 | 1        |      |
| [#701](https://github.com/tiberiuzuld/angular-gridster2/issues/701) | auto align grid                                                                       | 2020-12-14 | 1        |      |
| [#687](https://github.com/tiberiuzuld/angular-gridster2/issues/687) | Dragging and Dropping GridsterItems to different positions in the Grid.               | 2020-10-28 | 1        |      |
| [#622](https://github.com/tiberiuzuld/angular-gridster2/issues/622) | Is there any way to trigger compact up for a gridster item?                           | 2020-06-09 | 1        |      |
| [#556](https://github.com/tiberiuzuld/angular-gridster2/issues/556) | Resize all items                                                                      | 2019-09-26 | 1        |      |

### Styling

| Issue                                                               | Title                                                               | Opened     | Interest | Note                    |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------- | -------- | ----------------------- |
| [#458](https://github.com/tiberiuzuld/angular-gridster2/issues/458) | Container height not set                                            | 2019-01-09 | 8        |                         |
| [#490](https://github.com/tiberiuzuld/angular-gridster2/issues/490) | How change color of a widget placeholder when moving with a widget. | 2019-04-09 | 3        |                         |
| [#474](https://github.com/tiberiuzuld/angular-gridster2/issues/474) | Grid Content is not beeing draggable [BUG or wrong implementation]  | 2019-02-13 | 3        |                         |
| [#470](https://github.com/tiberiuzuld/angular-gridster2/issues/470) | How change .gridster-item-resizable-handler.handle-se color         | 2019-02-07 | 2        |                         |
| [#905](https://github.com/tiberiuzuld/angular-gridster2/issues/905) | Change style when moving grid items                                 | 2024-02-03 | 1        |                         |
| [#825](https://github.com/tiberiuzuld/angular-gridster2/issues/825) | Help                                                                | 2022-07-28 | 1        |                         |
| [#581](https://github.com/tiberiuzuld/angular-gridster2/issues/581) | How to get a Material Design Card to fill a gridster-item           | 2020-01-02 | 1        |                         |
| [#561](https://github.com/tiberiuzuld/angular-gridster2/issues/561) | grid height and double scroll bars                                  | 2019-10-17 | 1        |                         |
| [#684](https://github.com/tiberiuzuld/angular-gridster2/issues/684) | Default grid height percentage not working                          | 2020-10-27 | 0        | the parent needs a size |

### Grid types and sizes

| Issue                                                               | Title                                                                                                        | Opened     | Interest | Note                                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------- | -------- | --------------------------------------------------------------------------- |
| [#457](https://github.com/tiberiuzuld/angular-gridster2/issues/457) | how to block resize when user try to resize less than the default col and width you gave to your component ? | 2019-01-03 | 12       |                                                                             |
| [#848](https://github.com/tiberiuzuld/angular-gridster2/issues/848) | Not able to align Grid Item from left to right.                                                              | 2023-01-18 | 2        |                                                                             |
| [#643](https://github.com/tiberiuzuld/angular-gridster2/issues/643) | Gridster items adjustments is different in desktop and iPad modes on selecting vertical scroll               | 2020-07-13 | 1        |                                                                             |
| [#530](https://github.com/tiberiuzuld/angular-gridster2/issues/530) | Resize should not happen when adding new grid                                                                | 2019-07-24 | 1        |                                                                             |
| [#452](https://github.com/tiberiuzuld/angular-gridster2/issues/452) | Inconsistency in adding new items in compact left/right mode                                                 | 2018-12-21 | 1        |                                                                             |
| [#416](https://github.com/tiberiuzuld/angular-gridster2/issues/416) | grid size calculation                                                                                        | 2018-09-12 | 1        |                                                                             |
| [#977](https://github.com/tiberiuzuld/angular-gridster2/issues/977) | Bug: Wrong row calculation when using ignoreMarginInRow: true                                                | 2026-04-02 | 0        | ignoreMarginInRow keeps one margin per item by design (upstream #224, #227) |
| [#901](https://github.com/tiberiuzuld/angular-gridster2/issues/901) | How to have scroll in the gridster while keeping the grid size                                               | 2024-01-11 | 0        |                                                                             |
| [#885](https://github.com/tiberiuzuld/angular-gridster2/issues/885) | how to predefine a grid size with px                                                                         | 2023-06-01 | 0        |                                                                             |

### Documentation in general

| Issue                                                               | Title                                                                                                                                                                  | Opened     | Interest | Note |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ---- |
| [#451](https://github.com/tiberiuzuld/angular-gridster2/issues/451) | Homepage guide of how to start with angyular-gridster2 is NOT ENOUGH.                                                                                                  | 2018-12-17 | 6        |      |
| [#554](https://github.com/tiberiuzuld/angular-gridster2/issues/554) | From where can i get the documentation for the angular-gridster2, i am finding it challenging to understand it's flow. A good documentation will surely help me a lot. | 2019-09-18 | 1        |      |
| [#571](https://github.com/tiberiuzuld/angular-gridster2/issues/571) | Converting fixed grid to scroll grid                                                                                                                                   | 2019-12-04 | 0        |      |

### Multi-layer

| Issue                                                               | Title                                                           | Opened     | Interest | Note |
| ------------------------------------------------------------------- | --------------------------------------------------------------- | ---------- | -------- | ---- |
| [#501](https://github.com/tiberiuzuld/angular-gridster2/issues/501) | Is there an option to allow widgets stack on top of each other? | 2019-05-16 | 2        |      |
| [#695](https://github.com/tiberiuzuld/angular-gridster2/issues/695) | Overlap widgets on top of another                               | 2020-11-23 | 1        |      |
| [#846](https://github.com/tiberiuzuld/angular-gridster2/issues/846) | how can I drag one item on top of another in this library?      | 2023-01-03 | 0        |      |

## Can be closed

| Theme                                         | Issues | Interest |
| --------------------------------------------- | ------ | -------- |
| Old versions, removed APIs or legacy browsers | 28     | 56       |
| Answered, solved or not about the library     | 17     | 33       |

### Old versions, removed APIs or legacy browsers

| Issue                                                               | Title                                                                                                                                              | Opened     | Interest | Note                                  |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ------------------------------------- |
| [#740](https://github.com/tiberiuzuld/angular-gridster2/issues/740) | Problems with Angular 12 + Jest                                                                                                                    | 2021-05-20 | 13       | Angular 12 + Jest                     |
| [#601](https://github.com/tiberiuzuld/angular-gridster2/issues/601) | An accessor cannot be declared in an ambient context.                                                                                              | 2020-03-02 | 7        | TypeScript accessor error in v9.1     |
| [#638](https://github.com/tiberiuzuld/angular-gridster2/issues/638) | When gridster item move, then hang the screen of browser.                                                                                          | 2020-07-03 | 6        | infinite loop fixed in v10.1.6        |
| [#868](https://github.com/tiberiuzuld/angular-gridster2/issues/868) | export 'takeUntil' (imported as 'takeUntil') was not found in 'rxjs'                                                                               | 2023-03-05 | 5        | rxjs import in old versions           |
| [#653](https://github.com/tiberiuzuld/angular-gridster2/issues/653) | Swap does not work                                                                                                                                 | 2020-08-03 | 4        | v9 swap                               |
| [#552](https://github.com/tiberiuzuld/angular-gridster2/issues/552) | ERR: Cannot read property 'x' of undefined                                                                                                         | 2019-09-16 | 4        | v3.19                                 |
| [#673](https://github.com/tiberiuzuld/angular-gridster2/issues/673) | TypeError: Cannot read property 'initCallback' of undefined                                                                                        | 2020-09-24 | 3        | old initCallback error                |
| [#518](https://github.com/tiberiuzuld/angular-gridster2/issues/518) | this.options.api is undefined                                                                                                                      | 2019-06-19 | 3        | options.api removed, use initCallback |
| [#381](https://github.com/tiberiuzuld/angular-gridster2/issues/381) | Gridster Rows and Columns are not created on IE9                                                                                                   | 2018-07-03 | 3        | Internet Explorer 9                   |
| [#654](https://github.com/tiberiuzuld/angular-gridster2/issues/654) | Items do not render at startup and need a mouseclick to render all item                                                                            | 2020-08-04 | 2        | v8 rendering                          |
| [#447](https://github.com/tiberiuzuld/angular-gridster2/issues/447) | Multiple AppRef.ticks on drag                                                                                                                      | 2018-12-13 | 2        | Internet Explorer 11 performance      |
| [#840](https://github.com/tiberiuzuld/angular-gridster2/issues/840) | 13.2.1 to 14.1.1 something with width changed                                                                                                      | 2022-10-07 | 1        | v13 to v14 upgrade                    |
| [#476](https://github.com/tiberiuzuld/angular-gridster2/issues/476) | The performance of moving widgets in IE11 is insufficient.                                                                                         | 2019-02-27 | 1        | Internet Explorer 11 performance      |
| [#461](https://github.com/tiberiuzuld/angular-gridster2/issues/461) | this.options.api is undefined                                                                                                                      | 2019-01-15 | 1        | options.api removed, use initCallback |
| [#344](https://github.com/tiberiuzuld/angular-gridster2/issues/344) | Not able to resize the tile on Microsoft surface machine and edge browser using touch.                                                             | 2018-05-21 | 1        | legacy Edge touch resize              |
| [#887](https://github.com/tiberiuzuld/angular-gridster2/issues/887) | Gridster "angular-gridster2": "^13.3.2" is giving error ERROR TypeError: (0 , Ie.debounceTime) is not a function at n.ngOnInit (main.js:1:1539939) | 2023-06-27 | 0        | rxjs mismatch in v13                  |
| [#759](https://github.com/tiberiuzuld/angular-gridster2/issues/759) | getting value of undefined when using @ViewChild to get <gridster-item> element?                                                                   | 2021-07-28 | 0        | v11                                   |
| [#708](https://github.com/tiberiuzuld/angular-gridster2/issues/708) | TouchStart Error in Angular 11                                                                                                                     | 2021-01-31 | 0        | Angular 11 template error             |
| [#699](https://github.com/tiberiuzuld/angular-gridster2/issues/699) | When Is 10.1.7 Not 10.1.7?                                                                                                                         | 2020-12-03 | 0        | demo version confusion in v10         |
| [#680](https://github.com/tiberiuzuld/angular-gridster2/issues/680) | Drag and Swap not working                                                                                                                          | 2020-10-14 | 0        | v8 on Angular 7                       |
| [#650](https://github.com/tiberiuzuld/angular-gridster2/issues/650) | gridster, ie11, overflow                                                                                                                           | 2020-07-22 | 0        | Internet Explorer 11                  |
| [#585](https://github.com/tiberiuzuld/angular-gridster2/issues/585) | Grid getting overlapping                                                                                                                           | 2020-01-08 | 0        | v8 overlap                            |
| [#572](https://github.com/tiberiuzuld/angular-gridster2/issues/572) | api.optionsChanged() call breaks drag after GridsterPush                                                                                           | 2019-12-05 | 0        | api.optionsChanged no longer exists   |
| [#467](https://github.com/tiberiuzuld/angular-gridster2/issues/467) | Swap doesn't works with Angular 5                                                                                                                  | 2019-02-04 | 0        | Angular 5                             |
| [#465](https://github.com/tiberiuzuld/angular-gridster2/issues/465) | unable to get property 'x' of undefined or null reference                                                                                          | 2019-01-31 | 0        | Internet Explorer 11                  |
| [#376](https://github.com/tiberiuzuld/angular-gridster2/issues/376) | Drag is not working in IE on touch device (Surface pro)                                                                                            | 2018-06-25 | 0        | Internet Explorer 11 touch            |
| [#372](https://github.com/tiberiuzuld/angular-gridster2/issues/372) | Margin is not respected when tile is resize out of grid and grid type set to Vertical Scroll on microsoft edge                                     | 2018-06-25 | 0        | legacy Edge margins, see #721         |
| [#367](https://github.com/tiberiuzuld/angular-gridster2/issues/367) | Drag issue with iframe and latest microsoft edge                                                                                                   | 2018-06-19 | 0        | legacy Edge iframes                   |

### Answered, solved or not about the library

| Issue                                                               | Title                                                                                                                        | Opened     | Interest | Note                                                 |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------- |
| [#787](https://github.com/tiberiuzuld/angular-gridster2/issues/787) | Maintainers Wanted                                                                                                           | 2022-02-01 | 14       | maintainers wanted: this fork                        |
| [#454](https://github.com/tiberiuzuld/angular-gridster2/issues/454) | Unable to integrate dom-to-image.js with angular-gridster2.js                                                                | 2018-12-25 | 4        | dom-to-image export                                  |
| [#534](https://github.com/tiberiuzuld/angular-gridster2/issues/534) | Question is possible add headers in each columns?                                                                            | 2019-07-31 | 3        | column headers: use a table library                  |
| [#504](https://github.com/tiberiuzuld/angular-gridster2/issues/504) | Not working with Ngx-owl-carousel-o                                                                                          | 2019-05-22 | 3        | third-party carousel                                 |
| [#738](https://github.com/tiberiuzuld/angular-gridster2/issues/738) | gridster ui on print getting unexpected page break                                                                           | 2021-05-12 | 2        | print page breaks                                    |
| [#939](https://github.com/tiberiuzuld/angular-gridster2/issues/939) | gridster not showing all items                                                                                               | 2025-06-24 | 1        | printing                                             |
| [#823](https://github.com/tiberiuzuld/angular-gridster2/issues/823) | Security risk due to inline-style                                                                                            | 2022-07-14 | 1        | CSP needs style-src unsafe-inline for Angular itself |
| [#744](https://github.com/tiberiuzuld/angular-gridster2/issues/744) | How can this effect be achieved?                                                                                             | 2021-06-02 | 1        | needs a description                                  |
| [#647](https://github.com/tiberiuzuld/angular-gridster2/issues/647) | Conflict with ng Zorro antd                                                                                                  | 2020-07-20 | 1        | conflict with ng-zorro, needs a reproduction         |
| [#580](https://github.com/tiberiuzuld/angular-gridster2/issues/580) | Export Gridster HTML DOM to PDF ??? in Angular 6.0.0                                                                         | 2020-01-02 | 1        | PDF export                                           |
| [#531](https://github.com/tiberiuzuld/angular-gridster2/issues/531) | ScrollView not working in larger screen !                                                                                    | 2019-07-24 | 1        | needs a reproduction                                 |
| [#492](https://github.com/tiberiuzuld/angular-gridster2/issues/492) | Gridster 2 printing #342                                                                                                     | 2019-04-17 | 1        | PDF export                                           |
| [#878](https://github.com/tiberiuzuld/angular-gridster2/issues/878) | issue when add new Widget "Boards - Created vs. Solved" - when Board is chosen from drop down menu -image not work and crash | 2023-04-20 | 0        | application crash unrelated to the grid              |
| [#874](https://github.com/tiberiuzuld/angular-gridster2/issues/874) | item is displaying over to another item                                                                                      | 2023-03-13 | 0        | needs a reproduction                                 |
| [#774](https://github.com/tiberiuzuld/angular-gridster2/issues/774) | Grid items not showing.                                                                                                      | 2021-11-12 | 0        | needs a reproduction                                 |
| [#551](https://github.com/tiberiuzuld/angular-gridster2/issues/551) | Resizing/Dragging is stopping randomly                                                                                       | 2019-09-12 | 0        | solved by the reporter                               |
| [#469](https://github.com/tiberiuzuld/angular-gridster2/issues/469) | Gridster View does not work                                                                                                  | 2019-02-06 | 0        | AngularJS                                            |
