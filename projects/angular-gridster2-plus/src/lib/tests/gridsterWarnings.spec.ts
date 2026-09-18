import { NO_ERRORS_SCHEMA, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Gridster } from '../gridster';
import { GridType } from '../gridsterConfig';
import { GridsterConfigService } from '../gridsterConfig.constant';
import { GridsterItem } from '../gridsterItem';
import type { GridsterItemConfig } from '../gridsterItemConfig';
import { GridsterPreview } from '../gridsterPreview';

function createItemComponent(item: GridsterItemConfig): GridsterItem {
  const state = { ...item };
  return { $item: () => state, item: () => item, itemChanged: vi.fn(), notPlaced: false } as unknown as GridsterItem;
}

describe('Gridster placement warnings', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Gridster, GridsterItem, GridsterPreview],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warn.mockRestore();
  });

  function createGridster(options: Record<string, unknown>): Gridster {
    const gridster = TestBed.createComponent(Gridster).componentInstance;
    Object.defineProperty(gridster, 'options', {
      value: signal({ ...GridsterConfigService, gridType: GridType.Fixed, mobileBreakpoint: 0, disableWarnings: false, ...options })
    });
    return gridster;
  }

  it('prints the conflicting item when it cannot be placed where requested', () => {
    const gridster = createGridster({ disableAutoPositionOnConflict: true });
    gridster.grid = [createItemComponent({ x: 0, y: 0, cols: 1, rows: 1 })];

    gridster.addItem(createItemComponent({ x: 0, y: 0, cols: 1, rows: 1 }));

    expect(warn).toHaveBeenCalledWith('Can\'t be placed in the bounds of the dashboard, trying to auto position!\n{"cols":1,"rows":1,"x":0,"y":0}');
  });

  it('prints the item that does not fit anywhere', () => {
    const gridster = createGridster({ minCols: 1, maxCols: 1, minRows: 1, maxRows: 1 });
    gridster.grid = [createItemComponent({ x: 0, y: 0, cols: 1, rows: 1 })];

    gridster.autoPositionItem(createItemComponent({ x: 0, y: 0, cols: 1, rows: 1 }));

    expect(warn).toHaveBeenCalledWith('Can\'t be placed in the bounds of the dashboard!\n{"cols":1,"rows":1,"x":0,"y":0}');
  });
});
