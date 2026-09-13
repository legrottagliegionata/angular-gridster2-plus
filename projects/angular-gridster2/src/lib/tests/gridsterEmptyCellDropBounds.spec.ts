import { signal } from '@angular/core';

import { GridsterEmptyCell } from '../gridsterEmptyCell';

function createEmptyCell() {
  const gridster: any = {
    options: signal({ scale: 1 }),
    $options: signal({
      defaultItemCols: 6,
      defaultItemRows: 3,
      minItemCols: 1,
      minItemRows: 1,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      enableOccupiedCellDrop: false,
      maxCols: 12,
      maxRows: 25
    }),
    el: {
      scrollLeft: 0,
      scrollTop: 0,
      getBoundingClientRect: () =>
        ({
          left: 0,
          top: 0
        }) as ClientRect
    },
    gridRenderer: {
      getLeftMargin: () => 0,
      getTopMargin: () => 0
    },
    pixelsToPositionX: (x: number, roundingMethod: (x: number) => number) => roundingMethod(x / 100),
    pixelsToPositionY: (y: number, roundingMethod: (y: number) => number) => roundingMethod(y / 100),
    checkCollision: vi.fn(() => false)
  };

  return { emptyCell: new GridsterEmptyCell(gridster), gridster };
}

function mouseAt(clientX: number, clientY: number): MouseEvent {
  return {
    clientX,
    clientY,
    preventDefault: vi.fn(),
    stopPropagation: vi.fn()
  } as unknown as MouseEvent;
}

describe('gridsterEmptyCell drop bounds', () => {
  it('keeps default-sized drop items inside max grid bounds', () => {
    const { emptyCell, gridster } = createEmptyCell();

    const item = emptyCell.getValidItemFromEvent(mouseAt(700, 100));

    expect(item).toMatchObject({ x: 6, y: 1, cols: 6, rows: 3 });
    expect(gridster.checkCollision).toHaveBeenCalledWith(item);
  });

  it('does not move the drag-to-create anchor to fit the grid', () => {
    const { emptyCell } = createEmptyCell();

    // anchor on column 10 of a 12-column grid, pointer dragged to column 13
    const item = emptyCell.getValidItemFromEvent(mouseAt(1350, 100), { x: 10, y: 1, cols: 1, rows: 1 });

    expect(item).toMatchObject({ x: 10, y: 1, cols: 4, rows: 1 });
  });
});
