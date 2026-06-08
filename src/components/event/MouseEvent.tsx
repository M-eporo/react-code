import React, { useState } from 'react'

const MouseEvent = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0});
    const [boxPos, setBoxPos] = useState({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({x: 0, y: 0});

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const handleMouseMove= (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const containerRect = e.currentTarget.getBoundingClientRect()
        setMousePos({ 
            x: Number((e.clientX - containerRect.left).toFixed()), 
            y: Number((e.clientY - containerRect.top).toFixed()) 
        });

        if(isDragging) {
            const newBoxPos = {
                x: e.clientX - containerRect.left - dragStart.x,
                y: e.clientY - containerRect.top - dragStart.y,
            }

            setBoxPos(newBoxPos);
        }
    };
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
        if(!parentRect) return;
        setIsDragging(true);
        setDragStart({
            x: e.clientX - parentRect.left - boxPos.x,
            y: e.clientY - parentRect.top - boxPos.y,
        })
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    
    
    return (
        <div style={{
            height: "400px", width: "400px",
            position: "relative", border: "1px solid #ccc",
            overflow: "hidden"
        }}
        onMouseMove={handleMouseMove}
        >
            <div style={{
                position: "absolute",
                left: boxPos.x,
                right: boxPos.y,
                width: "100px",
                height: "100px",
                backgroundColor: isHovered ? "lightblue" : "gray",
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
                transition: isHovered ? "all 0.4s" : "none"
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            >

            </div>
            <p>マウス座標: X={mousePos.x}, Y={mousePos.y}</p>
            <p>Box座標: X={boxPos.x} Y={boxPos.y}</p>
        </div>
    );
}

export default MouseEvent