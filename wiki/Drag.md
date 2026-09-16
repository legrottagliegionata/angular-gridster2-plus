# Drag

Demo: [Drag](https://legrottagliegionata.github.io/angular-gridster2-plus/drag).

```typescript
options: GridsterConfig = {
  draggable: {
    enabled: true,
    delayStart: 0,
    start: (item, itemComponent, event) => console.info('drag start', item),
    stop: (item, itemComponent, event) => console.info('drag stop', item)
  }
};
```

- `dragEnabled` on an item overrides `draggable.enabled`.
- Dragging is disabled in the mobile layout.
- While dragging, the item gets the `gridster-item-moving` class and the target position is shown by `<gridster-preview>`.
- After the drop the grid updates `x`/`y` of the moved item (and of pushed or swapped items) and emits `itemChange`.

## Where a drag can start

By default a drag starts anywhere on the item, except:

- the resize handles;
- inside elements with the `draggable.ignoreContentClass` class (default `gridster-item-content`), which is also the way to keep text selectable and inputs usable.

```html
<gridster-item [item]="item">
  <header>Drag me</header>
  <div class="gridster-item-content">Selectable text, buttons and inputs</div>
</gridster-item>
```

To drag only from handles, set `ignoreContent: true` and mark the handles with `dragHandleClass` (default `drag-handler`):

```typescript
draggable: { enabled: true, ignoreContent: true, dragHandleClass: 'drag-handler' }
```

```html
<gridster-item [item]="item">
  <button class="drag-handler">⠿</button>
  <app-widget [config]="item" />
</gridster-item>
```

Alternatively, stop the event yourself: `(mousedown)="$event.stopPropagation()" (touchstart)="$event.stopPropagation()"`.

## Touch devices

`delayStart` (milliseconds) requires holding the item before the drag starts, so the page can still be scrolled with a swipe. Moving more than a few pixels during the delay cancels the drag.

## Cancelling a drag

`draggable.stop` may return a promise: resolve it to keep the new position, reject it to move the item (and any pushed or swapped item) back.

```typescript
draggable: {
  enabled: true,
  stop: (item, itemComponent) => this.layoutService.canMove(item) // Promise<void>
}
```

## Auto-scroll

In scrolling grids, the grid scrolls when the **pointer** gets within `scrollSensitivity` pixels (default `10`) of an edge, or leaves the grid, and stops when the pointer moves back.

| Option                    | Default | Description                                                                         |
| ------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `scrollSensitivity`       | `10`    | Distance from the edge in pixels (unscaled, following the writing direction in RTL) |
| `scrollSpeed`             | `20`    | Pixels scrolled every 40 ms                                                         |
| `disableScrollVertical`   | `false` | Turn off vertical auto-scroll                                                       |
| `disableScrollHorizontal` | `false` | Turn off horizontal auto-scroll                                                     |

Auto-scroll moves the scroll position of `<gridster>`: with `setGridSize: true` the page does not scroll while dragging, and the item stays under the pointer.

Scrolling the grid yourself during a drag, with the wheel or a trackpad, also keeps the item under the pointer. A drag the browser turns into a native one, which happens when the pointer starts on selected text, is stopped instead of leaving the item floating.

## Boundary control

`enableBoundaryControl: true` keeps dragged and resized items inside the grid edges.

## Dropping over another item

With `swap` (on by default) dropping an item over another one swaps them when both fit; with `pushItems` other items are moved away. See [Push and Swap](Push-and-Swap).

To let items overlap on drop instead, turn both off and enable `dropOverItems`:

```typescript
options: GridsterConfig = {
  swap: false,
  pushItems: false,
  draggable: {
    enabled: true,
    dropOverItems: true,
    dropOverItemsCallback: (source, target, gridster) => this.merge(source, target)
  }
};
```

## Dragging from outside the grid

Items cannot be dragged between grids. To add items by dragging something from outside, use HTML5 drag and drop with `enableEmptyCellDrop`, see [Empty Cells](Empty-Cells#drop-from-outside).
