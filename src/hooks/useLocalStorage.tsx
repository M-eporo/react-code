import { useState } from "react";
type useLocalStorageType<T> = [T, (value: T) => void, () => void];

const useLocalStorage = <T,>(key: string, initialValue: T): useLocalStorageType<T> => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key ${key} : `, error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch(error) {
            console.error(`Error reading localStorage key ${key} : `, error);
        }
    };

    const removeValue = () => {
        try {
            setStoredValue(initialValue);
            localStorage.removeItem(key);
        } catch(error) {
            console.error(`Error removing localStorage key ${key} : `, error);
        }
    };

    return [ storedValue, setValue, removeValue ];
};

function App() {
  const [name, setName, removeName] = useLocalStorage<string>("userName", "");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Stored name: {name}</p>
      <button onClick={removeName}>Clear Storage</button>
    </div>
  );
}

export default App
