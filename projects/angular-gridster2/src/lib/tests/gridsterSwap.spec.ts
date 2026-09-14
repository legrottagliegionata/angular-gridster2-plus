import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Gridster } from '../gridster';
import { GridsterConfig, GridType } from '../gridsterConfig';
import { GridsterItem } from '../gridsterItem';
import { GridsterItemConfig } from '../gridsterItemConfig';

@Component({
  template: `<gridster [options]="options">
    @for (item of dashboard; track item) {
      <gridster-item [item]="item" />
    }
  </gridster>`,
  imports: [Gridster, GridsterItem]
})
class SwapHost {
  options: GridsterConfig = {
    gridType: GridType.Fixed,
    fixedColWidth: 100,
    fixedRowHeight: 100,
    margin: 0,
    outerMargin: false,
    mobileBreakpoint: 0,
    minCols: 6,
    maxCols: 6,
    minRows: 6,
    maxRows: 8,
    pushItems: false,
    swap: true,
    draggable: { enabled: true }
  };
  dashboard: GridsterItemConfig[] = [
    { id: 'dragged', x: 0, y: 5, cols: 2, rows: 1 },
    { id: 'first', x: 4, y: 3, cols: 1, rows: 2 },
    { id: 'second', x: 3, y: 4, cols: 1, rows: 2 }
  ];
}

function overlaps(a: GridsterItemConfig, b: GridsterItemConfig): boolean {
  return a.x < b.x + b.cols && a.x + a.cols > b.x && a.y < b.y + b.rows && a.y + a.rows > b.y;
}

describe('GridsterSwap', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [SwapHost]
    }).compileComponents();
  });

  // upstream #484, #514: a second swap in the same drag forgot the first swapped item,
  // which stayed at its new position on screen while the layout kept the old one, under the dragged item
  it('does not leave an earlier swapped item behind when the dragged item swaps again', async () => {
    const fixture = TestBed.createComponent(SwapHost);
    fixture.detectChanges();
    await fixture.whenStable();
    const gridster = fixture.debugElement.query(By.directive(Gridster)).componentInstance as Gridster;
    gridster.calculateLayout();
    const dragged = gridster.grid.find(item => item.item()['id'] === 'dragged')!;

    dragged.drag.dragStart(new MouseEvent('mousedown'));
    // over "first" (swap), then one row down over "second" while "first" cannot go back
    for (const [x, y] of [
      [3, 3],
      [3, 4]
    ]) {
      dragged.drag.left = x * 100;
      dragged.drag.top = y * 100;
      dragged.drag.calculateItemPosition();
    }
    dragged.drag.dragStop(new MouseEvent('mouseup'));

    for (const item of gridster.grid) {
      expect(item.item()).toMatchObject({ x: item.$item().x, y: item.$item().y });
    }
    const layout = gridster.grid.map(item => item.item());
    expect(layout.filter((item, i) => layout.some((other, j) => i !== j && overlaps(item, other)))).toEqual([]);
  });
});
