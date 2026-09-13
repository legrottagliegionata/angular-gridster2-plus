import { Gridster } from './gridster';
import { DirTypes } from './gridsterConfig';
import { GridsterItemConfig } from './gridsterItemConfig';
import { GridsterUtils } from './gridsterUtils';

export class GridsterEmptyCell {
  initialItem: GridsterItemConfig | null;
  removeEmptyCellClickListenerFn: (() => void) | null;
  removeEmptyCellTouchendListenerFn: (() => void) | null;
  removeEmptyCellContextMenuListenerFn: (() => void) | null;
  removeEmptyCellDropListenerFn: (() => void) | null;
  removeEmptyCellMousedownListenerFn: (() => void) | null;
  removeEmptyCellTouchstartListenerFn: (() => void) | null;
  removeEmptyCellHoverMoveListenerFn: (() => void) | null;
  removeEmptyCellHoverLeaveListenerFn: (() => void) | null;
  hoverItem: GridsterItemConfig | null = null;
  removeWindowMousemoveListenerFn: () => void;
  removeWindowTouchmoveListenerFn: () => void;
  removeWindowMouseupListenerFn: () => void;
  removeWindowTouchendListenerFn: () => void;
  removeEmptyCellDragoverListenerFn: (() => void) | null;
  removeDocumentDragendListenerFn: (() => void) | null;

  constructor(private gridster: Gridster) {}

  destroy(): void {
    this.removeEmptyCellHoverListeners();
    if (this.gridster.previewStyle) {
      this.gridster.previewStyle();
    }
    this.gridster.movingItem = null;
    this.initialItem = this.gridster = null!;
    if (this.removeDocumentDragendListenerFn) {
      this.removeDocumentDragendListenerFn();
      this.removeDocumentDragendListenerFn = null;
    }
  }

  updateOptions(): void {
    const options = this.gridster.options();
    const $options = this.gridster.$options();
    if ($options.enableEmptyCellClick && !this.removeEmptyCellClickListenerFn && options.emptyCellClickCallback) {
      this.removeEmptyCellClickListenerFn = this.gridster.renderer.listen(this.gridster.el, 'click', this.emptyCellClickCb);
      this.removeEmptyCellTouchendListenerFn = this.gridster.renderer.listen(this.gridster.el, 'touchend', this.emptyCellClickCb);
    } else if (!$options.enableEmptyCellClick && this.removeEmptyCellClickListenerFn && this.removeEmptyCellTouchendListenerFn) {
      this.removeEmptyCellClickListenerFn();
      this.removeEmptyCellTouchendListenerFn();
      this.removeEmptyCellClickListenerFn = null;
      this.removeEmptyCellTouchendListenerFn = null;
    }
    if ($options.enableEmptyCellContextMenu && !this.removeEmptyCellContextMenuListenerFn && options.emptyCellContextMenuCallback) {
      this.removeEmptyCellContextMenuListenerFn = this.gridster.renderer.listen(this.gridster.el, 'contextmenu', this.emptyCellContextMenuCb);
    } else if (!$options.enableEmptyCellContextMenu && this.removeEmptyCellContextMenuListenerFn) {
      this.removeEmptyCellContextMenuListenerFn();
      this.removeEmptyCellContextMenuListenerFn = null;
    }
    if ($options.enableEmptyCellDrop && !this.removeEmptyCellDropListenerFn && options.emptyCellDropCallback) {
      this.removeEmptyCellDropListenerFn = this.gridster.renderer.listen(this.gridster.el, 'drop', this.emptyCellDragDrop);
      this.gridster.zone.runOutsideAngular(() => {
        this.removeEmptyCellDragoverListenerFn = this.gridster.renderer.listen(this.gridster.el, 'dragover', this.emptyCellDragOver);
      });
      this.removeDocumentDragendListenerFn = this.gridster.renderer.listen('document', 'dragend', () => {
        this.gridster.movingItem = null;
        this.gridster.previewStyle();
      });
    } else if (
      !$options.enableEmptyCellDrop &&
      this.removeEmptyCellDropListenerFn &&
      this.removeEmptyCellDragoverListenerFn &&
      this.removeDocumentDragendListenerFn
    ) {
      this.removeEmptyCellDropListenerFn();
      this.removeEmptyCellDragoverListenerFn();
      this.removeDocumentDragendListenerFn();
      this.removeEmptyCellDragoverListenerFn = null;
      this.removeEmptyCellDropListenerFn = null;
      this.removeDocumentDragendListenerFn = null;
    }
    if ($options.enableEmptyCellDrag && !this.removeEmptyCellMousedownListenerFn && options.emptyCellDragCallback) {
      this.removeEmptyCellMousedownListenerFn = this.gridster.renderer.listen(this.gridster.el, 'mousedown', this.emptyCellMouseDown);
      this.removeEmptyCellTouchstartListenerFn = this.gridster.renderer.listen(this.gridster.el, 'touchstart', this.emptyCellMouseDown);
    } else if (!$options.enableEmptyCellDrag && this.removeEmptyCellMousedownListenerFn && this.removeEmptyCellTouchstartListenerFn) {
      this.removeEmptyCellMousedownListenerFn();
      this.removeEmptyCellTouchstartListenerFn();
      this.removeEmptyCellMousedownListenerFn = null;
      this.removeEmptyCellTouchstartListenerFn = null;
    }
    if ($options.enableEmptyCellHover && !this.removeEmptyCellHoverMoveListenerFn) {
      this.gridster.zone.runOutsideAngular(() => {
        this.removeEmptyCellHoverMoveListenerFn = this.gridster.renderer.listen(this.gridster.el, 'mousemove', this.emptyCellHoverMove);
        this.removeEmptyCellHoverLeaveListenerFn = this.gridster.renderer.listen(this.gridster.el, 'mouseleave', this.emptyCellHoverLeave);
      });
    } else if (!$options.enableEmptyCellHover && this.removeEmptyCellHoverMoveListenerFn && this.removeEmptyCellHoverLeaveListenerFn) {
      this.removeEmptyCellHoverListeners();
      this.hideEmptyCellHover();
    }
  }

  emptyCellClickCb = (e: MouseEvent): void => {
    if (!this.gridster || this.isPreviewOwnedByAnotherInteraction() || GridsterUtils.checkContentClassForEmptyCellClickEvent(this.gridster, e)) {
      return;
    }
    const item = this.getValidItemFromEvent(e);
    if (!item) {
      return;
    }
    const options = this.gridster.options();
    if (options.emptyCellClickCallback) {
      options.emptyCellClickCallback(e, item);
    }
    this.gridster.cdRef.markForCheck();
  };

  emptyCellContextMenuCb = (e: MouseEvent): void => {
    if (this.isPreviewOwnedByAnotherInteraction() || GridsterUtils.checkContentClassForEmptyCellClickEvent(this.gridster, e)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const item = this.getValidItemFromEvent(e);
    if (!item) {
      return;
    }
    const options = this.gridster.options();
    if (options.emptyCellContextMenuCallback) {
      options.emptyCellContextMenuCallback(e, item);
    }
    this.gridster.cdRef.markForCheck();
  };

  emptyCellDragDrop = (e: DragEvent): void => {
    const item = this.getValidItemFromEvent(e);
    if (!item) {
      return;
    }
    const options = this.gridster.options();
    if (options.emptyCellDropCallback) {
      options.emptyCellDropCallback(e, item);
    }
    this.gridster.cdRef.markForCheck();
  };

  emptyCellDragOver = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    const item = this.getValidItemFromEvent(e);
    if (item) {
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
      }
      this.gridster.movingItem = item;
    } else {
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'none';
      }
      this.gridster.movingItem = null;
    }
    this.gridster.previewStyle();
  };

  emptyCellMouseDown = (e: MouseEvent): void => {
    if (GridsterUtils.checkContentClassForEmptyCellClickEvent(this.gridster, e) || this.isEventFromScrollbar(e)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const item = this.getValidItemFromEvent(e);
    const leftMouseButtonCode = 1;
    if (!item || (e.buttons !== leftMouseButtonCode && !(e instanceof TouchEvent))) {
      return;
    }
    this.initialItem = item;
    this.gridster.movingItem = item;
    this.gridster.previewStyle();
    this.gridster.zone.runOutsideAngular(() => {
      this.removeWindowMousemoveListenerFn = this.gridster.renderer.listen('window', 'mousemove', this.emptyCellMouseMove);
      this.removeWindowTouchmoveListenerFn = this.gridster.renderer.listen('window', 'touchmove', this.emptyCellMouseMove);
    });
    this.removeWindowMouseupListenerFn = this.gridster.renderer.listen('window', 'mouseup', this.emptyCellMouseUp);
    this.removeWindowTouchendListenerFn = this.gridster.renderer.listen('window', 'touchend', this.emptyCellMouseUp);
  };

  emptyCellMouseMove = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    const item = this.getValidItemFromEvent(e, this.initialItem);
    if (!item) {
      return;
    }

    this.gridster.movingItem = item;
    this.gridster.previewStyle();
  };

  emptyCellMouseUp = (e: MouseEvent): void => {
    this.removeWindowMousemoveListenerFn();
    this.removeWindowTouchmoveListenerFn();
    this.removeWindowMouseupListenerFn();
    this.removeWindowTouchendListenerFn();
    const item = this.getValidItemFromEvent(e, this.initialItem);
    if (item) {
      this.gridster.movingItem = item;
    }
    const options = this.gridster.options();
    if (options.emptyCellDragCallback && this.gridster.movingItem) {
      options.emptyCellDragCallback(e, this.gridster.movingItem);
    }
    setTimeout(() => {
      this.initialItem = null;
      if (this.gridster) {
        this.gridster.movingItem = null;
        this.gridster.previewStyle();
      }
    });
    this.gridster.cdRef.markForCheck();
  };

  emptyCellHoverMove = (e: MouseEvent): void => {
    if (!this.gridster) {
      return;
    }
    if (e.buttons) {
      this.hideEmptyCellHover();
      return;
    }
    if (this.isPreviewOwnedByAnotherInteraction()) {
      return;
    }
    const rect = this.gridster.el.getBoundingClientRect();
    const $options = this.gridster.$options();
    const item: GridsterItemConfig = {
      x: this.gridster.pixelsToPositionX(this.getPixelsX(e, rect), Math.floor, true),
      y: this.gridster.pixelsToPositionY(this.getPixelsY(e, rect), Math.floor, true),
      cols: $options.defaultItemCols,
      rows: $options.defaultItemRows
    };
    if (this.gridster.checkCollision(item)) {
      this.hideEmptyCellHover();
      return;
    }
    const hoverItem = this.hoverItem;
    if (
      hoverItem &&
      this.gridster.movingItem === hoverItem &&
      hoverItem.x === item.x &&
      hoverItem.y === item.y &&
      hoverItem.cols === item.cols &&
      hoverItem.rows === item.rows
    ) {
      return;
    }
    this.hoverItem = this.gridster.movingItem = item;
    this.gridster.previewStyle();
  };

  emptyCellHoverLeave = (): void => {
    this.hideEmptyCellHover();
  };

  getPixelsX(e: MouseEvent, rect: ClientRect): number {
    const scale = this.gridster.options().scale;
    const $options = this.gridster.$options();
    let distanceFromStart: number;
    let scrollOffset: number;
    let startMargin: number;
    if ($options.dirType === DirTypes.RTL) {
      // RTL grids start at the right edge and scrollLeft becomes negative while scrolling to the left
      distanceFromStart = rect.right - e.clientX;
      scrollOffset = -this.gridster.el.scrollLeft;
      startMargin = $options.outerMargin ? ($options.outerMarginRight ?? $options.margin) : 0;
    } else {
      distanceFromStart = e.clientX - rect.left;
      scrollOffset = this.gridster.el.scrollLeft;
      startMargin = this.gridster.gridRenderer.getLeftMargin();
    }
    return (scale ? distanceFromStart / scale : distanceFromStart) + scrollOffset - startMargin;
  }

  getPixelsY(e: MouseEvent, rect: ClientRect): number {
    const scale = this.gridster.options().scale;
    if (scale) {
      return (e.clientY - rect.top) / scale + this.gridster.el.scrollTop - this.gridster.gridRenderer.getTopMargin();
    }
    return e.clientY + this.gridster.el.scrollTop - rect.top - this.gridster.gridRenderer.getTopMargin();
  }

  getValidItemFromEvent(e: MouseEvent, oldItem?: GridsterItemConfig | null): GridsterItemConfig | undefined {
    e.preventDefault();
    e.stopPropagation();
    GridsterUtils.checkTouchEvent(e);
    const rect = this.gridster.el.getBoundingClientRect();
    const x = this.getPixelsX(e, rect);
    const y = this.getPixelsY(e, rect);
    const $options = this.gridster.$options();
    const item: GridsterItemConfig = {
      x: this.gridster.pixelsToPositionX(x, Math.floor, true),
      y: this.gridster.pixelsToPositionY(y, Math.floor, true),
      cols: Math.max($options.defaultItemCols, $options.minItemCols),
      rows: Math.max($options.defaultItemRows, $options.minItemRows)
    };
    if (oldItem) {
      const cellX = item.x;
      const cellY = item.y;
      item.cols = Math.min(Math.max(Math.abs(oldItem.x - cellX) + 1, $options.minItemCols), $options.emptyCellDragMaxCols);
      item.rows = Math.min(Math.max(Math.abs(oldItem.y - cellY) + 1, $options.minItemRows), $options.emptyCellDragMaxRows);
      if (oldItem.x <= cellX) {
        item.x = oldItem.x;
      } else {
        item.x = oldItem.x - item.cols + 1;
      }
      if (oldItem.y <= cellY) {
        item.y = oldItem.y;
      } else {
        item.y = oldItem.y - item.rows + 1;
      }
    }
    if (!oldItem) {
      // keep click/drop items inside the grid; drag-to-create keeps its anchor cell
      item.x = Math.min(item.x, Math.max($options.maxCols - item.cols, 0));
      item.y = Math.min(item.y, Math.max($options.maxRows - item.rows, 0));
    }
    if (!$options.enableOccupiedCellDrop && this.gridster.checkCollision(item)) {
      return;
    }
    return item;
  }

  private isEventFromScrollbar(e: MouseEvent): boolean {
    const el = this.gridster.el;
    const rect = el.getBoundingClientRect();
    const verticalScrollbarWidth = el.offsetWidth - el.clientWidth;
    const horizontalScrollbarHeight = el.offsetHeight - el.clientHeight;
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const hasVerticalScrollbar = verticalScrollbarWidth > 0 && el.scrollHeight > el.clientHeight;
    const hasHorizontalScrollbar = horizontalScrollbarHeight > 0 && el.scrollWidth > el.clientWidth;
    const direction = getComputedStyle(el).direction;
    const withinElementWidth = offsetX >= 0 && offsetX <= el.offsetWidth;
    const withinElementHeight = offsetY >= 0 && offsetY <= el.offsetHeight;
    const onVerticalScrollbar =
      hasVerticalScrollbar &&
      withinElementWidth &&
      withinElementHeight &&
      (direction === 'rtl' ? offsetX <= verticalScrollbarWidth : offsetX >= el.clientWidth) &&
      offsetX <= el.offsetWidth;
    const onHorizontalScrollbar = hasHorizontalScrollbar && withinElementWidth && offsetY >= el.clientHeight && offsetY <= el.offsetHeight;

    return onVerticalScrollbar || onHorizontalScrollbar;
  }

  private hideEmptyCellHover(): void {
    if (!this.gridster || !this.hoverItem) {
      return;
    }
    if (this.gridster.movingItem === this.hoverItem) {
      this.gridster.movingItem = null;
      this.gridster.previewStyle();
    }
    this.hoverItem = null;
  }

  // movingItem is shared by item drag, empty-cell drag, HTML5 drop and the hover preview
  private isPreviewOwnedByAnotherInteraction(): boolean {
    return !!this.gridster.movingItem && this.gridster.movingItem !== this.hoverItem;
  }

  private removeEmptyCellHoverListeners(): void {
    if (this.removeEmptyCellHoverMoveListenerFn) {
      this.removeEmptyCellHoverMoveListenerFn();
      this.removeEmptyCellHoverMoveListenerFn = null;
    }
    if (this.removeEmptyCellHoverLeaveListenerFn) {
      this.removeEmptyCellHoverLeaveListenerFn();
      this.removeEmptyCellHoverLeaveListenerFn = null;
    }
  }
}
