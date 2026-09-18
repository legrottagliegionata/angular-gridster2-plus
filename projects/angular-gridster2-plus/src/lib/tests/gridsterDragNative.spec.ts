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
class DragHost {
  options: GridsterConfig = {
    gridType: GridType.Fixed,
    fixedColWidth: 100,
    fixedRowHeight: 100,
    margin: 0,
    outerMargin: false,
    mobileBreakpoint: 0,
    minCols: 4,
    maxCols: 4,
    minRows: 4,
    maxRows: 4,
    draggable: { enabled: true }
  };
  dashboard: GridsterItemConfig[] = [{ id: 'dragged', x: 0, y: 0, cols: 1, rows: 1 }];
}

async function startDrag() {
  const fixture = TestBed.createComponent(DragHost);
  fixture.detectChanges();
  await fixture.whenStable();
  const gridster = fixture.debugElement.query(By.directive(Gridster)).componentInstance as Gridster;
  gridster.calculateLayout();
  const item = gridster.grid[0];
  item.drag.dragStart(new MouseEvent('mousedown', { clientX: 50, clientY: 50 }));
  return { fixture, gridster, item };
}

describe('drag interrupted by the browser', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [DragHost]
    }).compileComponents();
  });

  // upstream #421: dragging an item with selected text starts a native drag, the mouseup never arrives
  // and the item keeps following the pointer
  it('stops the drag when the browser starts a native drag', async () => {
    const { gridster, item } = await startDrag();

    expect(gridster.dragInProgress).toBe(true);

    item.el.dispatchEvent(new Event('dragstart', { bubbles: true }));

    expect(gridster.dragInProgress).toBe(false);
    expect(item.isMoving()).toBe(false);
  });

  // the same case logged "Cannot read property 'x' of undefined" from the empty path
  it('does not throw when the drag path is empty', async () => {
    const { item } = await startDrag();
    item.drag.left = 200;
    item.drag.top = 200;
    item.drag.path = [];

    expect(() => item.drag.calculateItemPosition()).not.toThrow();
  });
});

describe('touch events the browser cannot cancel', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [DragHost]
    }).compileComponents();
  });

  // upstream #563: preventDefault on a touchmove with cancelable false floods the console with intervention warnings
  it('does not cancel a touchmove that cannot be cancelled', async () => {
    const { item } = await startDrag();
    const preventDefault = vi.fn();
    const touchMove = {
      type: 'touchmove',
      cancelable: false,
      clientX: 60,
      clientY: 60,
      touches: [{ clientX: 60, clientY: 60 }],
      preventDefault,
      stopPropagation: vi.fn()
    };

    item.drag.dragMove(touchMove as never);

    expect(preventDefault).not.toHaveBeenCalled();
  });
});
