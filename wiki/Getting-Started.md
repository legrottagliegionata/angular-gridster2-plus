# Getting Started

## Requirements

- Angular 22 (`@angular/core` and `@angular/common` `^22.0.0`)
- RxJS 7

## Install

```bash
npm install angular-gridster2-plus --save
```

> The first `angular-gridster2-plus` release on npm is being prepared. Until it is published, build the library from the repository (`npm run build-lib`) and install `dist/angular-gridster2`.

The component styles are bundled with the components: there is no stylesheet to import.

## A first dashboard

`Gridster` is the grid (`<gridster>`) and `GridsterItem` is a widget (`<gridster-item>`). Both are standalone components.

```typescript
import { Component } from '@angular/core';
import { Gridster, GridsterConfig, GridsterItem, GridsterItemConfig } from 'angular-gridster2-plus';

@Component({
  selector: 'app-dashboard',
  imports: [Gridster, GridsterItem],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  options: GridsterConfig = {
    draggable: { enabled: true },
    resizable: { enabled: true },
    itemChangeCallback: item => console.info('item changed', item)
  };

  dashboard: GridsterItemConfig[] = [
    { id: 1, cols: 2, rows: 1, x: 0, y: 0 },
    { id: 2, cols: 2, rows: 2, x: 2, y: 0 }
  ];

  addItem(): void {
    // x and y set to -1: the grid looks for a free position
    this.dashboard.push({ id: Date.now(), cols: 1, rows: 1, x: -1, y: -1 });
  }

  removeItem(item: GridsterItemConfig): void {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  toggleEditing(): void {
    // options are read when the object changes: always assign a new object
    const enabled = !this.options.draggable?.enabled;
    this.options = { ...this.options, draggable: { enabled }, resizable: { enabled } };
  }
}
```

```html
<!-- dashboard.html -->
<button (click)="addItem()">Add</button>
<button (click)="toggleEditing()">Edit</button>

<gridster [options]="options">
  @for (item of dashboard; track item.id) {
  <gridster-item [item]="item">
    <button class="gridster-item-content" (click)="removeItem(item)">Remove</button>
  </gridster-item>
  }
</gridster>
```

```css
/* dashboard.css */
:host {
  display: block;
  height: 600px;
}
```

## Things to know from the start

- **The parent needs a size.** `<gridster>` fills its parent (`width` and `height` 100%). With a parent of height 0 nothing is visible. See [Grid Types](Grid-Types) for grids that grow with their content.
- **Options are applied when the object changes.** Mutating `options.margin = 5` does nothing until you assign a new object, as in `toggleEditing()` above.
- **Items are updated in place.** After a drag or resize the grid writes `x`, `y`, `cols` and `rows` back into your item objects, so `dashboard` always holds the current layout.
- **Track items by a stable id.** `track item.id` keeps the widget components when you replace item objects.
- **Content that should not start a drag** (buttons, inputs, text to select) goes inside an element with the `gridster-item-content` class, or use a drag handle. See [Drag](Drag).

## Next steps

- Pick a layout in [Grid Types](Grid-Types)
- Configure interactions in [Drag](Drag), [Resize](Resize) and [Push and Swap](Push-and-Swap)
- Persist the layout with [Saving and Restoring Layouts](Saving-and-Restoring-Layouts)
- Browse every option in the [Configuration Reference](Configuration-Reference)
