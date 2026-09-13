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
