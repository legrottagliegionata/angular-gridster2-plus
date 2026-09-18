import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Gridster } from '../gridster';
import type { GridsterConfig } from '../gridsterConfig';
import { GridsterItem } from '../gridsterItem';
import type { GridsterItemConfig } from '../gridsterItemConfig';

@Component({
  template: `<gridster [options]="options"><gridster-item [item]="item" /></gridster>`,
  imports: [Gridster, GridsterItem]
})
class LayerHost {
  options: GridsterConfig = {
    gridType: 'fixed',
    allowMultiLayer: true,
    defaultLayerIndex: 0,
    baseLayerIndex: 1,
    maxLayerIndex: 2,
    mobileBreakpoint: 0,
    disableWarnings: true
  };
  item: GridsterItemConfig = { x: 0, y: 0, cols: 1, rows: 1 };
}

describe('GridsterItem layers', () => {
  it('updates the z-index when the item is brought to front or sent to back', async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [LayerHost]
    });
    const fixture = TestBed.createComponent(LayerHost);
    await fixture.whenStable();
    const itemDebugElement = fixture.debugElement.query(By.directive(GridsterItem));
    const itemComponent = itemDebugElement.componentInstance as GridsterItem;
    const itemElement = itemDebugElement.nativeElement as HTMLElement;

    expect(itemElement.style.zIndex).toBe('1');

    itemComponent.bringToFront(1);
    await fixture.whenStable();

    expect(itemElement.style.zIndex).toBe('2');

    itemComponent.sendToBack(1);
    await fixture.whenStable();

    expect(itemElement.style.zIndex).toBe('1');
  });
});
