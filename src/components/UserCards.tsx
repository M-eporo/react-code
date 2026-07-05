import React from 'react'
import { useState } from 'react';
type User = {
    id: number;
    name: string;
    age: number;
    email: string;
};
const UserCards = () => {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: "田中太郎", age: 25, email: "tanaka@example.com" },
        { id: 2, name: "鈴木花子", age: 18, email: "suzuki@example.com" },
        { id: 3, name: "佐藤次郎", age: 65, email: "sato@example.com" },
        { id: 4, name: "高橋美咲", age: 32, email: "takahashi@example.com" },
    ]);

    const getAgeColor = (age: number) => {
        if (age < 20) {
            return 'lightblue';
        } else if (age >= 20 && age < 60) {
            return 'lightgreen';
        } else {
            return 'lightcoral';
        }
    }

    return (
        <div>
            <h2>ユーザー一覧</h2>
            <div className="user-cards">
                {users.map((user) => (
                    <div key={user.id} className="user-card">
                        <h3>
                            <span>{user.id}</span>
                            <span>{user.name}</span>
                        </h3>
                        <p style={{backgroundColor: getAgeColor(user.age)}}>
                            {user.age}</p>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserCards
