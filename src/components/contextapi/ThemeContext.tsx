import React, { createContext, useContext, useState } from "react";

type Theme = 'light' | 'dark';
type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export default function App() {
    return (
        <ThemeProvider>
            <ThemeContent />
        </ThemeProvider>
    );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
    };
    return (
        <ThemeContext value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext>
    );
}

function ThemeContent() {
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
    const { theme } = useTheme();
    return <h1>Current Theme: {theme}</h1>
}

function ThemeToggle() {
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
