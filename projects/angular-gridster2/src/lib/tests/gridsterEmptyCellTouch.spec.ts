import { GridsterEmptyCell } from '../gridsterEmptyCell';
import type { GridsterItemConfig } from '../gridsterItemConfig';

function createEmptyCell() {
  const gridster = {
    el: document.createElement('div'),
    movingItem: null as GridsterItemConfig | null,
    $options: () => ({
      draggable: {
        ignoreContentClass: 'gridster-item-content',
        dragHandleClass: 'drag-handler'
      }
    }),
    previewStyle: vi.fn(),
    renderer: { listen: vi.fn(() => vi.fn()) },
    zone: { runOutsideAngular: (callback: () => void) => callback() }
  };
  const emptyCell = new GridsterEmptyCell(gridster as never);
  vi.spyOn(emptyCell, 'getValidItemFromEvent').mockReturnValue({ x: 0, y: 0, cols: 1, rows: 1 });
  return { emptyCell, gridster };
}

function pointerDown(type: string, buttons: number): MouseEvent {
  return {
    type,
    buttons,
    clientX: 10,
    clientY: 10,
    target: null,
    currentTarget: null,
    preventDefault: vi.fn(),
    stopPropagation: vi.fn()
  } as unknown as MouseEvent;
}

describe('GridsterEmptyCell drag start', () => {
  beforeEach(() => {
    // desktop Safari and Firefox without touch support do not define TouchEvent
    vi.stubGlobal('TouchEvent', undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('ignores non-primary mouse buttons', () => {
    const { emptyCell, gridster } = createEmptyCell();

    expect(() => emptyCell.emptyCellMouseDown(pointerDown('mousedown', 2))).not.toThrow();
    expect(gridster.movingItem).toBeNull();
    expect(gridster.renderer.listen).not.toHaveBeenCalled();
  });

  it('starts the drag from a touch', () => {
    const { emptyCell, gridster } = createEmptyCell();

    emptyCell.emptyCellMouseDown(pointerDown('touchstart', 0));

    expect(gridster.movingItem).toEqual({ x: 0, y: 0, cols: 1, rows: 1 });
    expect(gridster.renderer.listen).toHaveBeenCalledTimes(4);
  });
});
