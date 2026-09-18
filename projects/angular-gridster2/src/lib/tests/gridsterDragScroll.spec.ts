import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Gridster } from '../gridster';
import { GridsterConfig, GridType } from '../gridsterConfig';
import { GridsterItem } from '../gridsterItem';
import { GridsterItemConfig } from '../gridsterItemConfig';
import { cancelScroll } from '../gridsterScroll';

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
    draggable: { enabled: true },
    resizable: { enabled: true }
  };
  dashboard: GridsterItemConfig[] = [{ id: 'dragged', x: 0, y: 0, cols: 1, rows: 1 }];
}

let frames: FrameRequestCallback[] = [];
let frameTime = 0;

async function createGrid(): Promise<{ gridster: Gridster; item: GridsterItem; setScrollTop: (value: number) => void }> {
  const fixture = TestBed.createComponent(ScrollHost);
  fixture.detectChanges();
  await fixture.whenStable();
  const gridster = fixture.debugElement.query(By.directive(Gridster)).componentInstance as Gridster;
  gridster.calculateLayout();
  // 4 x 3 cells are visible out of 4 x 10
  let scrollTop = 0;
  Object.defineProperties(gridster.el, {
    scrollTop: { configurable: true, get: () => scrollTop, set: (value: number) => (scrollTop = Math.min(Math.max(value, 0), 700)) },
    offsetHeight: { configurable: true, value: 300 },
    getBoundingClientRect: { configurable: true, value: () => ({ top: 0, left: 0, right: 400, bottom: 300, width: 400, height: 300 }) }
  });
  return { gridster, item: gridster.grid[0], setScrollTop: value => (gridster.el.scrollTop = value) };
}

describe('dragging while the grid is scrolled', () => {
  beforeEach(async () => {
    frames = [];
    frameTime = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => frames.push(callback));
    vi.stubGlobal('cancelAnimationFrame', () => undefined);
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [ScrollHost]
    }).compileComponents();
  });

  afterEach(() => {
    cancelScroll();
    vi.unstubAllGlobals();
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

  // the scroll event of the last auto-scroll step arrives after the auto-scroll has stopped: it must not move the item again
  it('keeps the item under the pointer when the auto-scroll reaches the end of the grid', async () => {
    const { gridster, item } = await createGrid();

    item.drag.dragStart(new MouseEvent('mousedown', { clientX: 50, clientY: 50 }));
    // 5 px from the bottom edge
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 50, clientY: 295 }));
    // the browser fires `scroll` in the frame after each step, before the next step
    while (frames.length) {
      const pending = frames;
      frames = [];
      frameTime += 40;
      pending.forEach(callback => callback(frameTime));
      gridster.el.dispatchEvent(new Event('scroll'));
    }

    expect(gridster.el.scrollTop).toBe(700);
    // the pointer is 295 + 700 px down the grid, 50 px below the top of the item
    expect(item.drag.top).toBe(945);
    expect(item.el.style.transform).toBe('translate3d(0px, 945px, 0)');

    item.drag.dragStop(new MouseEvent('mouseup'));
    expect(item.item().y).toBe(9);
  });
});

describe('resizing while the grid is scrolled', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [ScrollHost]
    }).compileComponents();
  });

  it('keeps the resized edge under the pointer while the wheel scrolls the grid', async () => {
    const { gridster, item, setScrollTop } = await createGrid();
    const handle = document.createElement('div');
    handle.className = 'gridster-item-resizable-handler handle-s';
    const onHandle = new MouseEvent('mousedown', { clientX: 50, clientY: 100 });
    Object.defineProperty(onHandle, 'target', { value: handle });

    item.resize.dragStart(onHandle);
    setScrollTop(200);
    gridster.el.dispatchEvent(new Event('scroll'));

    expect(item.$item().rows).toBe(3);

    item.resize.dragStop(new MouseEvent('mouseup'));
    expect(item.item().rows).toBe(3);
  });
});
