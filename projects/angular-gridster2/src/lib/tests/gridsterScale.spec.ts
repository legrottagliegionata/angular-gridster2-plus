import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Gridster } from '../gridster';
import { DirTypes, GridsterConfig, GridType } from '../gridsterConfig';
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
class ScaleHost {
  options: GridsterConfig = {};
  dashboard: GridsterItemConfig[] = [];
}

// the grid is 400 x 300 px with 100 px cells, drawn at half size by a transform on a parent
const scale = 0.5;
const maxScrollTop = 700;

let frames: FrameRequestCallback[] = [];
let frameTime = 0;

// one auto-scroll step of `scrollSpeed` (20 px): the first frame only records its timestamp
function runFrames(count: number): void {
  for (let i = 0; i <= count; i++) {
    const pending = frames;
    frames = [];
    frameTime += 40;
    pending.forEach(callback => callback(frameTime));
  }
}

async function createGrid(options: GridsterConfig, item: GridsterItemConfig): Promise<{ gridster: Gridster; item: GridsterItem }> {
  const fixture = TestBed.createComponent(ScaleHost);
  fixture.componentInstance.options = {
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
    scale,
    draggable: { enabled: true },
    resizable: { enabled: true },
    ...options
  };
  fixture.componentInstance.dashboard = [item];
  fixture.detectChanges();
  await fixture.whenStable();
  const gridster = fixture.debugElement.query(By.directive(Gridster)).componentInstance as Gridster;
  gridster.calculateLayout();
  let scrollTop = 0;
  Object.defineProperties(gridster.el, {
    scrollTop: { configurable: true, get: () => scrollTop, set: (value: number) => (scrollTop = Math.min(Math.max(value, 0), maxScrollTop)) },
    offsetWidth: { configurable: true, value: 400 },
    offsetHeight: { configurable: true, value: 300 },
    // the bounding box is in screen pixels, so it is scaled
    getBoundingClientRect: {
      configurable: true,
      value: () => ({ top: 0, left: 0, right: 400 * scale, bottom: 300 * scale, width: 400 * scale, height: 300 * scale })
    }
  });
  return { gridster, item: gridster.grid[0] };
}

function onHandle(handle: string, clientX: number, clientY: number): MouseEvent {
  const target = document.createElement('div');
  target.className = 'gridster-item-resizable-handler handle-' + handle;
  const event = new MouseEvent('mousedown', { clientX, clientY });
  Object.defineProperty(event, 'target', { value: target });
  return event;
}

describe('a scaled grid', () => {
  beforeEach(async () => {
    frames = [];
    frameTime = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => frames.push(callback));
    vi.stubGlobal('cancelAnimationFrame', () => undefined);
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [ScaleHost]
    }).compileComponents();
  });

  afterEach(() => {
    cancelScroll();
    vi.unstubAllGlobals();
  });

  it('moves a dragged item as far as the grid auto-scrolls', async () => {
    const { item } = await createGrid({}, { x: 0, y: 0, cols: 1, rows: 1 });

    item.drag.dragStart(new MouseEvent('mousedown', { clientX: 25, clientY: 25 }));
    // 3 screen px from the bottom edge: 244 grid px down
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 25, clientY: 147 }));
    expect(item.drag.top).toBe(244);

    // 5 steps of 20 px: the item moves 100 grid px with the content, not 100 / scale
    runFrames(5);

    expect(item.drag.top).toBe(344);
    expect(item.$item().y).toBe(3);

    item.drag.dragStop(new MouseEvent('mouseup'));
  });

  it('moves the resized edge as far as the grid auto-scrolls', async () => {
    const { item } = await createGrid({}, { x: 0, y: 0, cols: 1, rows: 1 });

    item.resize.dragStart(onHandle('s', 25, 50));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 25, clientY: 147 }));
    expect(item.resize.height).toBe(294);

    runFrames(5);

    expect(item.resize.height).toBe(394);
    expect(item.$item().rows).toBe(4);

    item.resize.dragStop(new MouseEvent('mouseup'));
  });

  it('moves a dragged item with the pointer in RTL', async () => {
    const { item } = await createGrid(
      { dirType: DirTypes.RTL, disableScrollVertical: true, disableScrollHorizontal: true },
      { x: 1, y: 0, cols: 1, rows: 1 }
    );

    // RTL columns count from the right: 50 screen px to the right is one column back towards x = 0
    item.drag.dragStart(new MouseEvent('mousedown', { clientX: 125, clientY: 25 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 175, clientY: 25 }));

    expect(item.$item().x).toBe(0);

    item.drag.dragStop(new MouseEvent('mouseup'));
    expect(item.item().x).toBe(0);
  });

  // upstream #693: an empty-cell drag in a zoomed container picked the column next to the pointer; `scale` accounts for it
  it('places an item created from an empty cell under the pointer', async () => {
    const { gridster } = await createGrid({ enableEmptyCellDrag: true }, { x: 0, y: 0, cols: 1, rows: 1 });

    // third column, second row: 250 x 150 grid px
    const created = gridster.emptyCell.getValidItemFromEvent(new MouseEvent('mousedown', { clientX: 125, clientY: 75 }));

    expect(created).toEqual(expect.objectContaining({ x: 2, y: 1 }));
  });
});
