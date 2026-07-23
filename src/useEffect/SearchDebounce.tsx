import React, { useEffect, useState } from 'react'

const SearchDebounce = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [searchCount, setSearchCount] = useState(0);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    useEffect(() => {
        console.log('useEffect実行: inputValue = ', inputValue);
        setIsTyping(true);
        const timer = setTimeout(() => {
            console.log('クリーンアップ実行：タイマーをキャンセル');
            setSearchTerm(inputValue);
            setIsTyping(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [inputValue]);

    useEffect(() => {
        if(searchTerm) {
            setSearchCount((prev) => prev + 1);
            setSearchHistory((prev) => [searchTerm, ...prev])
        }
    }, [searchTerm]);
    return (
        <div>
            <h2>デバウンス検索</h2>
            <input type="text" value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="検索キーワードを入力..."
            />
            {isTyping && <span>入力中...</span>}

            <div>
                <p>検索キーワード: {searchTerm}</p>
                <p>検索実行回数: {searchCount}</p>
            </div>
            <div>
                <h3>検索履歴:</h3>
                <ul>
                    {searchHistory.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchDebounce