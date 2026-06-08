import React from 'react'

const EmbeddedJs:React.FC = () => {
    const name = 'React';
    const age = 41;
    const currentYear = new Date().getFullYear();
  return (
    <>
        <p>「私は{name}です。{age}歳です。今年は{currentYear}年です。」の形式で表示</p>
    </>
  )
}

export default EmbeddedJs