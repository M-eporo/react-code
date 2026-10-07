import React, { createContext, useContext, useState } from "react";
type Language = 'ja' | 'en';
type LanguageContextType = {
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
};
type ProviderProps = {
    children: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType>(
    {
        language: 'en',
        setLanguage: () => {}
    }
);

function App() {

    return (
        <div>
            <OutsideProvider />
            <LanguageProvider>
                <InsideProvider />
            </LanguageProvider>
        </div>
    )
}

function OutsideProvider() {
    const { language } = useContext(LanguageContext);
    return (
        <p>Outside: {language}</p>
    );
}

function InsideProvider() {
    const { language } = useContext(LanguageContext);
    return (
        <p>Inside: {language}</p>
    );
}

function LanguageProvider({ children }: ProviderProps) {
    const [language, setLanguage] = useState<Language>('ja');
    return (
        <LanguageContext value={{language, setLanguage}}>
            {children}
        </LanguageContext>
    );
}

export default App;
