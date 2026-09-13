import { cancelScroll, scroll } from '../gridsterScroll';

describe('gridsterScroll animation frames', () => {
  afterEach(() => {
    cancelScroll();
    vi.unstubAllGlobals();
  });

  it('looks up requestAnimationFrame when scrolling starts instead of when the module loads', () => {
    const requestFrame = vi.fn(() => 1);
    vi.stubGlobal('requestAnimationFrame', requestFrame);
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    const el = document.createElement('div');
    Object.defineProperties(el, {
      offsetWidth: { configurable: true, value: 500 },
      offsetHeight: { configurable: true, value: 300 },
      scrollTop: { configurable: true, writable: true, value: 0 },
      scrollLeft: { configurable: true, writable: true, value: 0 }
    });
    const gridster = {
      el,
      curRowHeight: 50,
      curColWidth: 50,
      $options: () => ({
        scrollSensitivity: 10,
        scrollSpeed: 20,
        maxRows: 100,
        maxCols: 100,
        margin: 10,
        disableScrollVertical: false,
        disableScrollHorizontal: true,
        dirType: 'ltr'
      })
    };

    // the bottom edge of the dragged item is 5px away from the bottom of the grid
    scroll(gridster as never, 0, 250, 100, 45, new MouseEvent('mousemove', { clientX: 50, clientY: 295 }), { clientX: 50, clientY: 290 }, vi.fn());

    expect(requestFrame).toHaveBeenCalledOnce();
  });
});
