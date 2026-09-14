# Dynamic Widgets

A dashboard usually shows a different component per item. Put the widget type (and any data) on the item object: the grid keeps unknown properties untouched. Demos: [Dynamic Widgets](https://legrottagliegionata.github.io/angular-gridster2-plus/dynamicWidgets), [Track By](https://legrottagliegionata.github.io/angular-gridster2-plus/trackBy).

## With @switch

```typescript
type WidgetItem = GridsterItemConfig & { id: string; type: 'chart' | 'table' | 'note' };

dashboard: WidgetItem[] = [
  { id: 'a', type: 'chart', x: 0, y: 0, cols: 4, rows: 3 },
  { id: 'b', type: 'table', x: 4, y: 0, cols: 2, rows: 3 }
];
```

<!-- prettier-ignore -->
```html
<gridster [options]="options">
  @for (item of dashboard; track item.id) {
    <gridster-item [item]="item">
      @switch (item.type) {
        @case ('chart') {
          <app-chart [config]="item" />
        }
        @case ('table') {
          <app-table [config]="item" />
        }
        @default {
          <app-note [config]="item" />
        }
      }
    </gridster-item>
  }
</gridster>
```

## With NgComponentOutlet

```typescript
readonly widgets: Record<string, Type<unknown>> = { chart: ChartWidget, table: TableWidget };
```

```html
<gridster-item [item]="item">
  <ng-container *ngComponentOutlet="widgets[item.type]; inputs: { config: item }" />
</gridster-item>
```

## Tracking items

Always track items by a stable id (`track item.id`). Tracking by object identity (`track item`) destroys and recreates the widget whenever the item object is replaced, for example after [changing it from code](Items#changing-an-item-from-code).

## Resizing the widget content

Charts and maps usually need to be told that their container changed size. The item emits `itemResize` when its pixel size changes:

```html
<gridster-item [item]="item" (itemResize)="chart.resize()">
  <app-chart #chart [config]="item" />
</gridster-item>
```

Alternatively the widget can observe its own host element with a `ResizeObserver`, which also works when the widget is used outside the grid.

## Initialising the content

Items are hidden until the grid has computed their size. Libraries that measure their container at creation should start after `itemInit`, which is emitted once the item has a size.
