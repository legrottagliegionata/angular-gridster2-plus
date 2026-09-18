import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Gridster } from '../gridster';
import { DirTypes, GridsterConfig, GridType } from '../gridsterConfig';
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
class RtlHost {
  options: GridsterConfig = {
    gridType: GridType.Fixed,
    dirType: DirTypes.RTL,
    fixedColWidth: 100,
    fixedRowHeight: 100,
    margin: 0,
    outerMargin: false,
    mobileBreakpoint: 0,
    minCols: 8,
    maxCols: 8,
    minRows: 3,
    maxRows: 3,
    pushItems: false,
    swap: false,
    disableScrollHorizontal: true,
    disableScrollVertical: true,
    draggable: { enabled: true },
    resizable: { enabled: true }
  };
  dashboard: GridsterItemConfig[] = [];
}

// 4 of the 8 columns are visible; the grid sits 200 px from the left of the page and has a 15 px vertical scrollbar
async function createGrid(item: GridsterItemConfig): Promise<{ gridster: Gridster; item: GridsterItem; setScrollLeft: (value: number) => void }> {
  const fixture = TestBed.createComponent(RtlHost);
  fixture.componentInstance.dashboard = [item];
  fixture.detectChanges();
  await fixture.whenStable();
  const gridster = fixture.debugElement.query(By.directive(Gridster)).componentInstance as Gridster;
  gridster.calculateLayout();
  let scrollLeft = 0;
  Object.defineProperties(gridster.el, {
    scrollLeft: { configurable: true, get: () => scrollLeft },
    offsetLeft: { configurable: true, value: 200 },
    offsetWidth: { configurable: true, value: 415 },
    scrollWidth: { configurable: true, value: 800 }
  });
  return {
    gridster,
    item: gridster.grid[0],
    setScrollLeft: value => {
      scrollLeft = value;
      gridster.el.dispatchEvent(new Event('scroll'));
    }
  };
}

function onHandle(handle: string, clientX: number, clientY: number): MouseEvent {
  const target = document.createElement('div');
  target.className = 'gridster-item-resizable-handler handle-' + handle;
  const event = new MouseEvent('mousedown', { clientX, clientY });
  Object.defineProperty(event, 'target', { value: target });
  return event;
}

describe('RTL drag and resize', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [RtlHost]
    }).compileComponents();
  });

  // the start position was computed from offsetWidth, scrollWidth and offsetLeft: the item left the pointer as soon as it moved
  it('moves a dragged item as far as the pointer, wherever the grid sits', async () => {
    const { item } = await createGrid({ x: 1, y: 0, cols: 1, rows: 1 });

    item.drag.dragStart(new MouseEvent('mousedown', { clientX: 450, clientY: 50 }));
    // columns count from the right: 100 px to the right is one column back towards x = 0
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 550, clientY: 50 }));

    expect(item.drag.left).toBe(0);
    expect(item.$item().x).toBe(0);

    item.drag.dragStop(new MouseEvent('mouseup'));
    expect(item.item().x).toBe(0);
  });

  it('moves a dragged item with a horizontal scroll', async () => {
    const { item, setScrollLeft } = await createGrid({ x: 1, y: 0, cols: 1, rows: 1 });

    item.drag.dragStart(new MouseEvent('mousedown', { clientX: 450, clientY: 50 }));
    // RTL grids scroll to the left with a negative scrollLeft: the pointer is now over the column further left
    setScrollLeft(-100);

    expect(item.$item().x).toBe(2);

    item.drag.dragStop(new MouseEvent('mouseup'));
    expect(item.item().x).toBe(2);
  });

  it('grows an item from its left edge with a horizontal scroll', async () => {
    const { item, setScrollLeft } = await createGrid({ x: 0, y: 0, cols: 1, rows: 1 });

    // the left edge of the rightmost column
    item.resize.dragStart(onHandle('w', 515, 50));
    setScrollLeft(-100);
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 515, clientY: 50 }));

    expect(item.$item().cols).toBe(2);

    item.resize.dragStop(new MouseEvent('mouseup'));
    expect(item.item().cols).toBe(2);
  });
});
