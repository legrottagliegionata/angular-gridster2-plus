# Grid Size and Margins

Demos: [Grid Sizes](https://legrottagliegionata.github.io/angular-gridster2-plus/gridSizes), [Grid Margins](https://legrottagliegionata.github.io/angular-gridster2-plus/gridMargins).

## Rows and columns

The grid has as many rows and columns as its items need, never fewer than `minRows`/`minCols`:

| Option              | Default | Description                                                                 |
| ------------------- | ------- | --------------------------------------------------------------------------- |
| `minCols`           | `1`     | Columns always present                                                      |
| `maxCols`           | `100`   | Items cannot extend beyond this column                                      |
| `minRows`           | `1`     | Rows always present                                                         |
| `maxRows`           | `100`   | Items cannot extend beyond this row                                         |
| `addEmptyRowsCount` | `0`     | Extra empty rows after the last item, useful to drop items below the others |

- For a grid with a fixed number of columns, set `minCols` and `maxCols` to the same value.
- In `fit` grids more rows or columns mean smaller cells: limit them with `maxRows`/`maxCols` or use a scrolling grid type.
- `gridSizeChangedCallback` is called when the number of rows or columns changes.

Item size limits (`minItemCols`, `maxItemRows`, `maxItemArea`, ...) are described in [Items](Items#size-limits).

## Margins

| Option              | Default | Description                                           |
| ------------------- | ------- | ----------------------------------------------------- |
| `margin`            | `10`    | Gap between items, in pixels                          |
| `outerMargin`       | `true`  | Also leave a gap between the items and the grid edges |
| `outerMarginTop`    | `null`  | Top outer gap; `null` uses `margin`                   |
| `outerMarginRight`  | `null`  | Right outer gap; `null` uses `margin`                 |
| `outerMarginBottom` | `null`  | Bottom outer gap; `null` uses `margin`                |
| `outerMarginLeft`   | `null`  | Left outer gap; `null` uses `margin`                  |

```typescript
options: GridsterConfig = {
  margin: 16,
  outerMargin: true,
  outerMarginTop: 24,
  outerMarginBottom: 48
};
```

The outer margins are applied as padding on `<gridster>`. The overrides only apply when `outerMargin` is `true`.

In scrolling grids the bottom and right outer margins stay visible after scrolling to the last row or column: an invisible element, `.gridster-scroll-spacer`, makes them part of the scrollable area (browsers ignore the margins of absolutely positioned items there).
