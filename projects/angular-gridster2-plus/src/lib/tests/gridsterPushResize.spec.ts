import type { GridsterItem } from '../gridsterItem';
import { GridsterPushResize } from '../gridsterPushResize';

describe('GridsterPushResize', () => {
  it('restores the rows of items pushed during a cancelled resize', () => {
    const source = { x: 2, y: 1, cols: 2, rows: 3 };
    const state = { x: 3, y: 1, cols: 1, rows: 1 };
    const pushedItem = { $item: () => state, item: () => source, setSize: vi.fn() };
    const pushResize = new GridsterPushResize({ gridster: {} } as unknown as GridsterItem);
    (pushResize as unknown as { pushedItems: unknown[] }).pushedItems = [pushedItem];

    pushResize.restoreItems();

    expect(state).toEqual(source);
    expect(pushedItem.setSize).toHaveBeenCalledOnce();
  });
});
