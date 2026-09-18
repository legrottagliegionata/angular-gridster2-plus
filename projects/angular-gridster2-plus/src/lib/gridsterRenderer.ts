import { Renderer2 } from '@angular/core';

import { Gridster } from './gridster';
import { DirTypes, GridType } from './gridsterConfig';
import { GridsterItemConfig } from './gridsterItemConfig';
import { CommonGridCachedStyle, CommonGridStyle, GridColumnCachedStyle, GridRowCachedStyle } from './gridsterRendererTypes';

export class GridsterRenderer {
  /**
   * Caches the last grid column styles.
   * This improves the grid responsiveness by caching and reusing the last style object instead of creating a new one.
   */
  private lastGridColumnStyles: Record<number, GridColumnCachedStyle> = {};

  /**
   * Caches the last grid column styles.
   * This improves the grid responsiveness by caching and reusing the last style object instead of creating a new one.
   */
  private lastGridRowStyles: Record<number, GridRowCachedStyle> = {};

  /**
   * Caches the last scroll spacer style, like the grid line styles.
   */
  private lastScrollSpacerStyle: (CommonGridCachedStyle & { rtl: boolean }) | null = null;

  constructor(private gridster: Gridster) {}

  updateItem(el: Element, item: GridsterItemConfig, renderer: Renderer2): void {
    const $options = this.gridster.$options();
    if (this.gridster.mobile) {
      this.clearCellPosition(renderer, el);
      if ($options.keepFixedHeightInMobile) {
        renderer.setStyle(el, 'height', (item.rows - 1) * $options.margin + item.rows * $options.fixedRowHeight + 'px');
      } else {
        renderer.setStyle(el, 'height', (item.rows * this.gridster.curWidth) / item.cols + 'px');
      }
      if ($options.keepFixedWidthInMobile) {
        renderer.setStyle(el, 'width', $options.fixedColWidth + 'px');
      } else {
        renderer.setStyle(el, 'width', '');
      }

      renderer.setStyle(el, 'order', item.y * this.gridster.columns + item.x);
      renderer.setStyle(el, 'margin-bottom', $options.margin + 'px');
    } else {
      const x = Math.round(this.gridster.curColWidth * item.x);
      const y = Math.round(this.gridster.curRowHeight * item.y);
      const width = this.gridster.curColWidth * item.cols - $options.margin;
      const height = this.gridster.curRowHeight * item.rows - $options.margin;
      // set the cell style
      this.setCellPosition(renderer, el, x, y);
      renderer.setStyle(el, 'width', width + 'px');
      renderer.setStyle(el, 'height', height + 'px');
      // the outer margins come from the scroll spacer: browsers ignore the margins of absolutely positioned items when scrolling
      renderer.setStyle(el, 'order', null);
      renderer.setStyle(el, 'margin-bottom', null);
    }
  }

  updateGridster(): void {
    const $options = this.gridster.$options();
    let addClass = '';
    let removeClass1 = '';
    let removeClass2 = '';
    let removeClass3 = '';
    if ($options.gridType === GridType.Fit) {
      addClass = GridType.Fit;
      removeClass1 = GridType.ScrollVertical;
      removeClass2 = GridType.ScrollHorizontal;
      removeClass3 = GridType.Fixed;
    } else if ($options.gridType === GridType.ScrollVertical) {
      this.gridster.curRowHeight = this.gridster.curColWidth * $options.rowHeightRatio;
      addClass = GridType.ScrollVertical;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollHorizontal;
      removeClass3 = GridType.Fixed;
    } else if ($options.gridType === GridType.ScrollHorizontal) {
      const widthRatio = $options.rowHeightRatio;
      const calWidthRatio = widthRatio >= 1 ? widthRatio : widthRatio + 1;
      this.gridster.curColWidth = this.gridster.curRowHeight * calWidthRatio;
      addClass = GridType.ScrollHorizontal;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollVertical;
      removeClass3 = GridType.Fixed;
    } else if ($options.gridType === GridType.Fixed) {
      this.gridster.curColWidth = $options.fixedColWidth + ($options.ignoreMarginInRow ? 0 : $options.margin);
      this.gridster.curRowHeight = $options.fixedRowHeight + ($options.ignoreMarginInRow ? 0 : $options.margin);
      addClass = GridType.Fixed;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollVertical;
      removeClass3 = GridType.ScrollHorizontal;
    } else if ($options.gridType === GridType.VerticalFixed) {
      this.gridster.curRowHeight = $options.fixedRowHeight + ($options.ignoreMarginInRow ? 0 : $options.margin);
      addClass = GridType.ScrollVertical;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollHorizontal;
      removeClass3 = GridType.Fixed;
    } else if ($options.gridType === GridType.HorizontalFixed) {
      this.gridster.curColWidth = $options.fixedColWidth + ($options.ignoreMarginInRow ? 0 : $options.margin);
      addClass = GridType.ScrollHorizontal;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollVertical;
      removeClass3 = GridType.Fixed;
    }

    if (this.gridster.mobile || ($options.setGridSize && $options.gridType !== GridType.Fit)) {
      this.gridster.renderer.removeClass(this.gridster.el, addClass);
    } else {
      this.gridster.renderer.addClass(this.gridster.el, addClass);
    }
    this.gridster.renderer.removeClass(this.gridster.el, removeClass1);
    this.gridster.renderer.removeClass(this.gridster.el, removeClass2);
    this.gridster.renderer.removeClass(this.gridster.el, removeClass3);
  }

  getGridColumnStyle(i: number): CommonGridStyle {
    const margin = this.gridster.$options().margin;
    // generates the new style
    const newPos: GridColumnCachedStyle = {
      left: this.gridster.curColWidth * i,
      width: this.gridster.curColWidth - margin,
      height: this.gridster.gridRows.length * this.gridster.curRowHeight - margin,
      style: {}
    };
    newPos.style = {
      ...this.getLeftPosition(newPos.left),
      width: newPos.width + 'px',
      height: newPos.height + 'px'
    };

    // use the last cached style if it has same values as the generated one
    const last = this.lastGridColumnStyles[i];
    if (last && last.left === newPos.left && last.width === newPos.width && last.height === newPos.height) {
      return last.style;
    }

    // cache and set new style
    this.lastGridColumnStyles[i] = newPos;
    return newPos.style;
  }

  getGridRowStyle(i: number): CommonGridStyle {
    const margin = this.gridster.$options().margin;
    // generates the new style, as wide as the columns: the last one ends one margin before its cell edge (upstream #897)
    const newPos: GridRowCachedStyle = {
      top: this.gridster.curRowHeight * i,
      width: this.gridster.gridColumns.length * this.gridster.curColWidth - margin,
      height: this.gridster.curRowHeight - margin,
      style: {}
    };
    newPos.style = {
      ...this.getTopPosition(newPos.top),
      width: newPos.width + 'px',
      height: newPos.height + 'px'
    };

    // use the last cached style if it has same values as the generated one
    const last = this.lastGridRowStyles[i];
    if (last && last.top === newPos.top && last.width === newPos.width && last.height === newPos.height) {
      return last.style;
    }

    // cache and set new style
    this.lastGridRowStyles[i] = newPos;
    return newPos.style;
  }

  /**
   * Style of the invisible element that gives the grid its scrollable size: the rows and columns plus the outer margins.
   * Browsers leave the margins of absolutely positioned items and the end padding of the grid out of the scrollable area,
   * so without it the bottom and right outer margins of scrolling grids cannot be reached (upstream #696, #721, #547).
   */
  getScrollSpacerStyle(): CommonGridStyle {
    const $options = this.gridster.$options();
    const rtl = $options.dirType === DirTypes.RTL;
    const width = Math.max(0, this.getLeftMargin() + this.gridster.columns * this.gridster.curColWidth - $options.margin + this.getRightMargin());
    const height = Math.max(0, this.getTopMargin() + this.gridster.rows * this.gridster.curRowHeight - $options.margin + this.getBottomMargin());

    // use the last cached style if it has same values as the generated one
    const last = this.lastScrollSpacerStyle;
    if (last && last.width === width && last.height === height && last.rtl === rtl) {
      return last.style;
    }

    // cache and set new style, anchored to the edge the items start from
    const style: CommonGridStyle = { [rtl ? 'right' : 'left']: '0', width: width + 'px', height: height + 'px' };
    this.lastScrollSpacerStyle = { width, height, rtl, style };
    return style;
  }

  getLeftPosition(d: number): { left: string } | { transform: string } {
    const $options = this.gridster.$options();
    const dPosition = $options.dirType === DirTypes.RTL ? -d : d;
    if ($options.useTransformPositioning) {
      return {
        transform: 'translateX(' + dPosition + 'px)'
      };
    } else {
      return {
        left: this.getLeftMargin() + dPosition + 'px'
      };
    }
  }

  getTopPosition(d: number): { top: string } | { transform: string } {
    if (this.gridster.$options().useTransformPositioning) {
      return {
        transform: 'translateY(' + d + 'px)'
      };
    } else {
      return {
        top: this.getTopMargin() + d + 'px'
      };
    }
  }

  clearCellPosition(renderer: Renderer2, el: Element): void {
    if (this.gridster.$options().useTransformPositioning) {
      renderer.setStyle(el, 'transform', '');
    } else {
      renderer.setStyle(el, 'top', '');
      renderer.setStyle(el, 'left', '');
    }
  }

  setCellPosition(renderer: Renderer2, el: Element, x: number, y: number): void {
    const $options = this.gridster.$options();
    const xPosition = $options.dirType === DirTypes.RTL ? -x : x;
    if ($options.useTransformPositioning) {
      const transform = 'translate3d(' + xPosition + 'px, ' + y + 'px, 0)';
      renderer.setStyle(el, 'transform', transform);
    } else {
      renderer.setStyle(el, 'left', this.getLeftMargin() + xPosition + 'px');
      renderer.setStyle(el, 'top', this.getTopMargin() + y + 'px');
    }
  }

  getLeftMargin(): number {
    const $options = this.gridster.$options();
    if ($options.outerMargin) {
      if ($options.outerMarginLeft !== null) {
        return $options.outerMarginLeft;
      } else {
        return $options.margin;
      }
    } else {
      return 0;
    }
  }

  getRightMargin(): number {
    const $options = this.gridster.$options();
    if ($options.outerMargin) {
      if ($options.outerMarginRight !== null) {
        return $options.outerMarginRight;
      } else {
        return $options.margin;
      }
    } else {
      return 0;
    }
  }

  getTopMargin(): number {
    const $options = this.gridster.$options();
    if ($options.outerMargin) {
      if ($options.outerMarginTop !== null) {
        return $options.outerMarginTop;
      } else {
        return $options.margin;
      }
    } else {
      return 0;
    }
  }

  getBottomMargin(): number {
    const $options = this.gridster.$options();
    if ($options.outerMargin) {
      if ($options.outerMarginBottom !== null) {
        return $options.outerMarginBottom;
      } else {
        return $options.margin;
      }
    } else {
      return 0;
    }
  }
}
