# Push and Swap

Demos: [Push](https://legrottagliegionata.github.io/angular-gridster2-plus/push), [Swap](https://legrottagliegionata.github.io/angular-gridster2-plus/swap), [API](https://legrottagliegionata.github.io/angular-gridster2-plus/api).

## Push

With `pushItems: true` a dragged or resized item moves the items it overlaps.

| Option                | Default                                                | Description                                       |
| --------------------- | ------------------------------------------------------ | ------------------------------------------------- |
| `pushItems`           | `false`                                                | Push items while dragging and resizing            |
| `disablePushOnDrag`   | `false`                                                | Do not push while dragging                        |
| `disablePushOnResize` | `false`                                                | Do not push while resizing                        |
| `pushDirections`      | `{ north: true, east: true, south: true, west: true }` | Directions pushed items can move to               |
| `pushResizeItems`     | `false`                                                | While resizing, shrink the adjacent items instead |

```typescript
options: GridsterConfig = {
  pushItems: true,
  pushDirections: { north: true, east: false, south: true, west: false }, // vertical only
  draggable: { enabled: true },
  resizable: { enabled: true }
};
```

- Only draggable items can be pushed; only resizable items can be shrunk by `pushResizeItems`. An item with `dragEnabled: false` blocks the push.
- A pushed item first moves in the direction of the push, then tries the perpendicular directions allowed by `pushDirections`. If no item can make room, the move is refused.
- Pushed items go back to their original position when the dragged item moves away again.
- Every pushed item emits `itemChange` when the drag or resize ends.

## Swap

| Option              | Default | Description                                                                       |
| ------------------- | ------- | --------------------------------------------------------------------------------- |
| `swap`              | `true`  | Dropping an item over another one swaps their positions when both fit             |
| `swapWhileDragging` | `false` | Swap as soon as the dragged item overlaps another one, and keep the new positions |

Swap works best with items of the same size: when one of them does not fit in the position of the other, nothing happens.

## From code

`GridsterPush`, `GridsterPushResize` and `GridsterSwap` apply the same logic to an item component, for example after changing its size.

```typescript
import { GridsterItem, GridsterPush } from 'angular-gridster2-plus';

grow(itemComponent: GridsterItem): void {
  const push = new GridsterPush(itemComponent);
  itemComponent.$item().rows += 4; // change the working copy of the item

  if (push.pushItems(push.fromNorth)) {
    push.checkPushBack(); // move items back where possible
    push.setPushedItems(); // apply the pushed positions and emit itemChange
    itemComponent.setSize();
    itemComponent.checkItemChanges(itemComponent.$item(), itemComponent.item());
  } else {
    itemComponent.$item().rows -= 4;
    push.restoreItems(); // put the pushed items back
  }
  push.destroy();
}
```

Get the item component from `itemInitCallback`, the item `initCallback` or `api.getItemComponent(item)`.

The direction says where the push comes from: `fromNorth` pushes the other items south (down), `fromSouth` north, `fromWest` east and `fromEast` west.

| Class                | Main methods                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `GridsterPush`       | `pushItems(direction, disable?)`, `checkPushBack()`, `setPushedItems()`, `restoreItems()`, `destroy()` |
| `GridsterPushResize` | `pushItems(direction)`, `checkPushBack()`, `setPushedItems()`, `restoreItems()`, `destroy()`           |
| `GridsterSwap`       | `swapItems()`, `setSwapItem()`, `restoreSwapItem()`, `destroy()`                                       |

`pushItems` respects the grid options: it does nothing when `pushItems` (or `pushResizeItems` for `GridsterPushResize`) is off.
