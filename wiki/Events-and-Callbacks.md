# Events and Callbacks

Demo: [Grid Events](https://legrottagliegionata.github.io/angular-gridster2-plus/gridEvents).

## Grid callbacks

Set in the options object.

| Option                    | Signature                                        | Called                                                                                                                   |
| ------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `initCallback`            | `(gridster: Gridster, api: GridsterApi) => void` | When the grid is initialised; the place to keep a reference to the [API](API)                                            |
| `destroyCallback`         | `(gridster: Gridster) => void`                   | When the grid is destroyed                                                                                               |
| `gridSizeChangedCallback` | `(gridster: Gridster) => void`                   | When the number of rows or columns changes (not on pixel size changes)                                                   |
| `itemInitCallback`        | `(item, itemComponent) => void`                  | For each item, once it has a size                                                                                        |
| `itemChangeCallback`      | `(item, itemComponent) => void`                  | When `x`, `y`, `cols` or `rows` of an item change: drag, resize, push, swap, compaction, auto-positioning, clamped sizes |
| `itemResizeCallback`      | `(item, itemComponent) => void`                  | When the pixel width or height of an item changes, including window and container resizes                                |
| `itemRemovedCallback`     | `(item, itemComponent) => void`                  | When an item is removed from the grid                                                                                    |
| `itemValidateCallback`    | `(item) => boolean`                              | Before accepting a position or size; return `false` to reject it                                                         |

Interaction callbacks:

| Option                              | Signature                                                            | See                                     |
| ----------------------------------- | -------------------------------------------------------------------- | --------------------------------------- |
| `draggable.start`, `draggable.stop` | `(item, itemComponent, event) => void` (`stop` may return a promise) | [Drag](Drag#cancelling-a-drag)          |
| `draggable.dropOverItemsCallback`   | `(source, target, gridster) => void`                                 | [Drag](Drag#dropping-over-another-item) |
| `resizable.start`, `resizable.stop` | `(item, itemComponent, event) => void` (`stop` may return a promise) | [Resize](Resize#cancelling-a-resize)    |
| `emptyCell...Callback`              | `(event, item) => void`                                              | [Empty Cells](Empty-Cells)              |

## Item outputs

`<gridster-item>` emits the same item events as outputs. The payload is `{ item: GridsterItemConfig; itemComponent: GridsterItem }`.

| Output         | Emitted                                |
| -------------- | -------------------------------------- |
| `(itemInit)`   | Once, when the item has a size         |
| `(itemChange)` | When `x`, `y`, `cols` or `rows` change |
| `(itemResize)` | When the pixel size changes            |

```html
<gridster-item [item]="item" (itemChange)="save()" (itemResize)="chart.resize()">
  <app-chart #chart [config]="item" />
</gridster-item>
```

The item can also have its own `initCallback(item, itemComponent)`, called together with `itemInit`.

## Notes

- A single drag can change several items (pushed or swapped ones): expect several `itemChange` calls and debounce saving, see [Saving and Restoring Layouts](Saving-and-Restoring-Layouts).
- `itemResize` is emitted at the end of a resize, not while the handle moves.
- Callbacks run inside the Angular zone, so zone.js applications update their views; in zoneless applications use signals or `ChangeDetectorRef.markForCheck()` for state changed in callbacks.
