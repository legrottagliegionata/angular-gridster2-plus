import { ChangeDetectorRef, NgZone } from '@angular/core';

import { Gridster } from './gridster';
import { DirTypes } from './gridsterConfig';
import { GridsterItem } from './gridsterItem';
import { GridsterPush } from './gridsterPush';
import { cancelScroll, scroll } from './gridsterScroll';
import { GridsterSwap } from './gridsterSwap';
import { GridsterUtils } from './gridsterUtils';

const GRIDSTER_ITEM_RESIZABLE_HANDLER_CLASS = 'gridster-item-resizable-handler';

enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export class GridsterDraggable {
  lastMouse = {
    clientX: 0,
    clientY: 0
  };
  offsetLeft: number;
  offsetTop: number;
  margin: number;
  outerMarginTop: number | null;
  outerMarginRight: number | null;
  outerMarginBottom: number | null;
  outerMarginLeft: number | null;
  diffTop: number;
  diffLeft: number;
  originalClientX: number;
  originalClientY: number;
  top: number;
  left: number;
  height: number;
  width: number;
  positionX: number;
  positionY: number;
  positionXBackup: number;
  positionYBackup: number;
  enabled: boolean;
  mousemove: (() => void) | null;
  mouseup: (() => void) | null;
  mouseleave: (() => void) | null;
  contextmenu: (() => void) | null;
  cancelOnBlur: (() => void) | null;
  touchmove: (() => void) | null;
  touchend: (() => void) | null;
  touchcancel: (() => void) | null;
  gridScroll: (() => void) | null;
  nativeDragStart: (() => void) | null;
  mousedown: () => void;
  touchstart: () => void;
  push: GridsterPush;
  swap: GridsterSwap;
  path: { x: number; y: number }[] = [];
  collision: GridsterItem | boolean = false;

  constructor(
    private gridsterItem: GridsterItem,
    private gridster: Gridster,
    private zone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {}

  destroy(): void {
    if (this.mousemove && this.gridster) {
      // the item is destroyed in the middle of a drag: release the grid interaction state
      cancelScroll();
      this.gridster.dragInProgress = false;
      this.gridster.movingItem = null;
    }
    this.removeStartListeners();
    this.removeDragListeners();
    if (this.gridster?.previewStyle) {
      this.gridster.previewStyle(true);
    }
    this.gridsterItem = this.gridster = this.collision = null!;
  }

  dragStart(e: MouseEvent): void {
    if ((e.which && e.which !== 1) || this.gridster.dragInProgress) {
      return;
    }

    const options = this.gridster.options();
    const $options = this.gridster.$options();
    if (options.draggable && options.draggable.start) {
      options.draggable.start(this.gridsterItem.item(), this.gridsterItem, e);
    }

    e.stopPropagation();
    e.preventDefault();

    this.resetLastMouse(e);

    this.zone.runOutsideAngular(() => {
      this.mousemove = this.gridsterItem.renderer.listen('document', 'mousemove', this.dragMove);
      this.touchmove = this.gridster.renderer.listen(this.gridster.el, 'touchmove', this.dragMove);
      this.gridScroll = this.gridster.renderer.listen(this.gridster.el, 'scroll', this.gridScrolled);
    });
    this.mouseup = this.gridsterItem.renderer.listen('document', 'mouseup', this.dragStop);
    this.mouseleave = this.gridsterItem.renderer.listen('document', 'mouseleave', this.dragStop);
    this.contextmenu = this.gridsterItem.renderer.listen('document', 'contextmenu', this.dragStopOnContextMenu);
    this.cancelOnBlur = this.gridsterItem.renderer.listen('window', 'blur', this.dragStop);
    this.touchend = this.gridsterItem.renderer.listen('document', 'touchend', this.dragStop);
    this.touchcancel = this.gridsterItem.renderer.listen('document', 'touchcancel', this.dragStop);
    // a native drag (dragging selected text) swallows the mouseup: stop here or the item keeps following the pointer (upstream #421)
    this.nativeDragStart = this.gridsterItem.renderer.listen(this.gridsterItem.el, 'dragstart', this.dragStop);
    this.gridsterItem.renderer.addClass(this.gridsterItem.el, 'gridster-item-moving');
    this.gridsterItem.isMoving.set(true);
    this.margin = $options.margin;
    this.outerMarginTop = $options.outerMarginTop;
    this.outerMarginRight = $options.outerMarginRight;
    this.outerMarginBottom = $options.outerMarginBottom;
    this.outerMarginLeft = $options.outerMarginLeft;
    this.updateScrollOffsets();
    this.left = this.gridsterItem.left - this.margin;
    this.top = this.gridsterItem.top - this.margin;
    this.originalClientX = e.clientX;
    this.originalClientY = e.clientY;
    this.width = this.gridsterItem.width;
    this.height = this.gridsterItem.height;
    this.diffLeft = e.clientX + this.offsetLeft - this.margin - this.left;
    this.diffTop = e.clientY + this.offsetTop - this.margin - this.top;
    this.gridster.movingItem = this.gridsterItem.$item();
    this.gridster.previewStyle(true);
    this.push = new GridsterPush(this.gridsterItem);
    this.swap = new GridsterSwap(this.gridsterItem);
    this.gridster.dragInProgress = true;
    this.gridster.updateGrid();
    this.path.push({
      x: this.gridsterItem.item().x || 0,
      y: this.gridsterItem.item().y || 0
    });
  }

  dragMove = (e: MouseEvent): void => {
    e.stopPropagation();
    if (e.cancelable) {
      // a touchmove during a scroll cannot be cancelled: calling preventDefault only logs an intervention (upstream #563)
      e.preventDefault();
    }
    GridsterUtils.checkTouchEvent(e);

    // get the directions of the mouse event
    let directions = this.getDirections(e);

    const $options = this.gridster.$options();
    if ($options.enableBoundaryControl) {
      // prevent moving up at the top of gridster
      if (
        directions.includes(Direction.UP) &&
        this.gridsterItem.el.getBoundingClientRect().top < this.gridster.el.getBoundingClientRect().top + (this.outerMarginTop ?? this.margin)
      ) {
        directions = directions.filter(direction => direction != Direction.UP);
        e = new MouseEvent(e.type, {
          clientX: e.clientX,
          clientY: this.lastMouse.clientY
        });
      }
      // prevent moving left at the leftmost column of gridster
      if (
        directions.includes(Direction.LEFT) &&
        this.gridsterItem.el.getBoundingClientRect().left < this.gridster.el.getBoundingClientRect().left + (this.outerMarginLeft ?? this.margin)
      ) {
        directions = directions.filter(direction => direction != Direction.LEFT);
        e = new MouseEvent(e.type, {
          clientX: this.lastMouse.clientX,
          clientY: e.clientY
        });
      }
      // prevent moving right at the rightmost column of gridster
      if (
        directions.includes(Direction.RIGHT) &&
        this.gridsterItem.el.getBoundingClientRect().right > this.gridster.el.getBoundingClientRect().right - (this.outerMarginRight ?? this.margin)
      ) {
        directions = directions.filter(direction => direction != Direction.RIGHT);
        e = new MouseEvent(e.type, {
          clientX: this.lastMouse.clientX,
          clientY: e.clientY
        });
      }
      // prevent moving down at the bottom of gridster
      if (
        directions.includes(Direction.DOWN) &&
        this.gridsterItem.el.getBoundingClientRect().bottom >
          this.gridster.el.getBoundingClientRect().bottom - (this.outerMarginBottom ?? this.margin)
      ) {
        directions = directions.filter(direction => direction != Direction.DOWN);
        e = new MouseEvent(e.type, {
          clientX: e.clientX,
          clientY: this.lastMouse.clientY
        });
      }
    }

    // do not change item location when there is no direction to go
    if (directions.length) {
      this.updateScrollOffsets();
      scroll(this.gridster, e, this.lastMouse, this.gridScrolled);

      this.calculateItemPositionFromMousePosition(e);
    }
  };

  // called for the wheel (upstream #735) and for every auto-scroll step: it only reads the current scroll position
  // and the last pointer position, so the item stays under the pointer however often it runs
  gridScrolled = (): void => {
    if (!this.gridster) {
      return;
    }
    this.updateScrollOffsets();
    this.calculateItemPositionFromMousePosition(this.lastMouse);
  };

  // RTL positions grow to the left, where scrollLeft goes negative: the horizontal scroll is mirrored like the pointer
  private updateScrollOffsets(): void {
    const el = this.gridster.el;
    const scrollLeft = this.gridster.$options().dirType === DirTypes.RTL ? -el.scrollLeft : el.scrollLeft;
    this.offsetLeft = scrollLeft - el.offsetLeft;
    this.offsetTop = el.scrollTop - el.offsetTop;
  }

  calculateItemPositionFromMousePosition = (e: Pick<MouseEvent, 'clientX' | 'clientY'>): void => {
    const $options = this.gridster.$options();
    // the pointer moves in screen pixels, the grid in its own pixels: a scaled grid (`scale`) needs the distance divided.
    // RTL positions grow to the left, so the horizontal distance is mirrored
    const scale = $options.scale || 1;
    const directionX = $options.dirType === DirTypes.RTL ? -1 : 1;
    const clientX = this.originalClientX + (directionX * (e.clientX - this.originalClientX)) / scale;
    const clientY = this.originalClientY + (e.clientY - this.originalClientY) / scale;
    this.left = clientX + this.offsetLeft - this.diffLeft;
    this.top = clientY + this.offsetTop - this.diffTop;
    this.calculateItemPosition();
    this.lastMouse.clientX = e.clientX;
    this.lastMouse.clientY = e.clientY;
    this.zone.run(() => this.gridster.updateGrid());
  };

  dragStop = (e: MouseEvent, preventEvent = true): void => {
    if (preventEvent) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!this.gridster || !this.gridsterItem) {
      return;
    }

    cancelScroll();
    this.removeDragListeners();
    this.gridsterItem.renderer.removeClass(this.gridsterItem.el, 'gridster-item-moving');
    this.gridsterItem.isMoving.set(false);
    this.gridster.dragInProgress = false;
    this.gridster.updateGrid();
    this.path = [];
    this.resetLastMouse();
    const options = this.gridster.options();
    if (options.draggable && options.draggable.stop) {
      Promise.resolve(options.draggable.stop(this.gridsterItem.item(), this.gridsterItem, e)).then(this.makeDrag, this.cancelDrag);
    } else {
      this.makeDrag();
    }
    setTimeout(() => {
      if (this.gridster) {
        this.gridster.movingItem = null;
        this.gridster.previewStyle(true);
        this.cdRef.markForCheck();
      }
    });
  };

  dragStopOnContextMenu = (e: MouseEvent): void => {
    this.dragStop(e, false);
  };

  private removeStartListeners(): void {
    this.mousedown?.();
    this.touchstart?.();
    this.mousedown = this.touchstart = null!;
  }

  private removeDragListeners(): void {
    this.cancelOnBlur?.();
    this.gridScroll?.();
    this.nativeDragStart?.();
    this.mousemove?.();
    this.mouseup?.();
    this.mouseleave?.();
    this.contextmenu?.();
    this.touchmove?.();
    this.touchend?.();
    this.touchcancel?.();
    this.cancelOnBlur =
      this.nativeDragStart =
      this.gridScroll =
      this.mousemove =
      this.mouseup =
      this.mouseleave =
      this.contextmenu =
      this.touchmove =
      this.touchend =
      this.touchcancel =
        null!;
  }

  cancelDrag = (): void => {
    if (!this.gridster || !this.gridsterItem) {
      return;
    }
    this.gridsterItem.$item().x = this.gridsterItem.item().x || 0;
    this.gridsterItem.$item().y = this.gridsterItem.item().y || 0;
    this.positionX = this.positionXBackup = this.gridsterItem.$item().x;
    this.positionY = this.positionYBackup = this.gridsterItem.$item().y;
    this.gridsterItem.setSize();
    if (this.push) {
      this.push.restoreItems();
    }
    if (this.swap) {
      this.swap.restoreSwapItem();
    }
    if (this.push) {
      this.push.destroy();
      this.push = null!;
    }
    if (this.swap) {
      this.swap.destroy();
      this.swap = null!;
    }
  };

  makeDrag = (): void => {
    if (!this.gridster || !this.gridsterItem) {
      return;
    }
    const options = this.gridster.options();
    if (
      this.gridster.$options().draggable.dropOverItems &&
      options.draggable &&
      options.draggable.dropOverItemsCallback &&
      this.collision &&
      this.collision !== true &&
      this.collision.$item()
    ) {
      options.draggable.dropOverItemsCallback(this.gridsterItem.item(), this.collision.item(), this.gridster);
    }
    this.collision = false;
    this.gridsterItem.setSize();
    this.gridsterItem.checkItemChanges(this.gridsterItem.$item(), this.gridsterItem.item());
    if (this.push) {
      this.push.setPushedItems();
    }
    if (this.swap) {
      this.swap.setSwapItem();
    }
    if (this.push) {
      this.push.destroy();
      this.push = null!;
    }
    if (this.swap) {
      this.swap.destroy();
      this.swap = null!;
    }
  };

  calculateItemPosition(): void {
    const $item = (this.gridster.movingItem = this.gridsterItem.$item());
    this.positionX = this.gridster.pixelsToPositionX(this.left, Math.round);
    this.positionY = this.gridster.pixelsToPositionY(this.top, Math.round);
    this.positionXBackup = $item.x;
    this.positionYBackup = $item.y;
    $item.x = this.positionX;
    if (this.gridster.checkGridCollision($item)) {
      $item.x = this.positionXBackup;
    }
    $item.y = this.positionY;
    if (this.gridster.checkGridCollision($item)) {
      $item.y = this.positionYBackup;
    }
    this.gridster.gridRenderer.setCellPosition(this.gridsterItem.renderer, this.gridsterItem.el, this.left, this.top);

    if (this.positionXBackup !== $item.x || this.positionYBackup !== $item.y) {
      const lastPosition = this.path[this.path.length - 1] ?? { x: this.positionXBackup, y: this.positionYBackup };
      let direction = '';
      if (lastPosition.x < $item.x) {
        direction = this.push.fromWest;
      } else if (lastPosition.x > $item.x) {
        direction = this.push.fromEast;
      } else if (lastPosition.y < $item.y) {
        direction = this.push.fromNorth;
      } else if (lastPosition.y > $item.y) {
        direction = this.push.fromSouth;
      }
      const $options = this.gridster.$options();
      this.push.pushItems(direction, $options.disablePushOnDrag);
      this.swap.swapItems();
      this.collision = this.gridster.checkCollision($item);
      if (this.collision) {
        $item.x = this.positionXBackup;
        $item.y = this.positionYBackup;
        if ($options.draggable.dropOverItems && this.collision !== true && this.collision.$item()) {
          this.gridster.movingItem = null;
        }
      } else {
        this.path.push({
          x: $item.x,
          y: $item.y
        });
      }
      this.push.checkPushBack();
    } else {
      // reset the collision when you drag and drop on an adjacent cell that is not empty
      // and go back to the cell you were in from the beginning,
      // this is to prevent `dropOverItemsCallback'
      this.collision = false;
    }
    this.gridster.previewStyle(true);
  }

  toggle(): void {
    const enableDrag = this.gridsterItem.canBeDragged();
    if (!this.enabled && enableDrag) {
      this.enabled = !this.enabled;
      this.mousedown = this.gridsterItem.renderer.listen(this.gridsterItem.el, 'mousedown', this.dragStartDelay);
      this.touchstart = this.gridsterItem.renderer.listen(this.gridsterItem.el, 'touchstart', this.dragStartDelay);
    } else if (this.enabled && !enableDrag) {
      this.enabled = !this.enabled;
      this.mousedown();
      this.touchstart();
    }
  }

  dragStartDelay = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains(GRIDSTER_ITEM_RESIZABLE_HANDLER_CLASS)) {
      return;
    }
    if (GridsterUtils.checkContentClassForEvent(this.gridster, e)) {
      return;
    }
    GridsterUtils.checkTouchEvent(e);
    const $options = this.gridster.$options();
    if (!$options.draggable.delayStart) {
      this.dragStart(e);
      return;
    }
    const timeout = setTimeout(() => {
      this.dragStart(e);
      cancelDrag();
      this.cdRef.markForCheck();
    }, $options.draggable.delayStart);
    const cancelMouse = this.gridsterItem.renderer.listen('document', 'mouseup', cancelDrag);
    const cancelMouseLeave = this.gridsterItem.renderer.listen('document', 'mouseleave', cancelDrag);
    const cancelOnBlur = this.gridsterItem.renderer.listen('window', 'blur', cancelDrag);
    const cancelTouchMove = this.gridsterItem.renderer.listen('document', 'touchmove', cancelMove);
    const cancelTouchEnd = this.gridsterItem.renderer.listen('document', 'touchend', cancelDrag);
    const cancelTouchCancel = this.gridsterItem.renderer.listen('document', 'touchcancel', cancelDrag);

    function cancelMove(eventMove: MouseEvent): void {
      GridsterUtils.checkTouchEvent(eventMove);
      if (Math.abs(eventMove.clientX - e.clientX) > 9 || Math.abs(eventMove.clientY - e.clientY) > 9) {
        cancelDrag();
      }
    }

    function cancelDrag(): void {
      clearTimeout(timeout);
      cancelOnBlur();
      cancelMouse();
      cancelMouseLeave();
      cancelTouchMove();
      cancelTouchEnd();
      cancelTouchCancel();
    }
  };

  /**
   * Returns the list of directions for given mouse event
   * @param e Mouse event
   * */
  private getDirections(e: MouseEvent) {
    const directions: string[] = [];
    if (this.lastMouse.clientX === 0 && this.lastMouse.clientY === 0) {
      this.lastMouse.clientY = e.clientY;
      this.lastMouse.clientX = e.clientX;
    }
    if (this.lastMouse.clientY > e.clientY) {
      directions.push(Direction.UP);
    }
    if (this.lastMouse.clientY < e.clientY) {
      directions.push(Direction.DOWN);
    }
    if (this.lastMouse.clientX < e.clientX) {
      directions.push(Direction.RIGHT);
    }
    if (this.lastMouse.clientX > e.clientX) {
      directions.push(Direction.LEFT);
    }
    return directions;
  }

  private resetLastMouse(e?: MouseEvent): void {
    this.lastMouse.clientX = e?.clientX ?? 0;
    this.lastMouse.clientY = e?.clientY ?? 0;
  }
}
