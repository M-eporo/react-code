import React, { useState } from 'react'
import { v4 as uuid } from "uuid";

type TodoType = {
    id: string;
    title: string;
    isDone: boolean
};

const TodoList = () => {
    const [todo, setTodo] = useState<TodoType[]>([]);
    const [title, setTitle] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleAddTodo = () => {
        if(title.trim() === "") return;
        setTodo([...todo,{
            id: uuid(),
            title: title.trim(),
            isDone: false,
        }]);
        setTitle("");
    };
    const handleDeleteTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setTodo(todo.filter((item) => item.id !== e.currentTarget.dataset.id));
    };
    return (
        <div>
            <h2>ToDoリスト ({todo.length}件)</h2>
            <input 
                type="text" name="todo" id="todo" placeholder="タスクを入力" onChange={handleChange} value={title}
            />
            <button onClick={handleAddTodo}>追加</button>
            {!todo.length ? (
                <p>タスクはありません。</p> 
            )   :   ( 
                <ul>
                    {todo.map((item) => (
                    <li key={item.id}>
                        <p>{item.title}</p>
                        <button onClick={e => handleDeleteTodo(e)} data-id={item.id}>削除</button>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodoList