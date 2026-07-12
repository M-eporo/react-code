import { useEffect, useState } from 'react'

const MountEffect = () => {
    const [msg, setMsg] = useState("");
    
    useEffect(() => {
        
        console.log("this page is Mounted");
        setMsg("This is MountEffect page");
        document.title = "React Challenge";

        return () => {
            console.log("unmounted");
        };
    }, []);

    return (
        <div>
            <p>メッセージ{msg}</p>
        </div>
    )
}

export default MountEffect