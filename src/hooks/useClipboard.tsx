import { useEffect, useRef, useState } from "react";

function useClipboard(resetTimeout = 2000) {
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const copyToClipboard = async (text: string) => {
        try {
            setError(null);
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setIsCopied(false);
            }, resetTimeout);
        } catch(err) {
            setError((err as Error).message)
            setIsCopied(false);
        }

    }

    return { copyToClipboard, isCopied, error };
}

function UseApp() {
    const { copyToClipboard, isCopied, error } = useClipboard();
    const [text, setText] = useState("Hello, World!!");

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                style={{width: "300px"}}
            />
            <button onClick={() => copyToClipboard(text)}>
                {isCopied ? "Copied!" : "Copy to Clipboard"}
            </button>
            {error && <p style={{color: "red"}}>Failed to copy: {error}</p>}

            <div style={{marginTop: "20px"}}>
                <p>Try pasting the copied text here</p>
                <textarea name="" id="" style={{width: "300px", height: "100px"}}/>
            </div>
        </div>
    );
}

export default UseApp;
