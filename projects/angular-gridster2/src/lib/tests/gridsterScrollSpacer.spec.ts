import { NO_ERRORS_SCHEMA, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gridster } from '../gridster';
import { GridsterItem } from '../gridsterItem';
import { GridsterPreview } from '../gridsterPreview';

describe('gridster scroll spacer', () => {
  let fixture: ComponentFixture<Gridster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Gridster, GridsterItem, GridsterPreview],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Gridster);
  });

  // browsers leave the margins of absolutely positioned items out of the scrollable area (upstream #696, #721)
  it('makes the bottom outer margin part of the scrollable area of a verticalFixed grid', async () => {
    fixture.componentRef.setInput('options', {
      gridType: 'verticalFixed',
      outerMargin: true,
      outerMarginBottom: 40,
      minCols: 2,
      minRows: 3,
      fixedRowHeight: 100,
      mobileBreakpoint: 0,
      margin: 10
    });
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.api.calculateLayout();
    fixture.detectChanges();
    await fixture.whenStable();

    const spacer = fixture.nativeElement.querySelector('.gridster-scroll-spacer') as HTMLElement;
    // top margin + 3 rows of 110px - the trailing gap + bottom margin
    expect(spacer.style.height).toBe('370px');
  });
});
