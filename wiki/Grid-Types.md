# Grid Types

`gridType` decides how the size of rows and columns is computed. Demo: [Grid Types](https://legrottagliegionata.github.io/angular-gridster2-plus/gridTypes).

| Type               | Columns                                      | Rows                                           | Scroll     |
| ------------------ | -------------------------------------------- | ---------------------------------------------- | ---------- |
| `fit` (default)    | fill the width                               | fill the height                                | none       |
| `scrollVertical`   | fill the width                               | as tall as the column width × `rowHeightRatio` | vertical   |
| `scrollHorizontal` | as wide as the row height × `rowHeightRatio` | fill the height                                | horizontal |
| `fixed`            | `fixedColWidth`                              | `fixedRowHeight`                               | both       |
| `verticalFixed`    | fill the width                               | `fixedRowHeight`                               | vertical   |
| `horizontalFixed`  | `fixedColWidth`                              | fill the height                                | horizontal |

```typescript
import { GridType } from 'angular-gridster2-plus';

options: GridsterConfig = {
  gridType: GridType.VerticalFixed,
  fixedRowHeight: 120,
  minCols: 12,
  maxCols: 12
};
```

The number of rows and columns follows the items: the grid grows to contain them, between `minCols`/`maxCols` and `minRows`/`maxRows`. See [Grid Size and Margins](Grid-Size-and-Margins).

## Cell size and margins

Each row and column includes the gap to the next one. An item spanning `n` cells covers the gaps between those cells, so two 1×1 items plus their gap are as wide as one 2×1 item:

```
item size = n × (cell size + margin) − margin
```

With `fixed`, `verticalFixed` and `horizontalFixed`, the cell size is `fixedColWidth`/`fixedRowHeight`: with `fixedRowHeight: 100` and `margin: 10`, a 2-row item is 210 px tall.

## ignoreMarginInRow

Fixed grid types only. The row (and column) pitch becomes exactly `fixedRowHeight` (`fixedColWidth`), and each item still removes one margin to keep the gap:

```
item size = n × cell size − margin
```

With `fixedRowHeight: 100`, `margin: 10` and `ignoreMarginInRow: true`, a 2-row item is 190 px tall and a new row starts every 100 px. This is the intended behaviour (upstream #224 and #227).

## setGridSize

By default `<gridster>` fills its parent and scrolls internally. With `setGridSize: true` the grid element gets the size of its content in the directions it grows, so the page or a parent container scrolls instead of the grid:

| Grid type                             | Size set by the grid                    |
| ------------------------------------- | --------------------------------------- |
| `fixed`                               | width and height                        |
| `verticalFixed`, `scrollVertical`     | height; the width follows the container |
| `horizontalFixed`, `scrollHorizontal` | width                                   |
| `fit`                                 | none, the grid fills its parent         |

- The size includes `outerMarginLeft/Right/Top/Bottom` and leaves out the outer margin when `outerMargin` is `false`.
- Auto-scroll during a drag scrolls the grid element only: it does not scroll the page.

## rowHeightRatio

- `scrollVertical`: row height = column width × `rowHeightRatio` (`0.5` makes rows half as tall as columns are wide).
- `scrollHorizontal`: column width = row height × `rowHeightRatio` for values of 1 and above, × `(1 + rowHeightRatio)` below 1.

## Mobile

Below `mobileBreakpoint` every grid type switches to the stacked mobile layout. See [Responsive and Mobile](Responsive-and-Mobile).
