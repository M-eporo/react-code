import React, { useState } from 'react'

const EventInfo = () => {
    const [position, setPosition] = useState({
        x: 0, y: 0
    });
    const [count, setCount] = useState(0);
    const [bgColor, setBgColor] = useState({
        r: 255, g: 255, b: 255
    });
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setPosition({x: e.clientX, y: e.clientY});
        setCount(prev => prev + 1);
        if(e.shiftKey) {
            // setBgColor(bgColor === "white" ? "lightblue" : "white");
            setBgColor({r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255});
        }
        console.log(e);
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        alert("右クリックは禁止しております。");
    };

    const handleDoubleClick = () => {
        setCount(0);
        alert("カウンターがリセットされました。");
    };

    return (
        <div style={{
            height: '300px',
            backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
            position: 'relative',
            border: '1px solid #000'
        }}
         onClick={handleClick}
         onContextMenu={handleContextMenu}
         onDoubleClick={handleDoubleClick}
        >
            <p>クリック位置 : {position.x}, {position.y}</p>
            <p>カウンター : {count}</p>
            <p>Shiftキーを押しながらクリックで色が変わります。</p>
        </div>
    );
};

export default EventInfo