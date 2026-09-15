import { signal } from '@angular/core';

import { GridsterRenderer } from '../gridsterRenderer';

describe('gridsterRenderer service', () => {
  it('keeps display grid rows inside the usable width without outer margin', () => {
    const gridster = {
      $options: signal({
        margin: 20,
        outerMargin: false,
        useTransformPositioning: true
      }),
      gridColumns: new Array(24),
      curColWidth: 25,
      curRowHeight: 61
    };
    const renderer = new GridsterRenderer(gridster as never);

    expect(renderer.getGridRowStyle(0).width).toBe('580px');
  });

  // upstream #897: with the outer margin the rows were 2 × margin wider than the columns and overflowed the grid
  it('keeps display grid rows as wide as the columns with outer margin', () => {
    const gridster = {
      $options: signal({
        margin: 20,
        outerMargin: true,
        useTransformPositioning: true
      }),
      gridColumns: new Array(24),
      gridRows: new Array(2),
      curColWidth: 25,
      curRowHeight: 61
    };
    const renderer = new GridsterRenderer(gridster as never);
    const lastColumn = renderer.getGridColumnStyle(23);

    expect(renderer.getGridRowStyle(0).width).toBe('580px');
    expect(lastColumn).toMatchObject({ transform: 'translateX(575px)', width: '5px' });
  });
});
