import React, { useState } from 'react'

type FormType = {
    username: string;
    email: string;
    age: string;
}
const RegistrationForm = () => {
    const [formValue, setFormValue] = useState<FormType>({
        username: "",
        email: "",
        age: ""
    });
    const { username, email, age } = formValue;
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setFormValue({
            username: "",
            email: "",
            age: ""
        });
        setIsSubmitted(false);
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
            {/* 入力フィールドを配置 */}
                <label htmlFor="username">氏名
                <input type="text" name="username" value={username} onChange={handleChange} id="username" placeholder="氏名"/>
                </label>
                <label htmlFor="email">メールアドレス
                <input type="email" name="email" value={email} onChange={handleChange} id="email" placeholder="メールアドレス"/>
                </label>
                <label htmlFor="age">年齢
                <input type="text" name="age" value={age} onChange={handleChange} id="ageInput" placeholder="年齢"/>
                </label>
                <button type="submit">送信</button>
                <button onClick={handleReset}>リセット</button>
            </form>
            {/* 送信時に全ての値が表示される */}
            {isSubmitted && 
                <>
                <p>{formValue.username}</p>
                <p>{formValue.email}</p>
                <p>{formValue.age}</p>
                </>}
        </div>
    );
}

export default RegistrationForm