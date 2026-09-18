# Resize

Demo: [Resize](https://legrottagliegionata.github.io/angular-gridster2-plus/resize).

```typescript
options: GridsterConfig = {
  resizable: {
    enabled: true,
    handles: { n: true, e: true, s: true, w: true, ne: true, nw: true, se: true, sw: true },
    start: (item, itemComponent, event) => console.info('resize start', item),
    stop: (item, itemComponent, event) => console.info('resize stop', item)
  }
};
```

- `resizeEnabled` on an item overrides `resizable.enabled`.
- Resizing is disabled in the mobile layout.
- While resizing, the item gets the `gridster-item-resizing` class.
- On release the grid updates `cols`/`rows` (and `x`/`y` when resizing from the top or left) and emits `itemChange`.
- In scrolling grids the grid auto-scrolls near its edges as in [Drag](Drag#auto-scroll), and the edge being resized follows the scroll, also when you scroll with the wheel.

## Handles

The handles are elements with the classes `gridster-item-resizable-handler handle-<direction>`: `n`, `e`, `s`, `w` on the sides and `ne`, `nw`, `se`, `sw` on the corners.

`resizableHandles` on an item overrides only the handles it lists:

```typescript
// only the bottom-right corner for this item, the other handles come from the grid options
{ id: 3, x: 0, y: 0, cols: 2, rows: 2, resizableHandles: { n: false, e: false, s: false, w: false, ne: false, nw: false, sw: false } }
```

Change their look in [Styling](Styling#resize-handles).

## Limits and aspect ratio

The size stays within `minItemCols`/`maxItemCols`, `minItemRows`/`maxItemRows` and `minItemArea`/`maxItemArea` (grid options or item overrides). `itemAspectRatio` keeps `cols / rows` fixed, for example `16 / 9`. See [Items](Items#size-limits).

## Neighbours

- `pushItems: true` moves other items out of the way while resizing (unless `disablePushOnResize: true`).
- `pushResizeItems: true` shrinks the adjacent items instead of moving them.

See [Push and Swap](Push-and-Swap).

## Cancelling a resize

`resizable.stop` may return a promise: reject it to restore the previous size of the item and of the items it pushed or shrank.

## Touch devices

`resizable.delayStart` (milliseconds) requires holding the handle before the resize starts.

## Resizing the content

`itemResize` / `itemResizeCallback` are emitted when the pixel size of the item changes: after a resize, and when the grid itself is resized. They are not emitted continuously while the handle moves. Use them to resize charts; see [Dynamic Widgets](Dynamic-Widgets#resizing-the-widget-content).
