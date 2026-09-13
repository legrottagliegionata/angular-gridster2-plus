import { NO_ERRORS_SCHEMA, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Gridster } from '../gridster';
import { GridType } from '../gridsterConfig';
import { GridsterConfigService } from '../gridsterConfig.constant';
import { GridsterItem } from '../gridsterItem';
import { GridsterPreview } from '../gridsterPreview';

describe('Gridster', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Gridster, GridsterItem, GridsterPreview],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  function createGridster(gridType: GridType): Gridster {
    const gridster = TestBed.createComponent(Gridster).componentInstance;
    Object.defineProperty(gridster, 'options', {
      value: signal({
        ...GridsterConfigService,
        gridType,
        mobileBreakpoint: 0,
        minRows: 1,
        addEmptyRowsCount: 0,
        disableWarnings: true
      })
    });
    return gridster;
  }

  it.each([GridType.ScrollVertical, GridType.VerticalFixed])('keeps %s rows from shrinking while dragging', gridType => {
    const gridster = createGridster(gridType);
    gridster.rows = 12;
    gridster.dragInProgress = true;
    gridster.grid = [
      {
        notPlaced: false,
        $item: () => ({ x: 0, y: 0, cols: 1, rows: 4 })
      }
    ] as unknown as GridsterItem[];

    gridster.setGridDimensions();

    expect(gridster.rows).toBe(12);

    gridster.dragInProgress = false;
    gridster.setGridDimensions();

    expect(gridster.rows).toBe(4);
  });
});
