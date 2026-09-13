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
      scrollLeft: { configurable: true, writable: true, value: 0 },
      getBoundingClientRect: { configurable: true, value: () => ({ top: 0, left: 0, bottom: 300, right: 500 }) }
    });
    const gridster = {
      el,
      curRowHeight: 50,
      curColWidth: 50,
      $options: () => ({
        scrollSensitivity: 10,
        scrollSpeed: 20,
        scale: 1,
        maxRows: 100,
        maxCols: 100,
        margin: 10,
        disableScrollVertical: false,
        disableScrollHorizontal: true,
        dirType: 'ltr'
      })
    };

    // the pointer is 5px away from the bottom edge of the grid
    scroll(gridster as never, new MouseEvent('mousemove', { clientX: 50, clientY: 295 }), { clientX: 50, clientY: 290 }, vi.fn());

    expect(requestFrame).toHaveBeenCalledOnce();
  });
});
