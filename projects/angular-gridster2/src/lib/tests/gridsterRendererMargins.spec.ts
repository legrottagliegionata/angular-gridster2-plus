import { Renderer2 } from '@angular/core';

import { Gridster } from '../gridster';
import { DirTypes } from '../gridsterConfig';
import { GridsterRenderer } from '../gridsterRenderer';

function createGridster(options: Record<string, unknown>, mobile = false): Gridster {
  return {
    mobile,
    curWidth: 400,
    curColWidth: 100,
    curRowHeight: 100,
    rows: 2,
    columns: 2,
    $options: () => ({
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      dirType: DirTypes.LTR,
      ...options
    })
  } as unknown as Gridster;
}

function renderLastCell(gridster: Gridster) {
  const setStyle = vi.fn();
  const el = document.createElement('gridster-item');
  new GridsterRenderer(gridster).updateItem(el, { x: 1, y: 1, cols: 1, rows: 1 }, { setStyle } as unknown as Renderer2);
  return { el, setStyle };
}

describe('GridsterRenderer outer margins', () => {
  it('sizes the scroll spacer with the outer margins', () => {
    const style = new GridsterRenderer(createGridster({ outerMarginRight: 30, outerMarginBottom: 50 })).getScrollSpacerStyle();

    // 2 cells of 100px minus the trailing gap, plus the outer margins (margin when not overridden)
    expect(style).toEqual({ left: '0', width: '230px', height: '250px' });
  });

  it('leaves the outer margins out of the scroll spacer when outerMargin is false', () => {
    const style = new GridsterRenderer(createGridster({ outerMargin: false, outerMarginBottom: 50 })).getScrollSpacerStyle();

    expect(style).toEqual({ left: '0', width: '190px', height: '190px' });
  });

  it('anchors the scroll spacer to the right edge in RTL', () => {
    const style = new GridsterRenderer(createGridster({ dirType: DirTypes.RTL })).getScrollSpacerStyle();

    expect(style).toEqual({ right: '0', width: '210px', height: '210px' });
  });

  it('does not put the outer margins on the items of the last row and column', () => {
    const { el, setStyle } = renderLastCell(createGridster({ outerMarginRight: 30, outerMarginBottom: 50 }));

    expect(setStyle).toHaveBeenCalledWith(el, 'margin-bottom', null);
    expect(setStyle).not.toHaveBeenCalledWith(el, 'margin-right', expect.anything());
    expect(setStyle).not.toHaveBeenCalledWith(el, 'margin-left', expect.anything());
  });

  it('keeps the bottom margin of items in the mobile layout', () => {
    const { el, setStyle } = renderLastCell(createGridster({}, true));

    expect(setStyle).toHaveBeenCalledWith(el, 'margin-bottom', '10px');
  });
});
