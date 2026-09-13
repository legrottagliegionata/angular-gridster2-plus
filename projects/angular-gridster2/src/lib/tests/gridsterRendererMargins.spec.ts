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
  it('uses outerMarginRight for items in the last column', () => {
    const { el, setStyle } = renderLastCell(createGridster({ outerMarginRight: 30 }));

    expect(setStyle).toHaveBeenCalledWith(el, 'margin-right', '30px');
    expect(setStyle).toHaveBeenCalledWith(el, 'margin-bottom', '10px');
  });

  it('falls back to margin on the right when only outerMarginBottom is set', () => {
    const { el, setStyle } = renderLastCell(createGridster({ outerMarginBottom: 5 }));

    expect(setStyle).toHaveBeenCalledWith(el, 'margin-right', '10px');
    expect(setStyle).toHaveBeenCalledWith(el, 'margin-bottom', '5px');
  });

  it('clears the inline-end margin of RTL items in the mobile layout', () => {
    const { el, setStyle } = renderLastCell(createGridster({ dirType: DirTypes.RTL }, true));

    expect(setStyle).toHaveBeenCalledWith(el, 'margin-left', '');
    expect(setStyle).not.toHaveBeenCalledWith(el, 'margin-right', '');
  });
});
