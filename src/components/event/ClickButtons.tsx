import React, { useState } from 'react'

const ClickButtons = () => {
    const [lastClicked, setLastClicked] = useState("None");
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        alert(e.currentTarget.name);
        setLastClicked(e.currentTarget.name);
    }
  return (
    <div>
        <h3>Last Clicked: {lastClicked}</h3>
        <button name="btn1" onClick={handleClick}>BUtton1</button>
        <button name="btn2" onClick={handleClick}>BUtton2</button>
        <button name="btn3" onClick={handleClick}>BUtton3</button>
    </div>
  )
}

export default ClickButtons