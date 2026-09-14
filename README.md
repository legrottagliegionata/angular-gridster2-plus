# angular-gridster2-plus

[![npm version](https://badge.fury.io/js/angular-gridster2-plus.svg)](https://www.npmjs.com/package/angular-gridster2-plus)
[![Deploy demo](https://github.com/legrottagliegionata/angular-gridster2-plus/actions/workflows/deploy-demo.yml/badge.svg)](https://github.com/legrottagliegionata/angular-gridster2-plus/actions/workflows/deploy-demo.yml)
[![downloads](https://img.shields.io/npm/dm/angular-gridster2-plus.svg)](https://www.npmjs.com/package/angular-gridster2-plus)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/gionatalegrottaglie)

### Angular implementation of angular-gridster [Demo](https://legrottagliegionata.github.io/angular-gridster2-plus) · [Documentation](https://github.com/legrottagliegionata/angular-gridster2-plus/wiki)

Community-maintained fork of [angular-gridster2](https://github.com/tiberiuzuld/angular-gridster2) by [Tiberiu Zuld](https://github.com/tiberiuzuld), which is no longer actively developed. It keeps the same API and integrates the fixes contributed by the community.

### Requires Angular 22.x

## Browser support

What Angular supports [here](https://github.com/angular/angular)

## Install

`npm install angular-gridster2-plus --save`

### Migrating from angular-gridster2

The API is the same: replace the package and update the import paths.

```bash
npm uninstall angular-gridster2
npm install angular-gridster2-plus --save
```

```typescript
// before: import { Gridster, GridsterItem } from 'angular-gridster2';
import { Gridster, GridsterItem } from 'angular-gridster2-plus';
```

## How to use

```javascript
import {Component} from '@angular/core';
import {Gridster, GridsterItem} from 'angular-gridster2-plus';

@Component({
  standalone: true,
  imports: [Gridster, GridsterItem],
  ...
})
```

```html
<gridster [options]="options">
  @for (item of dashboard; track item) {
  <gridster-item [item]="item">
    <!-- your content here -->
  </gridster-item>
  }
</gridster>
```

Initialize a simple dashboard:

```typescript
   import { GridsterConfig, GridsterItemConfig }  from 'angular-gridster2-plus';
   options: GridsterConfig;
   dashboard: GridsterItemConfig[];

   static itemChange(item: GridsterItemConfig, itemComponent) {
     console.info('itemChanged', item, itemComponent);
   }

   static itemResize(item: GridsterItemConfig, itemComponent) {
     console.info('itemResized', item, itemComponent);
   }

   ngOnInit() {
     this.options = {
       itemChangeCallback: AppComponent.itemChange,
       itemResizeCallback: AppComponent.itemResize,
     };

     this.dashboard = [
       {cols: 2, rows: 1, y: 0, x: 0},
       {cols: 2, rows: 2, y: 0, x: 2}
     ];
   }

   changedOptions() {
     this.options = Object.assign({}, this.options);
   }

   removeItem(item: GridsterItemConfig) {
     this.dashboard.splice(this.dashboard.indexOf(item), 1);
   }

   addItem() {
     this.dashboard.push({cols: 1, rows: 1, y: 0, x: 0});
   }
```

##### Note: The gridster will take all the available space from the parent. It will not size depending on content. The parent of the component needs to have a size.

### Having iFrame in widgets content

iFrames can interfere with drag/resize of widgets. For a workaround please read [angular-gridster2 issue #233](https://github.com/tiberiuzuld/angular-gridster2/issues/233)

### Interact with content without dragging

Option 1 (without text selection):

```html
<gridster-item>
  <div (mousedown)="$event.stopPropagation()" (touchstart)="$event.stopPropagation()">Some content to click without dragging the widget</div>
  <div class="item-buttons">
    <button class="drag-handler">
      <md-icon>open_with</md-icon>
    </button>
    <button class="remove-button" (click)="removeItem($event, item)" (touchstart)="removeItem($event, item)">
      <md-icon>clear</md-icon>
    </button>
  </div>
</gridster-item>
```

Option 2 (with text selection):

```html
<gridster-item>
  <div class="gridster-item-content">Some content to select and click without dragging the widget</div>
  <div class="item-buttons">
    <button class="drag-handler">
      <md-icon>open_with</md-icon>
    </button>
    <button class="remove-button" (click)="removeItem($event, item)" (touchstart)="removeItem($event, item)">
      <md-icon>clear</md-icon>
    </button>
  </div>
</gridster-item>
```

### Contributors [here](https://github.com/legrottagliegionata/angular-gridster2-plus/graphs/contributors)

Originally created by [Tiberiu Zuld](https://github.com/tiberiuzuld) as [angular-gridster2](https://github.com/tiberiuzuld/angular-gridster2).

### [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/gionatalegrottaglie)

### License

The MIT License

Copyright (c) 2026 Tiberiu Zuld
Copyright (c) 2026 Gionata Legrottaglie
