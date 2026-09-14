# Migrating from angular-gridster2

## Replace the package

```bash
npm uninstall angular-gridster2
npm install angular-gridster2-plus --save
```

Then update the import paths:

```typescript
// before
import { Gridster, GridsterConfig, GridsterItem, GridsterItemConfig } from 'angular-gridster2';
// after
import { Gridster, GridsterConfig, GridsterItem, GridsterItemConfig } from 'angular-gridster2-plus';
```

The exported names, options and CSS classes are the same as in angular-gridster2 22.

## Behaviour changes compared to angular-gridster2 22

The fork integrates community pull requests and fixes that change a few behaviours. Most applications need no change.

| Area                      | Change                                                                                                                                                                                                            | Details                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Auto-scroll               | Starts when the **pointer** gets within `scrollSensitivity` pixels of a grid edge (or leaves the grid), no longer when the edge of the dragged item gets close. Items taller than the grid can now be dragged up. | [Drag](Drag#auto-scroll)                                                   |
| Container resize          | The grid recalculates when its container changes size (for example a collapsible side panel), not only on window resize. `disableWindowResize: true` turns both off.                                              | [Responsive and Mobile](Responsive-and-Mobile#window-and-container-resize) |
| Loaded item sizes         | Items whose `cols`/`rows` are outside the item limits are clamped when they are added; the item object is updated and `itemChange` is emitted.                                                                    | [Items](Items#size-limits)                                                 |
| Mobile layout             | Stacked items keep the desktop order (row by row) instead of the DOM order.                                                                                                                                       | [Responsive and Mobile](Responsive-and-Mobile#mobile-layout)               |
| `getNextPossiblePosition` | Passing an item that is already on the grid in a valid position keeps that position.                                                                                                                              | [API](API)                                                                 |
| `setGridSize`             | The grid size includes `outerMarginLeft/Right/Top/Bottom` and excludes the outer margin when `outerMargin` is `false`.                                                                                            | [Grid Types](Grid-Types#setgridsize)                                       |
| New option                | `enableEmptyCellHover` shows the preview over free cells.                                                                                                                                                         | [Empty Cells](Empty-Cells#hover-preview)                                   |

Bug fixes are listed in the [pull requests](https://github.com/legrottagliegionata/angular-gridster2-plus/pulls?q=is%3Apr+is%3Amerged) of the repository.

## Coming from older angular-gridster2 versions

Upstream renamed several APIs while moving to standalone components and signals. If your code uses the old names:

| Before                                                               | Now                                                                                             |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `GridsterComponent`                                                  | `Gridster`                                                                                      |
| `GridsterItemComponent`                                              | `GridsterItem` (the component)                                                                  |
| `GridsterItem` (the item interface)                                  | `GridsterItemConfig`                                                                            |
| `GridsterComponentInterface`                                         | `Gridster`                                                                                      |
| `GridsterItemComponentInterface`                                     | `GridsterItem`                                                                                  |
| `GridsterModule`                                                     | import `Gridster` and `GridsterItem` in the standalone `imports`                                |
| `options.api.optionsChanged()`                                       | assign a new options object: `this.options = { ...this.options }`                               |
| `options.api.resize()`, `options.api.getNextPossiblePosition()`, ... | the `api` passed to `initCallback(gridster, api)` or `viewChild(Gridster).api`, see [API](API)  |
| `itemComponent.item`, `itemComponent.$item` (properties)             | `itemComponent.item()`, `itemComponent.$item()` (signals)                                       |
| `@Input`/`@Output` bindings                                          | the same template bindings: `[options]`, `[item]`, `(itemInit)`, `(itemChange)`, `(itemResize)` |

For programmatic push and swap with the new signals, see [Push and Swap](Push-and-Swap#from-code).
