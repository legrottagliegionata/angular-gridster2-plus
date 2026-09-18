import { NO_ERRORS_SCHEMA, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gridster } from '../gridster';
import type { GridsterConfig } from '../gridsterConfig';
import { GridsterPreview } from '../gridsterPreview';

describe('Gridster container resize', () => {
  let fixture: ComponentFixture<Gridster>;
  let gridster: Gridster;
  let notify: ResizeObserverCallback;
  let observe: ReturnType<typeof vi.fn>;
  let disconnect: ReturnType<typeof vi.fn>;
  let width: number;

  beforeEach(async () => {
    observe = vi.fn();
    disconnect = vi.fn();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: ResizeObserverCallback) {
          notify = callback;
        }

        observe = observe;
        disconnect = disconnect;
      }
    );

    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Gridster, GridsterPreview],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Gridster);
    gridster = fixture.componentInstance;
    width = 300;
    Object.defineProperty(gridster.el, 'clientWidth', { configurable: true, get: () => width });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function render(options: GridsterConfig): Promise<void> {
    fixture.componentRef.setInput('options', { gridType: 'fixed', mobileBreakpoint: 0, ...options });
    await fixture.whenStable();
  }

  it('observes the host element', async () => {
    await render({});

    expect(observe).toHaveBeenCalledWith(gridster.el);
  });

  it('recalculates the layout inside NgZone when the host size changes', async () => {
    await render({});
    const run = vi.spyOn(gridster.zone, 'run');
    const onResize = vi.spyOn(gridster, 'onResize');

    width = 500;
    notify([], {} as ResizeObserver);

    expect(run).toHaveBeenCalled();
    expect(onResize).toHaveBeenCalledOnce();
  });

  it('ignores notifications when the host size did not change', async () => {
    await render({});
    const onResize = vi.spyOn(gridster, 'onResize');

    notify([], {} as ResizeObserver);

    expect(onResize).not.toHaveBeenCalled();
  });

  // the guard against the scrollbar loop skipped every later resize while a small overflow kept the scrollbar,
  // so the layout froze when the container changed size
  it('still follows the container while a scrollbar with a small overflow is shown', async () => {
    let offsetWidth = 315;
    Object.defineProperty(gridster.el, 'offsetWidth', { configurable: true, get: () => offsetWidth });
    Object.defineProperty(gridster.el, 'offsetHeight', { configurable: true, get: () => 500 });
    Object.defineProperty(gridster.el, 'clientHeight', { configurable: true, get: () => 500 });
    Object.defineProperty(gridster.el, 'scrollHeight', { configurable: true, get: () => 510 });
    width = 315;
    await render({ gridType: 'scrollVertical' });
    const onResize = vi.spyOn(gridster, 'onResize');

    // only the scrollbar takes space: keep the layout, a narrower one would remove the scrollbar again
    width = 300;
    notify([], {} as ResizeObserver);

    expect(onResize).not.toHaveBeenCalled();

    // the container shrinks while the scrollbar stays
    offsetWidth = 215;
    width = 200;
    notify([], {} as ResizeObserver);

    expect(onResize).toHaveBeenCalledOnce();
  });

  // upstream #669, #899: when the narrower layout fits without the scrollbar, the scrollbar disappears,
  // the wider layout comes back with the scrollbar, and so on forever
  it('does not loop when the scrollbar comes and goes with the layout', async () => {
    let scrollHeight = 480;
    Object.defineProperty(gridster.el, 'offsetWidth', { configurable: true, get: () => 315 });
    Object.defineProperty(gridster.el, 'offsetHeight', { configurable: true, get: () => 500 });
    Object.defineProperty(gridster.el, 'clientHeight', { configurable: true, get: () => 500 });
    Object.defineProperty(gridster.el, 'scrollHeight', { configurable: true, get: () => scrollHeight });
    width = 315;
    await render({ gridType: 'scrollVertical' });
    const onResize = vi.spyOn(gridster, 'onResize');

    // the wide layout overflows by more than the scrollbar: the scrollbar appears and the grid takes the narrower width
    width = 300;
    scrollHeight = 560;
    notify([], {} as ResizeObserver);
    // the narrower layout fits: the scrollbar disappears and the width goes back to the one just left
    width = 315;
    scrollHeight = 480;
    notify([], {} as ResizeObserver);

    expect(onResize).toHaveBeenCalledOnce();
  });

  // upstream #678: with setGridSize the size was measured with offsetWidth but compared with clientWidth,
  // so a border made every check find a new size and recalculate the layout again
  it('compares the size of a setGridSize grid the way it measures it', async () => {
    Object.defineProperty(gridster.el, 'offsetWidth', { configurable: true, get: () => width + 2 });
    Object.defineProperty(gridster.el, 'offsetHeight', { configurable: true, get: () => 402 });
    Object.defineProperty(gridster.el, 'clientHeight', { configurable: true, get: () => 400 });
    await render({ setGridSize: true });
    const onResize = vi.spyOn(gridster, 'onResize');

    notify([], {} as ResizeObserver);

    expect(onResize).not.toHaveBeenCalled();
  });

  it('follows disableWindowResize, also when it changes later', async () => {
    await render({ disableWindowResize: true });

    expect(observe).not.toHaveBeenCalled();

    await render({ disableWindowResize: false });

    expect(observe).toHaveBeenCalledOnce();

    await render({ disableWindowResize: true });

    expect(disconnect).toHaveBeenCalledOnce();
  });

  it('disconnects when the grid is destroyed', async () => {
    await render({});

    fixture.destroy();

    expect(disconnect).toHaveBeenCalledOnce();
  });

  it('keeps working where ResizeObserver is not available', async () => {
    vi.stubGlobal('ResizeObserver', undefined);

    await expect(render({})).resolves.toBeUndefined();
  });
});
