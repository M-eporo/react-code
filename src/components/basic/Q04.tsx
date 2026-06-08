import React from 'react'
import '../../App.css'
const Box: React.FC = () => {

    const boxStyle = {
        backgroundColor: "#f0f0f0", 
        padding: "20px", 
        border: "2px solid #333", 
        borderRadius: "8px"
    };
  return (
    <>
        <div style={{
            backgroundColor: "#f0f0f0", 
            padding: "20px", 
            border: "2px solid #333", 
            borderRadius: "8px"
        }}>
        </div>
        <div style={boxStyle}></div>
        <div className="custom-box"></div>
    </>
  )
}

export default Box