import React, { useEffect, useState } from 'react';
type UserSettings = {
    theme: "light" | "dark" | "auto";
    fontSize: "small" | "medium" | "large";
    language: "ja" | "en" | "kr";
    notifications: boolean;
};

const isTheme = (value: unknown): value is UserSettings['theme'] => {
    return (
        value === "light" || 
        value === "dark" || 
        value === "auto"
    );
};

const isFontSize = (value: unknown): value is UserSettings['fontSize'] => {
    return (
        value === 'small' ||
        value === 'medium' ||
        value === 'large'
    );
};

const isLanguage = (value: unknown): value is UserSettings['language'] => {
    return (
        value === 'ja' ||
        value === 'en' ||
        value === 'kr'
    );
};

const isUserSettings = (value: unknown): value is UserSettings => {
    if(typeof value !== 'object' || value === null) {
        return false;
    }
    return (
        'theme' in value &&
        isTheme(value.theme) &&
        'fontSize' in value &&
        isFontSize(value.fontSize) &&
        'language' in value &&
        isLanguage(value.language) &&
        'notifications' in value &&
        typeof value.notifications === 'boolean'
    );
};

const UserSettings02 = () => {
    const [userSettings, setUserSettings] = useState<UserSettings>({
        theme: "light",
        fontSize: "medium",
        language: "ja",
        notifications: true
    });

    const resetUserSettings = () => {
        setUserSettings({
            theme: "light",
            fontSize: "medium",
            language: "ja",
            notifications: true
        });
    };

    const updatingSetting = <K extends keyof UserSettings>
    (
        name: K,
        value: UserSettings[K]
    ) => {
        setUserSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const storagedSettings = localStorage.getItem('user_settings');
        if(!storagedSettings) return;

        try {
            const parsedSettings = JSON.parse(storagedSettings);
            if(isUserSettings(parsedSettings)) {
                setUserSettings(prev => ({
                    ...prev,
                    ...parsedSettings
                }));
            }
        } catch {
            console.error('Error');
        }
    }, []);

    useEffect(() => {
        const jsoned = JSON.stringify(userSettings, null, 2);
        localStorage.setItem('user_settings', jsoned);
    }, [userSettings]);

    return (
        <div>
            <div>
                <label htmlFor="">
                    テーマ: 
                    <select
                        value={userSettings.theme}
                        onChange={(e) => {
                            const value = e.target.value;
                            if(isTheme(value)) {
                                updatingSetting("theme", value);
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
                    フォントサイズ: 
                    <select
                        value={userSettings.fontSize}
                        onChange={(e) => {
                            const value = e.target.value;
                            if(isFontSize(value)) {
                                updatingSetting("fontSize", value);
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
                    言語: 
                    <select
                        value={userSettings.language}
                        onChange={(e) => {
                            const value = e.target.value;
                            if(isLanguage(value)) {
                                updatingSetting("language", value);
                            }
                        }}
                    >
                        <option value="ja">日本語</option>
                        <option value="en">英語</option>
                        <option value="kr">韓国語</option>
                    </select>
                </label>
            </div>
            <div>
                <label htmlFor="">
                    通知: 
                    <input type="checkbox" 
                        checked={userSettings.notifications} 
                        onChange={(e) => updatingSetting("notifications", e.target.checked)} 
                    />
                </label>
            </div>
            <button onClick={resetUserSettings}>リセット</button>
        </div>
    );
};

export default UserSettings02