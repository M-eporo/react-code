import React, { useState } from 'react'

const ToggleSwitch = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const handleClick = () => {
        setIsActive(prevState => !prevState);
    };
    return (
        <div>
            <button 
                style={{
                // 状態に応じたスタイル
                    backgroundColor: isActive ? "green" : "red" 
                }}
                // クリックイベントを設定
                onClick={handleClick}
            >
                {/* 状態に応じたテキスト */}
                {isActive ? "ON" : "OFF"}
            </button>
            <p>現在の状態: {isActive ? "アクティブ" : "非アクティブ"}</p>
        </div>
    )
}

export default ToggleSwitch