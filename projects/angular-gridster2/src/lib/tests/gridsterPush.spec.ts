import { signal } from '@angular/core';

import type { Gridster } from '../gridster';
import type { PushDirections } from '../gridsterConfig';
import type { GridsterItem } from '../gridsterItem';
import type { GridsterItemConfig } from '../gridsterItemConfig';
import { GridsterPush } from '../gridsterPush';

interface MockGridsterItem {
  $item: () => GridsterItemConfig;
  item: () => GridsterItemConfig;
  canBeDragged: () => boolean;
  setSize: ReturnType<typeof vi.fn>;
  gridster?: Gridster;
}

interface GridsterPushInternals {
  push(gridsterItem: GridsterItem, direction: string): boolean;
  removeFromPushedItem(gridsterItem: GridsterItem): void;
  pushedItems: GridsterItem[];
  pushedItemsPath: { x: number; y: number }[][];
  pushedItemsOrder: GridsterItem[];
}

function collides(item: GridsterItemConfig, item2: GridsterItemConfig): boolean {
  return item.x < item2.x + item2.cols && item.x + item.cols > item2.x && item.y < item2.y + item2.rows && item.y + item.rows > item2.y;
}

function makeItem(x: number, y: number, cols = 1, rows = 1): MockGridsterItem {
  const source = { x, y, cols, rows };
  const state = { ...source };
  return {
    $item: () => state,
    item: () => source,
    canBeDragged: () => true,
    setSize: vi.fn()
  };
}

function attachGridster(items: MockGridsterItem[], pushDirections: PushDirections, cols: number, rows: number): Gridster {
  const gridster = {
    $options: signal({ pushItems: true, pushDirections }),
    checkGridCollision: (item: GridsterItemConfig) => item.x < 0 || item.y < 0 || item.x + item.cols > cols || item.y + item.rows > rows,
    findItemsWithItem: (item: GridsterItemConfig) => items.filter(widget => widget.$item() !== item && collides(widget.$item(), item)),
    findItemWithItem: (item: GridsterItemConfig) => items.find(widget => widget.$item() !== item && collides(widget.$item(), item)) || false
  } as unknown as Gridster;
  items.forEach(item => (item.gridster = gridster));
  return gridster;
}

const verticalOnly: PushDirections = { north: true, east: false, south: true, west: false };
const allDirections: PushDirections = { north: true, east: true, south: true, west: true };

describe('gridsterPush service', () => {
  // upstream #941: dragging the 4th stacked item onto the 3rd swapped the 1st and 2nd items
  it('does not move unrelated items when a vertical-only push cannot make room', () => {
    const items = [makeItem(0, 0), makeItem(0, 1), makeItem(0, 2), makeItem(0, 3), makeItem(0, 4)];
    attachGridster(items, verticalOnly, 1, 5);
    const draggedItem = items[3];
    draggedItem.$item().y = 2;

    const push = new GridsterPush(draggedItem as unknown as GridsterItem);

    expect(push.pushItems(push.fromSouth)).toBe(false);
    expect(items.map(item => item.$item().y)).toEqual([0, 1, 2, 2, 4]);
  });

  it('fails a chained push that would place an item on top of the dragged item', () => {
    const draggedItem = makeItem(0, 1);
    const pushedItem = makeItem(0, 1);
    attachGridster([draggedItem, pushedItem], verticalOnly, 1, 5);
    const push = new GridsterPush(draggedItem as unknown as GridsterItem);
    const internals = push as unknown as GridsterPushInternals;
    internals.pushedItemsOrder = [];

    expect(internals.push(pushedItem as unknown as GridsterItem, push.fromNorth)).toBe(false);
  });

  it('forgets a pushed item once its own rollback path is empty', () => {
    const firstItem = makeItem(0, 0);
    const secondItem = makeItem(0, 1);
    attachGridster([firstItem, secondItem], verticalOnly, 1, 5);
    const push = new GridsterPush(firstItem as unknown as GridsterItem);
    const internals = push as unknown as GridsterPushInternals;
    internals.pushedItems = [firstItem, secondItem] as unknown as GridsterItem[];
    internals.pushedItemsPath = [
      [{ x: 0, y: 0 }],
      [
        { x: 0, y: 1 },
        { x: 0, y: 2 }
      ]
    ];

    internals.removeFromPushedItem(firstItem as unknown as GridsterItem);

    expect(internals.pushedItems).toHaveLength(1);
    expect(internals.pushedItems[0]).toBe(secondItem);
    expect(internals.pushedItemsPath).toEqual([
      [
        { x: 0, y: 1 },
        { x: 0, y: 2 }
      ]
    ]);
  });

  // upstream #818: dragging or resizing an item from the east into a column pushed the column south in reverse order
  it('keeps the order of a column pushed south by an item coming from the east', () => {
    const top = makeItem(0, 0);
    const bottom = makeItem(0, 1);
    const draggedItem = makeItem(1, 0, 1, 2);
    attachGridster([top, bottom, draggedItem], allDirections, 4, 10);
    draggedItem.$item().x = 0;

    const push = new GridsterPush(draggedItem as unknown as GridsterItem);

    expect(push.pushItems(push.fromEast)).toBe(true);
    expect([top.$item().y, bottom.$item().y]).toEqual([2, 3]);
  });

  it('keeps the order of a row pushed east by an item coming from the south', () => {
    const left = makeItem(0, 0);
    const right = makeItem(1, 0);
    const draggedItem = makeItem(0, 1, 2, 1);
    attachGridster([left, right, draggedItem], allDirections, 4, 2);
    draggedItem.$item().y = 0;

    const push = new GridsterPush(draggedItem as unknown as GridsterItem);

    expect(push.pushItems(push.fromSouth)).toBe(true);
    expect([left.$item().x, right.$item().x]).toEqual([2, 3]);
  });
});
