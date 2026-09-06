import { useEffect, useState } from "react";

const useDebounce = <T,>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return ()=> {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debouncedValue;
};

function useApp() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        if(debouncedSearchTerm) {
            console.log("Searching for:", debouncedSearchTerm);
            // ここでapi呼び出しなど
        }
    }, [debouncedSearchTerm]);

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
            <p>Input value: {searchTerm}</p>
            <p>Debounced value: {debouncedSearchTerm}</p>
        </div>
    );
}

export default useApp;
