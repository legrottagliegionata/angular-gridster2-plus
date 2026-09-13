import { signal } from '@angular/core';

import { DirTypes } from '../gridsterConfig';
import { GridsterEmptyCell } from '../gridsterEmptyCell';

function createEmptyCell($options: Record<string, unknown>, scrollLeft = 0): GridsterEmptyCell {
  const gridster = {
    options: signal({ scale: 1 }),
    $options: signal($options),
    el: { scrollLeft },
    gridRenderer: {
      getLeftMargin: () => 0
    }
  };

  return new GridsterEmptyCell(gridster as never);
}

describe('gridsterEmptyCell horizontal position', () => {
  const rect = {
    left: 0,
    right: 400
  } as ClientRect;
  const event = { clientX: 350 } as MouseEvent;

  it('measures empty-cell positions from the left in LTR mode', () => {
    expect(createEmptyCell({ dirType: DirTypes.LTR }).getPixelsX(event, rect)).toBe(350);
  });

  it('adds the horizontal scroll in LTR mode', () => {
    expect(createEmptyCell({ dirType: DirTypes.LTR }, 100).getPixelsX(event, rect)).toBe(450);
  });

  it('measures empty-cell positions from the right in RTL mode', () => {
    expect(createEmptyCell({ dirType: DirTypes.RTL }).getPixelsX(event, rect)).toBe(50);
  });

  it('adds the scrolled distance in RTL mode, where scrollLeft is negative', () => {
    expect(createEmptyCell({ dirType: DirTypes.RTL }, -100).getPixelsX(event, rect)).toBe(150);
  });

  it('subtracts the right outer margin in RTL mode', () => {
    expect(createEmptyCell({ dirType: DirTypes.RTL, outerMargin: true, margin: 10, outerMarginRight: 30 }).getPixelsX(event, rect)).toBe(20);
    expect(createEmptyCell({ dirType: DirTypes.RTL, outerMargin: true, margin: 10, outerMarginRight: null }).getPixelsX(event, rect)).toBe(40);
  });
});
