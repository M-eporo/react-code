import { useState } from 'react';
 
function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
 
  const containerStyle = {
    backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#1a1a1a",
    minHeight: '200px',
    padding: '20px',
    transition: 'all 0.3s ease'
  };
 
  return (
    <div style={containerStyle}>
      <h2>
        {isDarkMode ? "🌙ダークモード" : "🌞ライトモード"}
      </h2>
 
      <p>
        現在のテーマ: {isDarkMode ? "ダーク": "ライト"}
      </p>
 
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          backgroundColor: isDarkMode ? "#4a4a4a": "#f0f0f0",
          color: isDarkMode ? "#ffffff" : "#000000",
          border: isDarkMode
            ? "1px solid #666666"
            : "1px solid #cccccc",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.3s ease"
        }}
      >
        {isDarkMode
            ? "ライトモードに切り替え"
            : "ダークモードに切り替え"}
      </button>
    </div>
  );
}
 
export default ThemeToggle;