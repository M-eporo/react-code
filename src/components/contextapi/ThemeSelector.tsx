import React, { createContext, useContext, useEffect, useState } from 'react'
type ThemeName = 'light' | 'dark' | 'blue';
const themeName: ThemeName[] = ['light' , 'dark' , 'blue'];
function isTheme(value: string): value is ThemeName {
    return themeName.includes(value as ThemeName);
}
type Theme = {
    '--bg-color': string;
    '--text-color': string;
    '--primary-color': string;
};
type ThemeConfig = {[key in ThemeName]: Theme};
type ThemeContextType = {
    theme: ThemeName;
    setTheme: (theme: ThemeName) => void;
    themes: ThemeConfig
}
const themes: ThemeConfig = {
    light: {
        '--bg-color': '#ffffff',
        '--text-color': '#000000',
        '--primary-color': '#007bff'
    },
    dark: {
        '--bg-color': '#1a1a1a',
        '--text-color': '#ffffff',
        '--primary-color': '#4dabf7'
    },
    blue: {
        '--bg-color': '#e3f2fd',
        '--text-color': '#0d47a1',
        '--primary-color': '#2196f3'
    }
};

function useTheme() {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error('');
    }
    return context;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeName>(() => {
        const savedTheme = localStorage.getItem('theme') as ThemeName;
        return savedTheme || 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        const currentTheme = themes[theme];
        Object.entries(currentTheme).forEach(([keyframes, value]) => {
            root.style.setProperty(keyframes, value);
        })
        localStorage.setItem('theme', theme);
    }, [theme]);

    const contextValue: ThemeContextType = { theme, setTheme, themes };
    return (
        <ThemeContext value={contextValue}>
            {children}
        </ThemeContext>
    )
}
const ThemeSelector = () => {
    const { setTheme } = useTheme();
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(isTheme(e.target.value)) {
            setTheme(e.target.value);
        }
    }

    return (
        <div>
            <select onChange={handleChange} name="" id="">
                {Object.keys(themes).map((themeName) => (
                    <option key={themeName} value={themeName}>
                        {themeName}
                    </option>
                ))}
            </select>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <div
                style={{
                    backgroundColor: "var(--bg-color)",
                    color: "var(--text-color)",
                    minHeight: "100vh",
                    padding: "20px",
                    transition: "background-color 0.3s ease, color 0.3s"
                }}
            >
                <h1
                    style={{
                        color: "var(--primary-color)",
                        marginBottom: "30px",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                    }}
                >
                    テーマ切り替えシステム
                </h1>
                <ThemeSelector />
            </div>
        </ThemeProvider>
    )
}
export default App
