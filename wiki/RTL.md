# RTL

For right-to-left pages set `dirType: 'rtl'` (`DirTypes.RTL`). Demo: [RTL](https://legrottagliegionata.github.io/angular-gridster2-plus/rtl).

```typescript
import { DirTypes } from 'angular-gridster2-plus';

options: GridsterConfig = { dirType: DirTypes.RTL };
```

```html
<div dir="rtl">
  <gridster [options]="options">...</gridster>
</div>
```

- Column `0` is on the right and `x` grows towards the left.
- Dragging, resizing, auto-scroll and empty cell events are mirrored. The east and west resize handles keep their physical side.
- `dirType` does not set the `dir` attribute: set it on the page or on a parent of the grid.
