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
class ScrollHost {
  options: GridsterConfig = {
    gridType: GridType.Fixed,
    fixedColWidth: 100,
    fixedRowHeight: 100,
    margin: 0,
    outerMargin: false,
    mobileBreakpoint: 0,
    minCols: 4,
    maxCols: 4,
    minRows: 10,
    maxRows: 10,
    pushItems: false,
    swap: false,
    draggable: { enabled: true }
  };
  dashboard: GridsterItemConfig[] = [{ id: 'dragged', x: 0, y: 0, cols: 1, rows: 1 }];
}

describe('dragging while the grid is scrolled', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [ScrollHost]
    }).compileComponents();
  });

  // upstream #735: scrolling the grid with the wheel during a drag left the item behind, away from the pointer
  it('follows the scroll position while the pointer stands still', async () => {
    const fixture = TestBed.createComponent(ScrollHost);
    fixture.detectChanges();
    await fixture.whenStable();
    const gridster = fixture.debugElement.query(By.directive(Gridster)).componentInstance as Gridster;
    gridster.calculateLayout();
    const dragged = gridster.grid[0];
    let scrollTop = 0;
    Object.defineProperty(gridster.el, 'scrollTop', { configurable: true, get: () => scrollTop });

    dragged.drag.dragStart(new MouseEvent('mousedown', { clientX: 50, clientY: 50 }));
    expect(dragged.$item().y).toBe(0);

    // the wheel scrolls the grid by two rows without moving the pointer
    scrollTop = 200;
    gridster.el.dispatchEvent(new Event('scroll'));

    expect(dragged.$item().y).toBe(2);

    dragged.drag.dragStop(new MouseEvent('mouseup'));

    expect(dragged.item().y).toBe(2);
  });
});
