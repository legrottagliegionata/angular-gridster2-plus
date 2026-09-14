# Compaction

`compactType` moves items towards one or two sides to fill the empty space. Demo: [Compact](https://legrottagliegionata.github.io/angular-gridster2-plus/compact).

| Value               | Items move                                   |
| ------------------- | -------------------------------------------- |
| `none` (default)    | nowhere                                      |
| `compactUp`         | up                                           |
| `compactLeft`       | left                                         |
| `compactRight`      | right                                        |
| `compactDown`       | down                                         |
| `compactUp&Left`    | up, then left                                |
| `compactLeft&Up`    | left, then up                                |
| `compactUp&Right`   | up, then right                               |
| `compactRight&Up`   | right, then up                               |
| `compactDown&Left`  | down, then left                              |
| `compactLeft&Down`  | left, then down                              |
| `compactDown&Right` | down, then right                             |
| `compactRight&Down` | right, then down                             |
| `compactGrid`       | into a row-by-row flow, like an app launcher |

```typescript
import { CompactType } from 'angular-gridster2-plus';

options: GridsterConfig = { compactType: CompactType.CompactUpAndLeft };
```

- Compaction runs on every layout: when items are added or removed, after drags and resizes and when options change. Moved items emit `itemChange`.
- While dragging, the preview shows where the item will end up after compaction.
- `compactEnabled: false` on an item keeps it where it is; the other items flow around it.
- `compactGrid` sorts items by row and column and places them left to right, starting a new row when the next item does not fit in the current number of columns.
