# Empty Cells

The grid can react to interactions on free cells. Each feature has a flag and a callback; the grid never adds items by itself: the callback receives a suggested item and you decide what to do with it. Demo: [Empty Cell](https://legrottagliegionata.github.io/angular-gridster2-plus/emptyCell).

```typescript
options: GridsterConfig = {
  enableEmptyCellClick: true,
  emptyCellClickCallback: (event, item) => this.addItem(item)
};

addItem(item: GridsterItemConfig): void {
  this.dashboard.push({ ...item, id: crypto.randomUUID() });
}
```

The suggested item has the `x`/`y` of the cell under the pointer and `cols`/`rows` of at least `defaultItemCols`/`defaultItemRows` and `minItemCols`/`minItemRows`. Items clicked or dropped near the right or bottom edge are moved inside `maxCols`/`maxRows`.

The callback must be set together with the flag: a flag without a callback does nothing.

| Feature                | Flag                         | Callback                                                |
| ---------------------- | ---------------------------- | ------------------------------------------------------- |
| Click (and tap)        | `enableEmptyCellClick`       | `emptyCellClickCallback(event: MouseEvent, item)`       |
| Right click            | `enableEmptyCellContextMenu` | `emptyCellContextMenuCallback(event: MouseEvent, item)` |
| Drop from outside      | `enableEmptyCellDrop`        | `emptyCellDropCallback(event: DragEvent, item)`         |
| Drag to select an area | `enableEmptyCellDrag`        | `emptyCellDragCallback(event: MouseEvent, item)`        |
| Hover preview          | `enableEmptyCellHover`       | none                                                    |

Clicks inside elements with the `gridster-item-content` or `drag-handler` classes are ignored, and so is the click that ends an item drag.

## Drop from outside

Make any element draggable with HTML5 drag and drop and enable `enableEmptyCellDrop`. While dragging over the grid, the preview shows where the item would go; `emptyCellDropCallback` is called on drop.

```html
<div draggable="true" (dragstart)="dragStart($event, 'chart')">Chart</div>

<gridster [options]="options">...</gridster>
```

```typescript
options: GridsterConfig = {
  enableEmptyCellDrop: true,
  emptyCellDropCallback: (event, item) => {
    const type = event.dataTransfer?.getData('text/plain');
    this.dashboard.push({ ...item, id: crypto.randomUUID(), type });
  }
};

dragStart(event: DragEvent, type: string): void {
  event.dataTransfer?.setData('text/plain', type);
}
```

The preview uses `defaultItemCols`/`defaultItemRows`. To preview a different size per dragged element, assign new options with other defaults in `dragstart`.

## Drag to create

With `enableEmptyCellDrag` the user selects an area of free cells like a spreadsheet selection; `emptyCellDragCallback` is called on release with the selected area as `x`, `y`, `cols` and `rows`. The selection is limited by `emptyCellDragMaxCols`/`emptyCellDragMaxRows` (default 50) and is never smaller than `minItemCols`/`minItemRows`.

Starting the selection on the grid scrollbar scrolls the grid instead.

## Hover preview

`enableEmptyCellHover: true` shows the preview (`defaultItemCols` × `defaultItemRows`) over the free cell under the pointer, to hint that a click adds an item. It hides when the pointer leaves the grid, when a button is pressed or over occupied cells, and never replaces the preview of a drag.

## Occupied cells

`enableOccupiedCellDrop: true` also calls the callbacks when the pointer is over an item, for example to drop content into an existing widget.
