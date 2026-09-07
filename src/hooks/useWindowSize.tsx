import { useEffect, useState } from "react";

type WindowSize = {
    width: number;
    height: number;
};
type UseWindowSizeReturn = WindowSize;

function useWindow(): UseWindowSizeReturn{
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        let timeoutId: number;
        const handleResize = () => {
            timeoutId = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, 300);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return windowSize;
}

function useApp() {
    const { width, height } = useWindow();

    return (
    <div>
        <h2>Window Size Monitor</h2>
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
        <div
            style={{
            width: "100px",
            height: "100px",
            background: width > 768 ? "green" : "red",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            {width > 768 ? "Desktop" : "Mobile"}
        </div>
    </div>
  );
}

export default useApp;
