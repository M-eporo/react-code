import { useState, useEffect } from 'react';

type UserSettings = {
    theme: "light" | "dark" | "auto";
    fontSize: "small" | "medium" | "large";
    language: "ja" | "en" | "cn";
    notifications: boolean;
};

const STORAGE_KEY = 'userSettings';

const isTheme = (value: unknown): value is UserSettings['theme'] => {
    return value === 'light' || value === 'dark' || value === 'auto';
};

const isFontSize = (value: unknown): value is UserSettings['fontSize'] => {
    return value === 'small' || value === 'medium' || value === 'large';
};

const isLanguage = (value: unknown): value is UserSettings['language'] => {
    return value === 'ja' || value === 'en' || value === 'cn';
};

const isUserSettings = (
    value: unknown
): value is UserSettings => {
    if(typeof value !=="object" || value === null) return false;
    return (
        "theme" in value &&
        "fontSize" in value &&
        "language" in value &&
        "notifications" in value &&
        isTheme(value.theme) &&
        isFontSize(value.fontSize) &&
        isLanguage(value.language) && 
        typeof value.notifications === "boolean"
    );

}

const UserSettings = () => {
    const [settings, setSettings] = useState<UserSettings>({
        theme: "light",
        fontSize: "medium",
        language: "ja",
        notifications: true,
    });

    const updatingSettings = <K extends keyof UserSettings>
        (
            name: K,
            value: UserSettings[K]
        ) => {
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetSettings = () => {
        setSettings({
            theme: "light",
            fontSize: "medium",
            language: "ja",
            notifications: true,
        });
    };

    useEffect(() => {
        const storagedSettings = localStorage.getItem(STORAGE_KEY);
        if(!storagedSettings) {
            return;
        }

        try {
            const parsedSettings: unknown = JSON.parse(storagedSettings);

            if(isUserSettings(parsedSettings)) {
                setSettings((prev) => ({
                    ...prev,
                    ...parsedSettings
                }))
            }
        } catch {
            console.error('保尊されている設定が読み込めませんでした。');
        }
    }, []);

    useEffect(() => {
        const jsoned = JSON.stringify(settings, null, 2);
        localStorage.setItem(STORAGE_KEY, jsoned);
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
                    >
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
                    >
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
                    >
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