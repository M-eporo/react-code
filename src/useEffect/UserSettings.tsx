import { useState, useEffect } from 'react';

type UserSettings = {
    theme: "light" | "dark" | "auto";
    fontSize: "small" | "medium" | "large";
    language: "ja" | "en" | "cn";
    notifications: boolean;
};

const isTheme = (value: string): value is UserSettings['theme'] => {
    return value === 'light' || value === 'dark' || value === 'auto';
};

const isFontSize = (value: string): value is UserSettings['fontSize'] => {
    return value === 'small' || value === 'medium' || value === 'large';
};

const isLanguage = (value: string): value is UserSettings['language'] => {
    return value === 'ja' || value === 'en' || value === 'cn';
};

const UserSettings = () => {
    const [settings, setSettings] = useState({
        theme: "light",
        fontSize: "mediuem",
        language: "ja",
        notifications: true,
    });

    const [isInitialized, setIsInitialized] = useState(false);

    const updatingSettings = <K extends keyof UserSettings>
        (
            name: K,
            value: UserSettings[K]
        ) => {
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
        setIsInitialized(false);
    };

    const resetSettings = () => {
        setSettings({
            theme: "light",
            fontSize: "mediuem",
            language: "ja",
            notifications: true,
        });
        setIsInitialized(true);
        localStorage.removeItem('userSettings');
    };

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        const json = JSON.stringify(settings, null, 2);
        localStorage.setItem('userSettings', json);
    }, [settings]);

    return (
        <div>
            <h2>ユーザー設定</h2>
            <div>
                <label htmlFor="">
                    テーマ : 
                    <select 
                        value={settings.theme} 
                        onChange={(e) => {
                            const value = e.target.value;
                            if(isTheme(value)) {
                                updatingSettings("theme", value);
                            }
                        }}
                    name="" id="">
                        <option value="light">ライト</option>
                        <option value="dark">ダーク</option>
                        <option value="auto">自動</option>
                    </select>
                </label>
            </div>
            <div>
                <label htmlFor="">
                    フォントサイズ : 
                    <select
                        value={settings.fontSize}
                        onChange={(e) => {
                            const value = e.target.value;
                            if(isFontSize(value)) {
                                updatingSettings("fontSize", value);
                            }
                        }}
                    name="" id="">
                        <option value="small">小</option>
                        <option value="medium">中</option>
                        <option value="large">大</option>
                        </select>
                </label>
            </div>
            <div>
                <label htmlFor="">
                    言語 : 
                    <select 
                        value={settings.language}
                        onChange={(e) => {
                            const value = e.target.value;
                            if(isLanguage(value)) {
                                updatingSettings("language", value);
                            }
                        }}
                    name="" id="">
                            <option value="ja">日本語</option>
                            <option value="en">英語</option>
                            <option value="cn">中国語</option>
                    </select>
                </label>
            </div>
            <div>
                <label htmlFor="">
                    通知を有効にする
                    <input type="checkbox" 
                    checked={settings.notifications} 
                    onChange={(e) => updatingSettings("notifications", e.target.checked)}
                    />
                </label>
            </div>
            <button onClick={resetSettings}>設定をリセット</button>
        </div>
    )
}

export default UserSettings