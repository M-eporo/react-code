import React, { createContext, useContext, useState } from 'react';
type Theme = 'light' | 'dark';
type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};
type ThemeProviderProps = {
    children: React.ReactNode;
};
// ThemeContextを作成
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
function ThemeProvider({ children }: ThemeProviderProps) {
    // テーマ状態とトグル関数を実装
    const [theme, setTheme] = useState<Theme>("light");
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }
    return (
        // Providerで値を提供
        <ThemeContext value={{theme, toggleTheme}}>
            {children}
        </ThemeContext>
    );
}

// カスタムフックを作成
function useTheme() {
  // Contextの値を取得して返す
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

function App() {
  return (
    <ThemeProvider>
        <ThemeContent />
    </ThemeProvider>
  );
}
function ThemeContent() {
    // useThemeフックでテーマを取得
    const { theme } = useTheme();
    return (
        <div className={`theme-container ${theme}`}>
        <div className="theme-content">
            <Header />
            <ThemeToggle />
        </div>
        </div>
    );
}
function Header() {
  // useThemeフックでテーマを取得
  const { theme } = useTheme();
  return <h1>Current theme: {theme}</h1>;
}

function ThemeToggle() {
    // useThemeフックでトグル関数を取得
    const { theme, toggleTheme } = useTheme();
    return (
        <button className={`theme-toggle-btn ${theme}`} onClick={toggleTheme}>
            <span className="theme-icon">
                {theme === 'light' ? '🌞' : '🌜'}
            </span>
            Toggle Theme
        </button>
    )
}

export default App;
