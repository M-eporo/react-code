import React, { createContext, useContext, useState } from "react"

type CountContextType = {
    count: number;
    increment: () => void;
};
type UserContextType = {
    name: string;
    setUser: React.Dispatch<React.SetStateAction<{
    name: string;
}>>
}
const CountContext = createContext<CountContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);
const useUserContext = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("");
    }
    return context;
};
const useCounterContext = () => {
    const context = useContext(CountContext);
    if(!context) {
        throw new Error("");
    }
    return context;
};

const CountProvider = ({ children }: { children: React.ReactNode }) => {
    const [count, setCount] = useState(0);
    const value = {
        count,
        increment: () => setCount((prev) => prev + 1),
    };
    return (
        <CountContext value={value}>
            {children}
        </CountContext>
    );
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState({ name: 'Jonh' });
    const value = {
        name: user.name,
        setUser
    };
    return (
        <UserContext value={value}>
            {children}
        </UserContext>
    );
};

const UserInfo = () => {
    console.log('UserInfo rendered');
    const { name, setUser } = useUserContext();
    return <div>User: {name}</div>
}

const Counter = () => {
    console.log('Counter Rendered');
    const { count, increment } = useCounterContext();
    return (
        <div>
            Count: {count}
            <button onClick={increment}>+</button>
        </div>
    )
}

function OptimizeContext() {
    return (
        <UserProvider>
            <CountProvider>
                <UserInfo />
                <Counter />
            </CountProvider>
        </UserProvider>
    )
}

export default OptimizeContext
