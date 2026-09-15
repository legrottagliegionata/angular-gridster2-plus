# FAQ

Answers to the questions asked most often in the angular-gridster2 issues.

## The grid is empty or has no height

`<gridster>` fills its parent. Give the parent a height (`height: 100vh`, a flex layout, a fixed height), or use a grid type that sizes itself, see [Grid Types](Grid-Types#setgridsize).

## I changed an option and nothing happened

Options are read when the options object changes. Assign a new object: `this.options = { ...this.options, margin: 4 }`.

## How do I change an item position or size from code?

Replace the item object and track items by id, see [Items](Items#changing-an-item-from-code). To move other items out of the way use `GridsterPush`, see [Push and Swap](Push-and-Swap#from-code).

## How do I save the layout?

Store `x`, `y`, `cols` and `rows` of your items when `itemChange` fires, debounced. See [Saving and Restoring Layouts](Saving-and-Restoring-Layouts).

## My chart does not resize with its item

Call the chart resize method on `(itemResize)`, or observe the widget element with a `ResizeObserver`. See [Dynamic Widgets](Dynamic-Widgets#resizing-the-widget-content).

## Dropdowns, date pickers or dialogs are cut off inside an item

Items have `overflow: hidden`, and with `useTransformPositioning` they are also the containing block of `position: fixed` elements. Render menus and dialogs in an overlay attached to `<body>` (Angular Material and the CDK do this by default) or set `useTransformPositioning: false`. See [Styling](Styling#positioning).

## The grid is wrong inside tabs, accordions or hidden containers

The grid follows the size of its container, so it updates when the tab becomes visible. A grid created inside a hidden panel measures 0 and its items come out wrong, and it lays itself out correctly as soon as the panel is shown. With `disableWindowResize: true` the grid is not watched: call `api.resize()` when the container is shown. See [Responsive and Mobile](Responsive-and-Mobile#window-and-container-resize).

## Clicking a button inside an item starts a drag

Put interactive content inside an element with the `gridster-item-content` class, use drag handles, or stop the `mousedown`/`touchstart` event. See [Drag](Drag#where-a-drag-can-start).

## How do I add widgets by dragging them from a sidebar?

Use HTML5 drag and drop with `enableEmptyCellDrop`. See [Empty Cells](Empty-Cells#drop-from-outside). Dragging items between two grids is not supported.

## How do I prevent dropping on empty cells, or allow dropping on items?

Leave `enableEmptyCellDrop` off to ignore drops. `enableOccupiedCellDrop: true` also fires the callbacks over existing items. `itemValidateCallback` can reject positions you do not allow.

## The console says "Can't be placed in the bounds of the dashboard"

An item overlaps another one or is outside the grid limits, so it was moved to the first free position. Check `maxCols`/`maxRows` and the item limits, or silence the warning with `disableWarnings: true`. See [Items](Items#positioning).

## Can item height follow the content?

Not automatically: items are sized in grid cells. Measure the content and set `rows` accordingly, or make the content scroll inside the item.

## How do I get a different number of columns on small screens?

Below `mobileBreakpoint` items are stacked in one column. For intermediate sizes switch options and layouts per breakpoint, see [Responsive and Mobile](Responsive-and-Mobile#different-layouts-per-screen-size).

## How do I read the number of rows and columns or the cell size?

From the `Gridster` component: `columns`, `rows`, `curColWidth`, `curRowHeight`. See [API](API#gridster-component).

## Does it work with server-side rendering?

The library can be imported on the server, but the layout needs a browser to measure elements. Render the grid only in the browser, for example inside `@defer` or behind `isPlatformBrowser`.

## Does it work without zone.js?

Yes. The library works in zoneless applications and in applications that use zone.js.

## How do I test drag and drop in end-to-end tests?

Dispatch `mousedown` on the item, then `mousemove` and `mouseup` on `document` with `clientX`/`clientY` coordinates; for external drops dispatch `dragover` and `drop` on `<gridster>`.

## Text inside items is blurry

With `useTransformPositioning: true` (the default) items are placed with `transform: translate3d()`. Depending on the screen scaling and on where the grid is on the page, browsers can draw that layer at fractional pixels and the text looks blurry (upstream #616). Set `useTransformPositioning: false` to place items with `top`/`left` instead; see [Styling](Styling#positioning).

## The grid is inside a CSS-scaled container and drags are offset

Set the `scale` option to the scale factor of the container. See [Responsive and Mobile](Responsive-and-Mobile#browser-zoom-and-css-scale).

## Can I nest grids?

Yes, a grid can be placed inside an item of another grid; the inner grid follows the size of its item.

`curColWidth` and `curRowHeight` are still `0` in `initCallback`, which runs before the first layout. Read them in `itemInitCallback`, in the item `initCallback` or in `gridSizeChangedCallback`, which run once the grid and its items have a size (upstream #624, #598).

## Can two grids share the same items?

No. The grid writes `x`, `y`, `cols` and `rows` into the item objects you pass it, so two grids over the same array, for example the same component shown in two tabs, overwrite each other's positions. Give each grid its own copy, such as `items.map(item => ({ ...item }))` (upstream #557).
