import React, { useState } from 'react'

const LoginStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("Guest");

    const handleLoggedIn = () => {
        setUserName("Tanaka");
        setIsLoggedIn(true);
    };

    const handleLoggedOut = () => {
        setUserName("Guest");
        setIsLoggedIn(false);
    }
    return (
        <div>
            <h2>ログイン状態管理</h2>
            {isLoggedIn && 
            <div>
                <p>{userName}</p>
                <button onClick={handleLoggedOut}>ログアウト</button>
            </div>
            }
            {!isLoggedIn && 
            <div>
                <button onClick={handleLoggedIn}>ログイン</button>
            </div>
            }
        </div>
    )
}

export default LoginStatus