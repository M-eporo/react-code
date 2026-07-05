import { useState } from "react";
type Item = {
    id: number;
    title: string;
    description: string;
}
type ViewComponentProps = {
    items: Item[];
}
// 個別の表示コンポーネント
function CardView({ items }: ViewComponentProps) {
  return (
    <div className="card-view">
      {items.map((item) => (
        <div key={item.id} className="card">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function ListView({ items }: ViewComponentProps) {
  return (
    <ul className="list-view">
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.title}:</strong> {item.description}
        </li>
      ))}
    </ul>
  );
}

function GridView({ items }: ViewComponentProps) {
  return (
    <div className="grid-view">
      {items.map((item) => (
        <div key={item.id} className="grid-item">
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

type ViewMode = "card" | "list" | "grid";

function ViewModeSwitcher() {
  const [viewMode, setViewMode] = useState<ViewMode>("card"); // card, list, grid

  const items: Item[] = [
    { id: 1, title: "アイテム1", description: "説明1" },
    { id: 2, title: "アイテム2", description: "説明2" },
    { id: 3, title: "アイテム3", description: "説明3" },
  ];

  const renderContent = () => {
    // 各モードの表示を条件分岐
    switch (viewMode) {
      case "card":
        return <CardView items={items} />;
      case "list":
        return <ListView items={items} />;
      case "grid":
        return <GridView items={items} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>表示モード切り替え</h2>

      <div className="mode-selector">
        <button className={viewMode === "card" ? "active" : ""} onClick={() => setViewMode("card")}>カード</button>
        <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}>リスト</button>
        <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}>
          グリッド
        </button>
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default ViewModeSwitcher;
