import { useRef, useEffect } from "react";
import { useListData } from "@react-stately/data";
import { Button, TextField } from "@react-spectrum/s2";
import { GridList, GridListItem, useDragAndDrop } from "react-aria-components";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import MoveIcon from "@react-spectrum/s2/icons/Move";

interface Item {
  id: string;
  name: string;
}

const Component = () => {
  const list = useListData<Item>({
    initialItems: [
      { id: "1", name: "Item One 1" },
      { id: "2", name: "Item Two 2" },
      { id: "3", name: "Item Three 3" },
    ],
  });

  const gridListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridListRef.current;

    if (!el) return;

    const onDragStart = (e: DragEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (!target?.closest("[data-drag-handle]")) {
        e.preventDefault();
      }
    };

    el.addEventListener("dragstart", onDragStart, true);
    return () => {
      el.removeEventListener("dragstart", onDragStart, true);
    };
  }, []);

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) => [...keys].map((key) => ({ "text/plain": String(key) })),
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys);
      }
    },
  });

  return (
    <GridList
      ref={gridListRef}
      aria-label="GridList"
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
      className={style({ display: "flex", flexDirection: "column", gap: 16 })}
    >
      {(item: Item) => (
        <GridListItem
          aria-label="GridListItem"
          id={item.id}
          textValue={item.name}
          className={style({ display: "flex", gap: 8 })}
        >
          {/* slot="drag" enables keyboard-accessible reordering but breaks mouse drag with the dragstart listener above. */}
          <Button slot="drag" data-drag-handle>
            <MoveIcon />
          </Button>
          <TextField
            aria-label="TextField"
            value={item.name}
            onChange={(value: string) =>
              list.update(item.id, { ...item, name: value })
            }
          />
        </GridListItem>
      )}
    </GridList>
  );
};

export { Component };
