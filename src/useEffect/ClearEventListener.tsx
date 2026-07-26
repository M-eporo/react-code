import React, { useEffect, useState } from 'react'
type WindowSize = {
    width: number;
    height: number;
}
const ClearEventListener = () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({width: 0, height: 0});
    const [scrollPosition, setScrollPosition] = useState(0);
    const [lastSaved, setLastSaved] = useState<string | null>(null);

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth, 
                height: window.innerHeight
            });
        };

        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.ctrlKey && e.key === "s") {
                e.preventDefault();
                setLastSaved(new Date().toLocaleString());
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("keydown", handleKeyDown);
        };
    });
    return (
        <div style={{minHeight: "150vh"}}>
            <h2>イベントリスナ―管理</h2>    
            <div className="info-panel">
                <p>
                    ウィンドゥサイズ: {windowSize.width} x {windowSize.height}
                </p>
                <p>スクロール位置: {scrollPosition}px</p>
                <p>最終保存: {lastSaved || "未保存"}</p>
                <p className="hint">Ctrl+Sで保存</p>
            </div>
            <div style={{marginTop: "100px"}}>
                <p>スクロールして位置を確認してください</p>
            </div>
        </div>
    )
}

export default ClearEventListener