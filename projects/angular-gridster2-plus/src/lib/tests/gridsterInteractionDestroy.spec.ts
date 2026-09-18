import type { ChangeDetectorRef, NgZone } from '@angular/core';

import type { Gridster } from '../gridster';
import { GridsterDraggable } from '../gridsterDraggable';
import type { GridsterItem } from '../gridsterItem';
import { GridsterResizable } from '../gridsterResizable';

function makeEvent(): MouseEvent {
  return {
    stopPropagation: vi.fn(),
    preventDefault: vi.fn()
  } as unknown as MouseEvent;
}

function makeGridster(): Gridster {
  return {
    dragInProgress: true,
    movingItem: { x: 0, y: 0, cols: 1, rows: 1 },
    previewStyle: vi.fn()
  } as unknown as Gridster;
}

function makeZone(): NgZone {
  return {
    runOutsideAngular: <T>(fn: () => T) => fn(),
    run: <T>(fn: () => T) => fn()
  } as unknown as NgZone;
}

function makeCdRef(): ChangeDetectorRef {
  return { markForCheck: vi.fn() } as unknown as ChangeDetectorRef;
}

describe('gridster interaction teardown', () => {
  it('releases a drag in progress and ignores late draggable callbacks after destroy', () => {
    const gridster = makeGridster();
    const draggable = new GridsterDraggable({} as GridsterItem, gridster, makeZone(), makeCdRef());
    const cleanup = Array.from({ length: 10 }, () => vi.fn());
    draggable.mousedown = cleanup[0];
    draggable.touchstart = cleanup[1];
    draggable.mousemove = cleanup[2];
    draggable.mouseup = cleanup[3];
    draggable.mouseleave = cleanup[4];
    draggable.contextmenu = cleanup[5];
    draggable.cancelOnBlur = cleanup[6];
    draggable.touchmove = cleanup[7];
    draggable.touchend = cleanup[8];
    draggable.touchcancel = cleanup[9];

    draggable.destroy();

    cleanup.forEach(listener => expect(listener).toHaveBeenCalledTimes(1));
    expect(gridster.dragInProgress).toBe(false);
    expect(gridster.movingItem).toBeNull();
    expect(() => draggable.dragStop(makeEvent())).not.toThrow();
    expect(() => draggable.makeDrag()).not.toThrow();
    expect(() => draggable.cancelDrag()).not.toThrow();
  });

  it('releases a resize in progress and ignores a late resizable stop event after destroy', () => {
    const gridster = makeGridster();
    const resizable = new GridsterResizable({} as GridsterItem, gridster, makeZone());
    const cleanup = Array.from({ length: 7 }, () => vi.fn());
    resizable.mousemove = cleanup[0];
    resizable.mouseup = cleanup[1];
    resizable.mouseleave = cleanup[2];
    resizable.cancelOnBlur = cleanup[3];
    resizable.touchmove = cleanup[4];
    resizable.touchend = cleanup[5];
    resizable.touchcancel = cleanup[6];

    resizable.destroy();

    cleanup.forEach(listener => expect(listener).toHaveBeenCalledTimes(1));
    expect(gridster.dragInProgress).toBe(false);
    expect(gridster.movingItem).toBeNull();
    expect(() => resizable.dragStop(makeEvent())).not.toThrow();
  });

  it('keeps the grid interaction state when an idle item is destroyed', () => {
    const gridster = makeGridster();
    const movingItem = gridster.movingItem;
    const draggable = new GridsterDraggable({} as GridsterItem, gridster, makeZone(), makeCdRef());
    const resizable = new GridsterResizable({} as GridsterItem, gridster, makeZone());

    draggable.destroy();
    resizable.destroy();

    expect(gridster.dragInProgress).toBe(true);
    expect(gridster.movingItem).toBe(movingItem);
  });
});
