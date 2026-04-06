import { useState } from "react";
import { useEffect } from "react";
import Form from "./components/Form";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

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
