import React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const FruitList = () => {
    const [fruits] = useState([
         "りんご",
        "バナナ",
        "オレンジ",
        "ぶどう",
        "いちご",
    ]);
    return (
        <div>
            <h2>果物リスト</h2>
            <ul>
                {fruits.map((f, i) => (
                    <li key={uuid()}>
                        <span>{i + 1}. </span>
                        <span>{f}</span>
                    </li>

                ))}
            </ul>
        </div>
    )
}

export default FruitList
