# API

Demo: [API](https://legrottagliegionata.github.io/angular-gridster2-plus/api).

## Getting the API

From `initCallback`:

```typescript
private gridApi?: GridsterApi;

options: GridsterConfig = {
  initCallback: (gridster, api) => (this.gridApi = api)
};
```

Or from the component:

```typescript
private readonly gridster = viewChild.required(Gridster);

recalculate(): void {
  this.gridster().api.calculateLayout();
}
```

## GridsterApi

| Method                                         | Returns                     | Description                                                                                                                                                                                                                                               |
| ---------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calculateLayout()`                            | `void`                      | Recompute rows, columns, cell sizes and item positions                                                                                                                                                                                                    |
| `resize()`                                     | `void`                      | Re-measure the grid element and recompute the layout. Needed only with `disableWindowResize: true`                                                                                                                                                        |
| `getNextPossiblePosition(item, startingFrom?)` | `boolean`                   | Find a free position for `item` and write it into `item.x`/`item.y`. Without `startingFrom`, an item already on the grid in a valid position keeps it. `startingFrom: { x?, y? }` starts the search from that cell. Returns `false` when there is no room |
| `getFirstPossiblePosition(item)`               | `GridsterItemConfig`        | A copy of `item` at the first free position                                                                                                                                                                                                               |
| `getLastPossiblePosition(item)`                | `GridsterItemConfig`        | A copy of `item` at the first free position after the last item                                                                                                                                                                                           |
| `getItemComponent(item)`                       | `GridsterItem \| undefined` | The component of an item, looked up by object identity                                                                                                                                                                                                    |

`cols` or `rows` set to `-1` in the item passed to `getNextPossiblePosition` use `defaultItemCols`/`defaultItemRows`.

```typescript
addAtFirstFreePosition(): void {
  const item = this.gridApi!.getFirstPossiblePosition({ x: 0, y: 0, cols: 2, rows: 1 });
  this.dashboard.push({ ...item, id: crypto.randomUUID() });
}
```

## Gridster component

Useful read-only members of the `Gridster` component (from `initCallback` or `viewChild`):

| Member                        | Description                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| `api`                         | The `GridsterApi`                                                   |
| `$options()`                  | The options merged with the defaults                                |
| `columns`, `rows`             | Current number of columns and rows                                  |
| `curColWidth`, `curRowHeight` | Current column width and row height in pixels, including the margin |
| `curWidth`, `curHeight`       | Measured size of the grid element                                   |
| `mobile`                      | `true` in the mobile layout                                         |
| `grid`                        | The item components                                                 |
| `el`                          | The `<gridster>` element                                            |

## Exports

| Export                                                                                                                | Kind                                                                                  |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `Gridster`, `GridsterItem`                                                                                            | Components                                                                            |
| `GridsterConfig`, `GridsterItemConfig`, `GridsterApi`, `Draggable`, `Resizable`, `PushDirections`, `ResizableHandles` | Types                                                                                 |
| `GridType`, `DisplayGrid`, `CompactType`, `DirTypes`                                                                  | Enums with the string values of the options                                           |
| `GridsterConfigService`                                                                                               | The default options                                                                   |
| `GridsterPush`, `GridsterPushResize`, `GridsterSwap`                                                                  | Programmatic push, push-resize and swap, see [Push and Swap](Push-and-Swap#from-code) |
| `GridsterCompact`                                                                                                     | Compaction logic                                                                      |

Members of the components that are not listed here are internal and may change.
