import { useEffect, useState } from 'react'

const StateWatcher = () => {
    const [count, setCount] = useState(0);
    const [changeCount, setChanageCount] = useState(0);
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        if(count === 0) return;

        setChanageCount((prev) => prev + 1);
        const timestamp = new Date().toLocaleTimeString();
        setHistory(prev => [...prev, `${timestamp}: ${count}`]);
        if(count % 5 === 0) {
            alert("5の倍数です。");
        }
    }, [count]);
    return (
        <>
            <div>
                <h2>状態変化の監視</h2>
                <p>カウント : {count}</p>
                <p>変更回数 : {changeCount}</p>

                <button onClick={() => setCount(prev => prev + 1)}>+1</button>
                <button onClick={() => setCount(prev => prev - 1)}>-1</button>
                <button onClick={() => setCount(prev => prev + 5)}>+5</button>
            </div>
            <div>
                <h3>履歴 : </h3>
                {history.length === 0 ? (
                    <p>変更履歴はありません。</p>
                ) : (
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                )}
            </div>
        </>
    );
}

export default StateWatcher