# Multi-Layer

With `allowMultiLayer: true` items on different layers can overlap; collisions, pushes and swaps only happen between items on the same layer. Demo: [Multi Layer](https://legrottagliegionata.github.io/angular-gridster2-plus/multiLayer).

| Option              | Default | Description                             |
| ------------------- | ------- | --------------------------------------- |
| `allowMultiLayer`   | `false` | Enable layers                           |
| `defaultLayerIndex` | `0`     | Layer of items without `layerIndex`     |
| `maxLayerIndex`     | `2`     | Highest layer an item can be brought to |
| `baseLayerIndex`    | `1`     | Added to the layer to get the `z-index` |

The `z-index` of an item is `baseLayerIndex + layerIndex`, plus one while it is dragged or resized.

```typescript
options: GridsterConfig = { allowMultiLayer: true, maxLayerIndex: 3 };

dashboard: GridsterItemConfig[] = [
  { id: 1, x: 0, y: 0, cols: 4, rows: 3 },
  { id: 2, x: 1, y: 1, cols: 2, rows: 1, layerIndex: 1 } // drawn over item 1
];
```

## Changing the layer

The item component has `bringToFront(offset: number)` and `sendToBack(offset: number)`. A positive offset moves the item that many layers, within `0` and `maxLayerIndex`; `0` moves it straight to the top or bottom layer. The item `layerIndex` is updated and the `z-index` changes immediately.

```html
<gridster-item [item]="item" #itemComponent>
  <button (click)="itemComponent.bringToFront(1)">Up</button>
  <button (click)="itemComponent.sendToBack(1)">Down</button>
</gridster-item>
```
