import { useRef } from "react"

export default function ScrollImage() {
    const firstCarRef = useRef<HTMLImageElement | null>(null);
    const secondCarRef = useRef<HTMLImageElement | null>(null);
    const thirdCarImage = useRef<HTMLImageElement | null>(null);

    function handleScrollToFirstCar() {
        firstCarRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    }
    function handleScrollToSecondCar() {
        secondCarRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    }
    function handleScrollToThirdCar() {
        thirdCarImage.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    }

    return (
        <>
            <nav>
                <button onClick={handleScrollToFirstCar}>Car01</button>
                <button onClick={handleScrollToSecondCar}>Car02</button>
                <button onClick={handleScrollToThirdCar}>Car03</button>
            </nav>
            <div style={{overflow: "hidden"}}>
                <ul style={{display: "flex", flexDirection: "row" }}>
                    <li style={{width: "100%", flexShrink: 0}}>
                        <img src="https://placecats.com/bella/199/200" ref={firstCarRef} alt="" />
                    </li>
                    <li style={{width: "100%", flexShrink: 0}}>
                        <img src="https://placecats.com/bella/199/200" ref={secondCarRef} alt="" />
                    </li>
                    <li  style={{width: "100%", flexShrink: 0}}>
                        <img src="https://placecats.com/bella/199/200" ref={thirdCarImage} alt="" />
                    </li>
                </ul>
            </div>
        </>
    );
}
