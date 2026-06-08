import React, { useState } from 'react'
import { v4 as uuid } from "uuid";

type Todo = {
    id: string;
    title: string;
}

type Counter = {
    Enter: number;
    Escape: number;
    Space: number;
}
const Keyboard = () => {
    const [title, setTitle] = useState("");
    const [todo, setTodo] = useState<Todo[]>([]);
    const [counter, setCounter] = useState<Counter>({
        Enter: 0,
        Escape: 0,
        Space: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.code);
        console.log(e.key);
        if(e.key === "Enter" && title.trim() !== "") {
            e.preventDefault();
            setTodo([...todo, {
                id: uuid(),
                title
            }]);
            setCounter(prevCount => ({
                ...counter,
                Enter: prevCount.Enter + 1
            }));
        }
        if(e.key === "Escape") {
            setTitle("");
            setCounter(prevCount => ({
                ...counter,
                Escape: prevCount.Escape + 1
            }));
        }
        if(e.key === " ") {
            setCounter(prevCount => ({
                ...counter,
                Space: prevCount.Space + 1
            }));
        }
        if(e.ctrlKey && e.key === "z") {
            setTodo(prevItem => prevItem.slice(0, -1));
        }
    };
    return (
        <>
            <div>
                <label htmlFor="title"></label>
                <input type="text" id="title" name="title" placeholder="Enterで追加、Escでクリア、Ctrl+Zで削除" value={title} onChange={handleChange} onKeyDown={handleKeyDown} aria-labe="アイテム入力フィールド"/>
            </div>
            <ul>
                {todo.map((item) => (
                    <li key={item.id}>
                        {item.title}
                    </li>
                ))}
            </ul>
            <div>
                <p>Enter: {counter["Enter"]}</p>
                <p>Escape: {counter["Escape"]}</p>
                <p>Space: {counter["Space"]}</p>
            </div>
        </>
    )
}

export default Keyboard