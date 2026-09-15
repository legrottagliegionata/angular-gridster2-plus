import { NO_ERRORS_SCHEMA, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gridster } from '../gridster';
import { GridsterItem } from '../gridsterItem';
import { GridsterPreview } from '../gridsterPreview';

describe('gridster component', () => {
  let fixture: ComponentFixture<Gridster>;
  let gridsterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Gridster, GridsterItem, GridsterPreview],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Gridster);
    gridsterComponent = fixture.componentInstance;
  });

  it('excludes the unused outer margin from fixed grid size', async () => {
    fixture.componentRef.setInput('options', {
      gridType: 'fixed',
      setGridSize: true,
      outerMargin: false,
      minCols: 2,
      minRows: 2,
      fixedColWidth: 100,
      fixedRowHeight: 100,
      mobileBreakpoint: 0,
      margin: 10
    });
    fixture.detectChanges();

    await fixture.whenStable();

    gridsterComponent.api.calculateLayout();

    expect(gridsterComponent.el.style.width).toBe('210px');
    expect(gridsterComponent.el.style.height).toBe('210px');
  });

  // upstream #838: the width of a vertical grid was pinned to its first measure, so it did not follow the container any more
  it('leaves the width of a verticalFixed grid to its container, also on repeated layout', async () => {
    Object.defineProperty(gridsterComponent.el, 'offsetWidth', {
      configurable: true,
      get: () => Number.parseFloat(gridsterComponent.el.style.width) || 300
    });

    fixture.componentRef.setInput('options', {
      gridType: 'verticalFixed',
      setGridSize: true,
      outerMargin: false,
      minCols: 2,
      minRows: 2,
      fixedRowHeight: 100,
      mobileBreakpoint: 0,
      margin: 10
    });
    fixture.detectChanges();

    await fixture.whenStable();

    gridsterComponent.api.calculateLayout();
    gridsterComponent.api.calculateLayout();

    expect(gridsterComponent.el.style.width).toBe('');
    expect(gridsterComponent.el.style.height).toBe('210px');
  });

  it('leaves both sizes of a fit grid to its container', async () => {
    fixture.componentRef.setInput('options', {
      gridType: 'fit',
      setGridSize: true,
      minCols: 2,
      minRows: 2,
      mobileBreakpoint: 0,
      margin: 10
    });
    fixture.detectChanges();

    await fixture.whenStable();

    gridsterComponent.api.calculateLayout();

    expect(gridsterComponent.el.style.width).toBe('');
    expect(gridsterComponent.el.style.height).toBe('');
  });

  it('adds the outer margin overrides to the fixed grid size', async () => {
    fixture.componentRef.setInput('options', {
      gridType: 'fixed',
      setGridSize: true,
      outerMargin: true,
      outerMarginLeft: 50,
      outerMarginRight: 20,
      outerMarginTop: 40,
      outerMarginBottom: 0,
      minCols: 2,
      minRows: 2,
      fixedColWidth: 100,
      fixedRowHeight: 100,
      mobileBreakpoint: 0,
      margin: 10
    });
    fixture.detectChanges();

    await fixture.whenStable();

    gridsterComponent.api.calculateLayout();

    // 2 cells of 110px, minus the trailing gap, plus the left/right (top/bottom) outer margins
    expect(gridsterComponent.el.style.width).toBe('280px');
    expect(gridsterComponent.el.style.height).toBe('250px');
  });
});
