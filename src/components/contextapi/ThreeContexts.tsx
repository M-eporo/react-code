import React, { createContext, useContext, useState} from 'react';
// count用のContext
const CountContext = createContext<number | undefined>(undefined);
// items用のContext
const ItemsContext = createContext<string[] | undefined>(undefined);

const SetCountContext = createContext<React.Dispatch<React.SetStateAction<number>> | undefined>(undefined);
const SetItemsContext = createContext<React.Dispatch<React.SetStateAction<string[]>> | undefined>(undefined);
const useCountContext = () => {
    const context = useContext(CountContext);
    if(!context) {
        throw new Error('');
    }
    return context;
}
const useItemsContext = () => {
    const context = useContext(ItemsContext);
    if(!context) {
        throw new Error('');
    }
    return context;
}
function useSetCount() {
    const context = useContext(SetCountContext);
    if(!context) {
        throw new Error('');
    }
    return context;
}
function useSetItems() {
    const context = useContext(SetItemsContext);
    if(!context) {
        throw new Error('');
    }
    return context;
}
function AppProvider({ children }: {children: React.ReactNode}) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<string[]>([]);

  return (
    // 3つのProviderでラップ
    <CountContext value={count}>
        <ItemsContext value={items}>
            <SetCountContext value={setCount}>
                <SetItemsContext value={setItems}>
                    {children}
                </SetItemsContext>
            </SetCountContext>
        </ItemsContext>
    </CountContext>
  );
}

const ItemList = () => {
  console.log('ItemList rendered');
    // contextから必要な値を取得
    const items = useItemsContext();
    const setItems = useSetItems();
    return (
        <div>
        <button onClick={() => setItems((prev) => [...prev, `Item ${Date.now()}`])}>Add Item</button>
        <ul>
            {items.map((item, index) => (
            <li key={index}>{item}</li>
            ))}
        </ul>
        </div>
    );
};

const Counter = () => {
    console.log('Counter rendered');
    // contextから必要な値を取得
    const count = useCountContext();
    const setCount = useSetCount();
    return (
        <div>
        <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
        </div>
    );
};

export default function ThreeContexts() {
  return (
    <AppProvider>
      <Counter />
      <ItemList />
    </AppProvider>
  );
}
