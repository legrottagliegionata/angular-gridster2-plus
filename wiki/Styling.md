# Styling

The components use `ViewEncapsulation.None`: override their styles from your global stylesheet, or from components with a more specific selector.

## Elements and classes

| Selector                                                                                   | Element                                                                                                                           |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `gridster`                                                                                 | The grid. Defaults: `background: grey`, `width` and `height` 100%                                                                 |
| `gridster.fit`, `gridster.scrollVertical`, `gridster.scrollHorizontal`, `gridster.fixed`   | Current grid type (`verticalFixed` uses `scrollVertical`, `horizontalFixed` uses `scrollHorizontal`)                              |
| `gridster.mobile`                                                                          | Mobile layout                                                                                                                     |
| `gridster.gridSize`                                                                        | `setGridSize` is on                                                                                                               |
| `gridster.display-grid`                                                                    | The grid lines are visible                                                                                                        |
| `gridster .gridster-column`, `gridster .gridster-row`                                      | Grid lines                                                                                                                        |
| `gridster .gridster-scroll-spacer`                                                         | Invisible element as big as the rows and columns plus the outer margins: it sets the scrollable area. Hidden in the mobile layout |
| `gridster-item`                                                                            | An item. Defaults: `background: white`, `transition: .3s`                                                                         |
| `gridster-item.gridster-item-moving`                                                       | Item being dragged                                                                                                                |
| `gridster-item.gridster-item-resizing`                                                     | Item being resized                                                                                                                |
| `gridster-preview`                                                                         | Shadow of the target position during drags, drops and hover                                                                       |
| `.gridster-item-resizable-handler.handle-n` (`-e`, `-s`, `-w`, `-ne`, `-nw`, `-se`, `-sw`) | Resize handles                                                                                                                    |
| `.gridster-item-content`                                                                   | Content that does not start a drag (default `draggable.ignoreContentClass`)                                                       |
| `.drag-handler`                                                                            | Drag handles with `ignoreContent: true` (default `draggable.dragHandleClass`)                                                     |

## Example theme

```css
gridster {
  background: #f4f5f7;
}

gridster-item {
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

gridster-item.gridster-item-moving,
gridster-item.gridster-item-resizing {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

gridster-preview {
  background: rgba(33, 150, 243, 0.2);
  border-radius: 8px;
}
```

## Grid lines

`displayGrid` controls when the grid lines are drawn:

| Value                     | Lines                               |
| ------------------------- | ----------------------------------- |
| `onDrag&Resize` (default) | while dragging or resizing          |
| `always`                  | always, except in the mobile layout |
| `none`                    | never                               |

The lines fill the visible area of the grid, so they can extend beyond the last column or row in use.

```css
gridster .gridster-column,
gridster .gridster-row {
  border-color: rgba(0, 0, 0, 0.06);
}
```

## Resize handles

The handles are 10 px wide strips on the sides and squares on the corners; the south-east corner shows a small triangle on hover.

```css
gridster-item:hover .gridster-item-resizable-handler.handle-se {
  border-color: transparent transparent #2196f3;
}
```

## Animations

Items animate position and size changes with `transition: .3s`, turned off while they are dragged or resized. To remove the animation:

```css
gridster-item {
  transition: none;
}
```

## Positioning

With `useTransformPositioning: true` (default) items are placed with `transform: translate3d()`. A transformed element becomes the containing block of `position: fixed` descendants: fixed menus or dialogs inside an item stay inside it. Use an overlay attached to `<body>` (for example the Angular CDK overlay) or set `useTransformPositioning: false`, which places items with `top`/`left`.
