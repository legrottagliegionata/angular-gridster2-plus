import { GridsterCompact } from '../gridsterCompact';
import { CompactType } from '../gridsterConfig';
import type { GridsterItemConfig } from '../gridsterItemConfig';

const COLS = 6;
const ROWS = 4;

function createGridster(compactType: CompactType, widgets: unknown[] = []) {
  return {
    grid: widgets,
    $options: () => ({ compactType }),
    checkCollision: (item: GridsterItemConfig) => item.x < 0 || item.y < 0 || item.x + item.cols > COLS || item.y + item.rows > ROWS
  };
}

function createWidget(item: GridsterItemConfig) {
  const source = { ...item };
  const state = { ...item };
  return { $item: () => state, item: () => source, itemChanged: vi.fn() };
}

const directionalTypes = Object.values(CompactType).filter(type => type !== CompactType.None && type !== CompactType.CompactGrid);

describe('GridsterCompact item compaction', () => {
  it('moves the dragged item to the right with compactRight', () => {
    const item = { x: 1, y: 2, cols: 2, rows: 1 };

    new GridsterCompact(createGridster(CompactType.CompactRight) as never).checkCompactItem(item);

    expect(item).toEqual({ x: 4, y: 2, cols: 2, rows: 1 });
  });

  it('moves the dragged item right and then up with compactRight&Up', () => {
    const item = { x: 1, y: 2, cols: 2, rows: 1 };

    new GridsterCompact(createGridster(CompactType.CompactRightAndUp) as never).checkCompactItem(item);

    expect(item).toEqual({ x: 4, y: 0, cols: 2, rows: 1 });
  });

  it.each(directionalTypes)('previews the position the grid compacts to with %s', compactType => {
    const start = { x: 2, y: 1, cols: 2, rows: 2 };
    const widget = createWidget(start);
    new GridsterCompact(createGridster(compactType, [widget]) as never).checkCompact();

    const previewed = { ...start };
    new GridsterCompact(createGridster(compactType) as never).checkCompactItem(previewed);

    expect(previewed).toEqual(widget.$item());
  });
});
