import { useState } from "react";
import Item from "./Item";
import FuncButton from "./FuncButton";
export default function PackingList({
  items,
  setItems,
  onToggleItem,
  onDeleteItem,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItem;
  if (sortBy === "input") sortedItem = items;
  if (sortBy === "description")
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            item={item}
            setItems={setItems}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
            key={item.id}
          />
        ))}
      </ul>
      <FuncButton
        setItems={setItems}
        items={items}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
}
