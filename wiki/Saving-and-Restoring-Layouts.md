# Saving and Restoring Layouts

The layout is your array of items: the grid writes `x`, `y`, `cols` and `rows` back into the item objects. Saving means storing those values; restoring means passing them back.

## Saving

Save after changes, debounced: one drag can change several items (pushed, swapped or compacted ones).

```typescript
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GridsterConfig, GridsterItemConfig } from 'angular-gridster2-plus';
import { debounceTime, Subject } from 'rxjs';

type WidgetItem = GridsterItemConfig & { id: string };
type SavedPosition = Pick<WidgetItem, 'id' | 'x' | 'y' | 'cols' | 'rows'>;

@Component({/* ... */})
export class Dashboard {
  dashboard: WidgetItem[] = [];

  private readonly changes = new Subject<void>();

  options: GridsterConfig = {
    itemChangeCallback: () => this.changes.next()
  };

  constructor() {
    this.changes.pipe(debounceTime(300), takeUntilDestroyed()).subscribe(() => this.save());
  }

  save(): void {
    const layout: SavedPosition[] = this.dashboard.map(({ id, x, y, cols, rows }) => ({ id, x, y, cols, rows }));
    localStorage.setItem('dashboard', JSON.stringify(layout));
  }
}
```

Store only the layout fields and the id; keep the widget configuration separate if it is large.

## Restoring

```typescript
restore(widgets: WidgetItem[]): void {
  const saved: SavedPosition[] = JSON.parse(localStorage.getItem('dashboard') ?? '[]');
  const positions = new Map(saved.map(position => [position.id, position]));

  this.dashboard = widgets.map(widget => ({ ...widget, ...positions.get(widget.id) }));
}
```

When the saved layout does not fit the current options:

- items that overlap or do not fit are moved to the first free position (or hidden with `disableAutoPositionOnConflict: true`), see [Items](Items#positioning);
- sizes outside the item limits are clamped and `itemChange` is emitted, so the corrected layout is saved again.

## Per user or per screen size

Save one layout per user, and one per breakpoint when the columns change with the screen size (see [Responsive and Mobile](Responsive-and-Mobile#different-layouts-per-screen-size)).
