import { NO_ERRORS_SCHEMA, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gridster } from '../gridster';
import { GridsterItem } from '../gridsterItem';
import { GridsterItemConfig } from '../gridsterItemConfig';
import { GridsterPreview } from '../gridsterPreview';

function createItemComponent(item: GridsterItemConfig): GridsterItem {
  const $item = { ...item };
  return {
    $item: () => $item,
    item: () => item,
    setSize: vi.fn(),
    drag: { toggle: vi.fn() },
    resize: { toggle: vi.fn() },
    notPlaced: false
  } as unknown as GridsterItem;
}

describe('gridster getLastPossiblePosition', () => {
  let fixture: ComponentFixture<Gridster>;
  let gridster: Gridster;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Gridster, GridsterItem, GridsterPreview],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Gridster);
    gridster = fixture.componentInstance;
    fixture.componentRef.setInput('options', { mobileBreakpoint: 0, minCols: 3, maxCols: 3, minRows: 2, maxRows: 2 });
    fixture.detectChanges();
  });

  // upstream #875: the search after the last item restarted every row from the column of the last item,
  // so the next row was filled from the right and its first cells were never used
  it('continues from the first column on the rows after the last item', () => {
    gridster.grid = [
      createItemComponent({ x: 0, y: 0, cols: 1, rows: 1 }),
      createItemComponent({ x: 1, y: 0, cols: 1, rows: 1 }),
      createItemComponent({ x: 2, y: 0, cols: 1, rows: 1 })
    ];

    expect(gridster.getLastPossiblePosition({ x: 0, y: 0, cols: 1, rows: 1 })).toMatchObject({ x: 0, y: 1 });
  });

  it('keeps looking right of the last item on its own row', () => {
    gridster.grid = [createItemComponent({ x: 0, y: 0, cols: 1, rows: 1 })];

    expect(gridster.getLastPossiblePosition({ x: 0, y: 0, cols: 1, rows: 1 })).toMatchObject({ x: 1, y: 0 });
  });
});
