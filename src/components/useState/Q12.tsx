import React, { useState } from 'react'

const TextInput = () => {
    const [inputText, setInputText] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleReset = () => {
        setInputText("");
    }
    return (
        <div>
            <input 
                type="text"
                value={inputText}
                onChange={handleChange}
                placeholder="ここに入力してください"
            />
            <p>入力内容: {inputText}</p>
            <p>文字数: {inputText.length}</p>
            <button onClick={handleReset}>クリア</button>
        </div>
    );
}

export default TextInput