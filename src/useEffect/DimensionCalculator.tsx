import { useEffect, useState } from 'react';

type AspectRatio = "正方形" | "横長" | "縦長";

const DimensionCalculator = () => {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);
    const [area, setArea] = useState(0);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>("正方形");
    const [sizeHistory, setSizeHistory] = useState<string[]>([]);

    useEffect(() => {
        const newArea = width * height;
        setArea(newArea);
        setAspectRatio(() => {
            if(width === height) {
                return "正方形";
            } else if(width > height) {
                return "横長";
            } else {
                return "縦長";
            }
        });
        const timestamp = new Date().toLocaleTimeString();
        setSizeHistory((prev) => {
            const newHistory = [timestamp, ...prev];
            return newHistory.slice(0,5);
        });
        
    }, [
        width, height
    ]);
    return (
        <div>
            <h2>寸法計算機</h2>
            <div>
                <label htmlFor="">
                    幅 : 
                    <input type="number" 
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="">
                    幅 : 
                    <input type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <p>面積 : {area}</p>
                <p>形状 : {aspectRatio}</p>
            </div>
            <div>
                <h3>変更履歴</h3>
                <ul>
                    {sizeHistory.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DimensionCalculator