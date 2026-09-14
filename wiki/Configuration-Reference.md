# Configuration Reference

All options of `GridsterConfig`, the object passed to `<gridster [options]="options">`. Every option is optional; missing ones take the default below (exported as `GridsterConfigService`).

Options are applied when the `options` object changes: to update them, assign a new object (`this.options = { ...this.options, margin: 5 }`).

## Layout

| Option                    | Type                                                                                                 | Default           | Description                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `gridType`                | `'fit' \| 'scrollVertical' \| 'scrollHorizontal' \| 'fixed' \| 'verticalFixed' \| 'horizontalFixed'` | `'fit'`           | How rows and columns are sized. See [Grid Types](Grid-Types)                                                                     |
| `fixedColWidth`           | `number`                                                                                             | `250`             | Column width in pixels for `fixed` and `horizontalFixed`                                                                         |
| `fixedRowHeight`          | `number`                                                                                             | `250`             | Row height in pixels for `fixed` and `verticalFixed`                                                                             |
| `rowHeightRatio`          | `number`                                                                                             | `1`               | Row height relative to the column width for `scrollVertical` (and column width for `scrollHorizontal`)                           |
| `setGridSize`             | `boolean`                                                                                            | `false`           | Size the grid element to its content instead of filling the parent. See [Grid Types](Grid-Types#setgridsize)                     |
| `ignoreMarginInRow`       | `boolean`                                                                                            | `false`           | Fixed grid types only: the row/column pitch is the fixed size without the margin. See [Grid Types](Grid-Types#ignoremargininrow) |
| `displayGrid`             | `'always' \| 'onDrag&Resize' \| 'none'`                                                              | `'onDrag&Resize'` | When to draw the grid lines. See [Styling](Styling#grid-lines)                                                                   |
| `useTransformPositioning` | `boolean`                                                                                            | `true`            | Position items with `transform` (`true`) or `top`/`left` (`false`)                                                               |
| `scale`                   | `number`                                                                                             | `1`               | Scale of the grid when it is zoomed with CSS, so pointer positions are converted correctly                                       |
| `dirType`                 | `'ltr' \| 'rtl'`                                                                                     | `'ltr'`           | Layout direction. See [RTL](RTL)                                                                                                 |

## Grid size

| Option              | Type     | Default | Description                          |
| ------------------- | -------- | ------- | ------------------------------------ |
| `minCols`           | `number` | `1`     | Minimum number of columns            |
| `maxCols`           | `number` | `100`   | Maximum number of columns            |
| `minRows`           | `number` | `1`     | Minimum number of rows               |
| `maxRows`           | `number` | `100`   | Maximum number of rows               |
| `addEmptyRowsCount` | `number` | `0`     | Extra empty rows after the last item |

See [Grid Size and Margins](Grid-Size-and-Margins).

## Items

| Option            | Type             | Default | Description                                                |
| ----------------- | ---------------- | ------- | ---------------------------------------------------------- |
| `defaultItemCols` | `number`         | `1`     | Columns of an item without `cols`                          |
| `defaultItemRows` | `number`         | `1`     | Rows of an item without `rows`                             |
| `minItemCols`     | `number`         | `1`     | Minimum item columns                                       |
| `maxItemCols`     | `number`         | `50`    | Maximum item columns                                       |
| `minItemRows`     | `number`         | `1`     | Minimum item rows                                          |
| `maxItemRows`     | `number`         | `50`    | Maximum item rows                                          |
| `minItemArea`     | `number`         | `1`     | Minimum `cols * rows`                                      |
| `maxItemArea`     | `number`         | `2500`  | Maximum `cols * rows`                                      |
| `itemAspectRatio` | `number \| null` | `null`  | Required `cols / rows` ratio while resizing, e.g. `16 / 9` |

Items can override these limits. See [Items](Items).

## Margins

| Option              | Type             | Default | Description                                       |
| ------------------- | ---------------- | ------- | ------------------------------------------------- |
| `margin`            | `number`         | `10`    | Gap between items in pixels                       |
| `outerMargin`       | `boolean`        | `true`  | Add a margin between the items and the grid edges |
| `outerMarginTop`    | `number \| null` | `null`  | Top outer margin; `null` uses `margin`            |
| `outerMarginRight`  | `number \| null` | `null`  | Right outer margin; `null` uses `margin`          |
| `outerMarginBottom` | `number \| null` | `null`  | Bottom outer margin; `null` uses `margin`         |
| `outerMarginLeft`   | `number \| null` | `null`  | Left outer margin; `null` uses `margin`           |

## Mobile and resize

| Option                    | Type      | Default | Description                                                               |
| ------------------------- | --------- | ------- | ------------------------------------------------------------------------- |
| `mobileBreakpoint`        | `number`  | `640`   | Below this width (in pixels) items are stacked in a single column         |
| `useBodyForBreakpoint`    | `boolean` | `false` | Compare the breakpoint with the `<body>` width instead of the grid width  |
| `keepFixedHeightInMobile` | `boolean` | `false` | Keep `fixedRowHeight`-based heights in the mobile layout                  |
| `keepFixedWidthInMobile`  | `boolean` | `false` | Keep `fixedColWidth` as width in the mobile layout                        |
| `disableWindowResize`     | `boolean` | `false` | Stop recalculating the layout when the window or the container is resized |

See [Responsive and Mobile](Responsive-and-Mobile).

## Drag

| Option                            | Type                                                   | Default                   | Description                                                               |
| --------------------------------- | ------------------------------------------------------ | ------------------------- | ------------------------------------------------------------------------- |
| `draggable.enabled`               | `boolean`                                              | `false`                   | Allow dragging items                                                      |
| `draggable.delayStart`            | `number`                                               | `0`                       | Milliseconds to hold before the drag starts (useful on touch devices)     |
| `draggable.ignoreContentClass`    | `string`                                               | `'gridster-item-content'` | A drag does not start inside elements with this class                     |
| `draggable.ignoreContent`         | `boolean`                                              | `false`                   | Start a drag only from elements with `dragHandleClass`                    |
| `draggable.dragHandleClass`       | `string`                                               | `'drag-handler'`          | Class of the drag handles when `ignoreContent` is `true`                  |
| `draggable.start`                 | `(item, itemComponent, event) => void`                 | `undefined`               | Called when a drag starts                                                 |
| `draggable.stop`                  | `(item, itemComponent, event) => Promise<any> \| void` | `undefined`               | Called when a drag ends; reject the returned promise to cancel the move   |
| `draggable.dropOverItems`         | `boolean`                                              | `false`                   | Allow dropping an item over another one (with `swap` and `pushItems` off) |
| `draggable.dropOverItemsCallback` | `(source, target, gridster) => void`                   | `undefined`               | Called when an item is dropped over another one                           |
| `enableBoundaryControl`           | `boolean`                                              | `false`                   | Keep dragged and resized items inside the grid edges                      |
| `scrollSensitivity`               | `number`                                               | `10`                      | Distance in pixels from a grid edge at which auto-scroll starts           |
| `scrollSpeed`                     | `number`                                               | `20`                      | Auto-scroll step in pixels (every 40 ms)                                  |
| `disableScrollHorizontal`         | `boolean`                                              | `false`                   | Disable horizontal auto-scroll                                            |
| `disableScrollVertical`           | `boolean`                                              | `false`                   | Disable vertical auto-scroll                                              |

See [Drag](Drag).

## Resize

| Option                 | Type                                                   | Default     | Description                                                         |
| ---------------------- | ------------------------------------------------------ | ----------- | ------------------------------------------------------------------- |
| `resizable.enabled`    | `boolean`                                              | `false`     | Allow resizing items                                                |
| `resizable.delayStart` | `number`                                               | `0`         | Milliseconds to hold before the resize starts                       |
| `resizable.handles`    | `{ n, e, s, w, ne, nw, se, sw: boolean }`              | all `true`  | Enabled resize handles                                              |
| `resizable.start`      | `(item, itemComponent, event) => void`                 | `undefined` | Called when a resize starts                                         |
| `resizable.stop`       | `(item, itemComponent, event) => Promise<any> \| void` | `undefined` | Called when a resize ends; reject the returned promise to cancel it |

See [Resize](Resize).

## Push, swap and compaction

| Option                | Type                                                                                                                                                                                                                                                                     | Default    | Description                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | -------------------------------------------------------------------- |
| `pushItems`           | `boolean`                                                                                                                                                                                                                                                                | `false`    | Push other items away while dragging or resizing                     |
| `disablePushOnDrag`   | `boolean`                                                                                                                                                                                                                                                                | `false`    | Do not push while dragging                                           |
| `disablePushOnResize` | `boolean`                                                                                                                                                                                                                                                                | `false`    | Do not push while resizing                                           |
| `pushDirections`      | `{ north, east, south, west: boolean }`                                                                                                                                                                                                                                  | all `true` | Directions items can be pushed to                                    |
| `pushResizeItems`     | `boolean`                                                                                                                                                                                                                                                                | `false`    | Shrink adjacent items while resizing                                 |
| `swap`                | `boolean`                                                                                                                                                                                                                                                                | `true`     | Swap two items when one is dropped over the other                    |
| `swapWhileDragging`   | `boolean`                                                                                                                                                                                                                                                                | `false`    | Swap as soon as the dragged item overlaps another one                |
| `compactType`         | `'none' \| 'compactUp' \| 'compactLeft' \| 'compactUp&Left' \| 'compactLeft&Up' \| 'compactRight' \| 'compactUp&Right' \| 'compactRight&Up' \| 'compactDown' \| 'compactDown&Left' \| 'compactLeft&Down' \| 'compactDown&Right' \| 'compactRight&Down' \| 'compactGrid'` | `'none'`   | Move items towards a side to fill gaps. See [Compaction](Compaction) |

See [Push and Swap](Push-and-Swap).

## Placement

| Option                          | Type      | Default | Description                                                    |
| ------------------------------- | --------- | ------- | -------------------------------------------------------------- |
| `disableAutoPositionOnConflict` | `boolean` | `false` | Do not move items that overlap or do not fit; they stay hidden |
| `disableWarnings`               | `boolean` | `false` | Do not log warnings about items that cannot be placed          |
| `scrollToNewItems`              | `boolean` | `false` | Scroll new items into view                                     |

## Empty cells

| Option                         | Type                                | Default     | Description                                                            |
| ------------------------------ | ----------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `enableEmptyCellClick`         | `boolean`                           | `false`     | Call `emptyCellClickCallback` on click (and tap)                       |
| `enableEmptyCellContextMenu`   | `boolean`                           | `false`     | Call `emptyCellContextMenuCallback` on right click                     |
| `enableEmptyCellDrop`          | `boolean`                           | `false`     | Call `emptyCellDropCallback` when HTML5 drag and drop ends on the grid |
| `enableEmptyCellDrag`          | `boolean`                           | `false`     | Call `emptyCellDragCallback` after selecting an area of empty cells    |
| `enableEmptyCellHover`         | `boolean`                           | `false`     | Show the preview over free cells while hovering                        |
| `enableOccupiedCellDrop`       | `boolean`                           | `false`     | Also fire the empty cell events over occupied cells                    |
| `emptyCellClickCallback`       | `(event: MouseEvent, item) => void` | `undefined` |                                                                        |
| `emptyCellContextMenuCallback` | `(event: MouseEvent, item) => void` | `undefined` |                                                                        |
| `emptyCellDropCallback`        | `(event: DragEvent, item) => void`  | `undefined` |                                                                        |
| `emptyCellDragCallback`        | `(event: MouseEvent, item) => void` | `undefined` |                                                                        |
| `emptyCellDragMaxCols`         | `number`                            | `50`        | Maximum columns selected by an empty cell drag                         |
| `emptyCellDragMaxRows`         | `number`                            | `50`        | Maximum rows selected by an empty cell drag                            |

See [Empty Cells](Empty-Cells).

## Layers

| Option              | Type      | Default | Description                                 |
| ------------------- | --------- | ------- | ------------------------------------------- |
| `allowMultiLayer`   | `boolean` | `false` | Items on different layers can overlap       |
| `defaultLayerIndex` | `number`  | `0`     | Layer of items without `layerIndex`         |
| `maxLayerIndex`     | `number`  | `2`     | Highest layer                               |
| `baseLayerIndex`    | `number`  | `1`     | Added to the layer to compute the `z-index` |

See [Multi-Layer](Multi-Layer).

## Callbacks

| Option                    | Signature                                                         | Called                                                           |
| ------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| `initCallback`            | `(gridster: Gridster, api: GridsterApi) => void`                  | When the grid is initialised                                     |
| `destroyCallback`         | `(gridster: Gridster) => void`                                    | When the grid is destroyed                                       |
| `gridSizeChangedCallback` | `(gridster: Gridster) => void`                                    | When the number of rows or columns changes                       |
| `itemChangeCallback`      | `(item: GridsterItemConfig, itemComponent: GridsterItem) => void` | When an item changes `x`, `y`, `cols` or `rows`                  |
| `itemResizeCallback`      | `(item: GridsterItemConfig, itemComponent: GridsterItem) => void` | When the pixel size of an item changes                           |
| `itemInitCallback`        | `(item: GridsterItemConfig, itemComponent: GridsterItem) => void` | When an item gets its first size                                 |
| `itemRemovedCallback`     | `(item: GridsterItemConfig, itemComponent: GridsterItem) => void` | When an item is removed                                          |
| `itemValidateCallback`    | `(item: GridsterItemConfig) => boolean`                           | Before accepting a position or size; return `false` to reject it |

See [Events and Callbacks](Events-and-Callbacks).
