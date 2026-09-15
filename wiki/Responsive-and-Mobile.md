# Responsive and Mobile

## Window and container resize

The grid recalculates its layout when the window is resized and when its container changes size (for example a side panel that collapses, a split view or a tab that becomes visible), through a `ResizeObserver`.

When the new layout only makes the grid's own scrollbar appear or disappear, the grid keeps that layout instead of recalculating it again, so it does not flicker between two sizes: the items can be off by the width of the scrollbar.

`disableWindowResize: true` turns both off. Then call `api.resize()` whenever the size of the grid changes. See [API](API).

## Mobile layout

When the grid is narrower than `mobileBreakpoint` (default `640` pixels), items are stacked in a single column:

- the order follows the desktop layout, row by row and left to right;
- items take the full width, or `fixedColWidth` with `keepFixedWidthInMobile: true`;
- the height keeps the proportions of the item (`rows × width / cols`), or `rows × fixedRowHeight` plus the margins with `keepFixedHeightInMobile: true`;
- drag and resize are disabled;
- `<gridster>` gets the `mobile` class.

| Option                    | Default | Description                                                    |
| ------------------------- | ------- | -------------------------------------------------------------- |
| `mobileBreakpoint`        | `640`   | Width below which the mobile layout is used; `0` never uses it |
| `useBodyForBreakpoint`    | `false` | Compare with the width of `<body>` instead of the grid         |
| `keepFixedHeightInMobile` | `false` | Use `fixedRowHeight` for the heights                           |
| `keepFixedWidthInMobile`  | `false` | Use `fixedColWidth` for the widths                             |

## Different layouts per screen size

The grid does not reflow items into fewer columns by itself (upstream #229). A reliable approach is to keep a layout per breakpoint, with the same item ids, and switch both the options and the items:

```typescript
private readonly breakpoints = inject(BreakpointObserver); // @angular/cdk/layout

layouts: Record<'wide' | 'narrow', GridsterItemConfig[]> = {
  wide: [
    { id: 'sales', x: 0, y: 0, cols: 4, rows: 2 },
    { id: 'orders', x: 4, y: 0, cols: 2, rows: 2 }
  ],
  narrow: [
    { id: 'sales', x: 0, y: 0, cols: 2, rows: 2 },
    { id: 'orders', x: 0, y: 2, cols: 2, rows: 2 }
  ]
};

dashboard = this.layouts.wide;
options: GridsterConfig = { minCols: 6, maxCols: 6 };

constructor() {
  this.breakpoints.observe('(max-width: 1024px)').subscribe(({ matches }) => {
    this.dashboard = matches ? this.layouts.narrow : this.layouts.wide;
    this.options = { ...this.options, minCols: matches ? 2 : 6, maxCols: matches ? 2 : 6 };
  });
}
```

Save each layout separately (see [Saving and Restoring Layouts](Saving-and-Restoring-Layouts)).

## Browser zoom and CSS scale

When the grid is inside an element scaled with CSS (`transform: scale()` or a zoom library), set `scale` to the same factor so pointer positions are converted correctly.
