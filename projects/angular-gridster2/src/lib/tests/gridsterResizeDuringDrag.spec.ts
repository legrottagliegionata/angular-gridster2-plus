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
class InteractionHost {
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
    draggable: { enabled: true },
    resizable: { enabled: true }
  };
  dashboard: GridsterItemConfig[] = [{ id: 'item', x: 0, y: 0, cols: 2, rows: 2 }];
}

describe('drag and resize at the same time', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [InteractionHost]
    }).compileComponents();
  });

  // upstream #727 reports resizing while dragging; GridsterResizable.dragStart already refuses it, this keeps it that way
  it('does not start a resize while an item is dragged', async () => {
    const fixture = TestBed.createComponent(InteractionHost);
    fixture.detectChanges();
    await fixture.whenStable();
    const gridster = fixture.debugElement.query(By.directive(Gridster)).componentInstance as Gridster;
    gridster.calculateLayout();
    const item = gridster.grid[0];
    // the south-east handle, as the listener on it hands the event over
    const handle = document.createElement('div');
    handle.className = 'gridster-item-resizable-handler handle-se';
    const onHandle = new MouseEvent('mousedown', { clientX: 200, clientY: 200 });
    Object.defineProperty(onHandle, 'target', { value: handle });

    item.drag.dragStart(new MouseEvent('mousedown', { clientX: 50, clientY: 50 }));
    item.resize.dragStart(onHandle);

    expect(item.isResizing()).toBe(false);
    expect(item.isMoving()).toBe(true);

    item.drag.dragStop(new MouseEvent('mouseup'));
  });
});
