import { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
    const increment = () => {
        // 直前の直前の state に応じて更新する場合は関数形式
        setCount(prev => prev + 1);
    };
    const decrement = () => {
        setCount(prev => prev - 1);
    };
    const reset = () => {
        setCount(0);
    }
  return (
    <div>
        <h2>カウンター: {count}</h2>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>リセット</button>
    </div>
  )
}

export default Counter