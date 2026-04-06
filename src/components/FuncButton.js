export default function FuncButton({ setItems, sortBy, setSortBy }) {
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
