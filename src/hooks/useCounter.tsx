import { useState } from "react";
type UseCounterReturnType = {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
};
// type CounterType = ReturnType<typeof useCounter>

export const useCounter = (): UseCounterReturnType => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(prev => prev + 1);
    };
    const decrement = () => {
        setCount(prev => prev - 1);
    };
    const reset = () => {
        setCount(0);
    };

    return { count, increment, decrement, reset };
}
