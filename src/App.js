import { useState } from "react";
import { useEffect } from "react";
// const initialItems = [
//   { id: 1, name: "item1", quantity: 1, packed: false },
//   { id: 2, name: "item2", quantity: 1, packed: false },
//   { id: 3, name: "item3", quantity: 1, packed: false },
// ];
export default function App() {
  //get saved items data from local storage
  const [items, setItems] = useState(() => {
    const storageItems = localStorage.getItem("items");
    return storageItems ? JSON.parse(storageItems) : [];
  });

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  //save items to local storage when items update each time
  useEffect(
    () => localStorage.setItem("items", JSON.stringify(items)),
    [items],
  );
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        setItems={setItems}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />

      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>🏝 FAR AWAY 🧳</h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleAddItem(e) {
    e.preventDefault();

    if (!description.trim()) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    console.log(newItem);

    onAddItems(newItem);

    setQuantity(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleAddItem}>
      <h3>What do you need for your 😊 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddItem}>Add</button>
    </form>
  );
}

function PackingList({ items, setItems, onToggleItem, onDeleteItem }) {
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

function Item({ item, onToggleItem, onDeleteItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function FuncButton({ setItems, sortBy, setSortBy }) {
  return (
    <div className="actions">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value={"input"}>SORT BY INPUT ORDER</option>
        <option value={"description"}>SORT BY DESCRIPTION</option>
        <option value={"packed"}>SORT BY PACKED STATUS</option>
      </select>
      <button onClick={() => setItems([])}>CLEAR LIST</button>
    </div>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  const numItems = items.length;
  function handleItemCount() {
    return numItems === 0 || numItems === 1 ? "item" : "items";
  }
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / items.length) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `🧳 You have ${numItems} ${handleItemCount()} on your list, and you
        already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
