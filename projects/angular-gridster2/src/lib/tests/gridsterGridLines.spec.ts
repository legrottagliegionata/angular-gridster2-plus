import { NO_ERRORS_SCHEMA, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Gridster } from '../gridster';
import { GridsterPreview } from '../gridsterPreview';

describe('display grid lines', () => {
  // upstream #790 (and the extra columns of #700): the lines filled the visible area,
  // showing columns and rows the items can never use
  it('draws no more lines than maxCols and maxRows', async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Gridster, GridsterPreview],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    const fixture = TestBed.createComponent(Gridster);
    const gridster = fixture.componentInstance;
    Object.defineProperty(gridster.el, 'clientWidth', { configurable: true, get: () => 1000 });
    Object.defineProperty(gridster.el, 'clientHeight', { configurable: true, get: () => 1000 });

    fixture.componentRef.setInput('options', {
      gridType: 'fixed',
      fixedColWidth: 10,
      fixedRowHeight: 10,
      margin: 0,
      outerMargin: false,
      mobileBreakpoint: 0,
      displayGrid: 'always',
      minCols: 1,
      maxCols: 4,
      minRows: 1,
      maxRows: 3
    });
    fixture.detectChanges();
    await fixture.whenStable();

    gridster.api.calculateLayout();

    expect(gridster.gridColumns.length).toBe(4);
    expect(gridster.gridRows.length).toBe(3);
  });
});
