import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Dialog, DialogTitle } from '@mui/material';
type TodoType = {
    id: string,
    title: string,
    createdAt: Date;
    isDone: boolean;
}
const StateTodo = () => {
    const [title, setTitle] = useState("");
    const [todo, setTodo] = useState<TodoType[]>([]);
    const [deleteId, setDeleteId] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleClick = () => {
        setTodo([
            ...todo, {
                id: uuid(),
                title,
                createdAt: new Date(),
                isDone: false,
                
            }
        ]);
        setTitle("");
    };
    const handleIsDone = (id: string) => {
        setTodo(todo.map(item => {
            if(item.id === id) {
                return {
                    ...item,
                    isDone: !item.isDone
                };
            } else {
                return item;
            }
        }));
    };
    const handleDelete = (id: string) => {
        setDeleteId(id);
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleDialogClick = () => {
        setTodo(todo.filter((item => item.id !== deleteId)));
        setIsOpen(false);
    };
    return (
        <>
            <div>
                <label htmlFor="">タスク
                    <input type="text" name="title" value={title} onChange={handleTitleChange} />
                </label>
                <button type="button" onClick={handleClick}>追加</button>
            </div>
            <div>
                {todo.map((item) => (
                    <li key={item.id} >
                        <span style={{
                            textDecoration: item.isDone ? "line-through" : "none"
                        }}>
                            {item.title}
                        </span>
                        <button type="button" onClick={() => handleIsDone(item.id)}>済</button>
                        <button type="button" onClick={() => handleDelete(item.id)}>削除</button>
                    </li>  
                ))}
            </div>
            {isOpen ? (
                <Dialog open={isOpen} onClose={handleClose} >
                    <DialogTitle>削除しますか?</DialogTitle>
                    <button type="button" onClick={handleDialogClick}>OK</button>
                </Dialog>
            ) : null}
        </>
    );
}

export default StateTodo