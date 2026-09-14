# Items

Each widget is a `GridsterItemConfig` object bound to `<gridster-item [item]="item">`. Demo: [Items](https://legrottagliegionata.github.io/angular-gridster2-plus/items).

## Item properties

| Property                     | Type                                       | Description                                                                       |
| ---------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------- |
| `x`                          | `number`                                   | Column of the top-left corner (0-based). `-1` lets the grid choose                |
| `y`                          | `number`                                   | Row of the top-left corner (0-based). `-1` lets the grid choose                   |
| `cols`                       | `number`                                   | Width in columns; missing uses `defaultItemCols`                                  |
| `rows`                       | `number`                                   | Height in rows; missing uses `defaultItemRows`                                    |
| `layerIndex`                 | `number`                                   | Layer with `allowMultiLayer`, see [Multi-Layer](Multi-Layer)                      |
| `dragEnabled`                | `boolean`                                  | Override `draggable.enabled` for this item                                        |
| `resizeEnabled`              | `boolean`                                  | Override `resizable.enabled` for this item                                        |
| `resizableHandles`           | `{ n, e, s, w, ne, nw, se, sw?: boolean }` | Override some of the grid `resizable.handles`; missing handles use the grid value |
| `compactEnabled`             | `boolean`                                  | `false` excludes the item from [Compaction](Compaction)                           |
| `itemAspectRatio`            | `number`                                   | Override `itemAspectRatio` (`cols / rows`)                                        |
| `minItemCols`, `maxItemCols` | `number`                                   | Override the grid column limits                                                   |
| `minItemRows`, `maxItemRows` | `number`                                   | Override the grid row limits                                                      |
| `minItemArea`, `maxItemArea` | `number`                                   | Override the grid area limits (`cols * rows`)                                     |
| `initCallback`               | `(item, itemComponent) => void`            | Called once when the item gets a size                                             |

Any other property (`id`, `type`, `title`, ...) is kept untouched, so the item object can carry your widget data.

## Positioning

- Items are placed at `x`/`y`. The grid writes the final position back into the same object after drags, resizes, pushes, swaps and compaction.
- `x: -1` or `y: -1` asks the grid for the first free position.
- When an item overlaps another one or does not fit in the grid, the grid logs a warning and moves it to the first free position. With `disableAutoPositionOnConflict: true` it stays where it is and is hidden (`itemComponent.notPlaced` is `true`). `disableWarnings: true` silences the warnings.
- `itemValidateCallback(item)` can reject positions and sizes: return `false` to treat them as a conflict.

## Size limits

`cols`, `rows` and `cols * rows` are limited by `minItemCols`/`maxItemCols`, `minItemRows`/`maxItemRows` and `minItemArea`/`maxItemArea`, from the item or from the grid options.

- While resizing, the item cannot go beyond the limits.
- When an item is added with `cols` or `rows` outside the column and row limits, they are clamped, the item object is updated and `itemChange` is emitted.
- `itemAspectRatio` (for example `16 / 9`) forces `cols / rows` while resizing.

## Changing an item from code

Replace the item object: with `track item.id` Angular keeps the same component and the grid renders the new values.

```typescript
resize(item: GridsterItemConfig): void {
  const index = this.dashboard.indexOf(item);
  this.dashboard[index] = { ...item, cols: item.cols + 1 };
}
```

- The grid does not push other items or check collisions for values set this way. Check the target first with `api.getNextPossiblePosition` (see [API](API)) or move the item with `GridsterPush` (see [Push and Swap](Push-and-Swap#from-code)).
- Call `api.calculateLayout()` if the change can alter the number of rows or columns.

To add an item, push a new object into the array; to remove it, remove it from the array (`itemRemovedCallback` is called).

## The item component

`<gridster-item>` is the `GridsterItem` component. Get it from `itemInitCallback`, `initCallback`, the item outputs or `api.getItemComponent(item)`.

| Member                                       | Description                                                         |
| -------------------------------------------- | ------------------------------------------------------------------- |
| `item()`                                     | The bound item object                                               |
| `$item()`                                    | The working copy used while dragging and resizing                   |
| `notPlaced`                                  | `true` when the item could not be placed                            |
| `bringToFront(offset)`, `sendToBack(offset)` | Change the layer, see [Multi-Layer](Multi-Layer#changing-the-layer) |
| `(itemInit)`, `(itemChange)`, `(itemResize)` | Outputs, see [Events and Callbacks](Events-and-Callbacks)           |
