import { Activity, useState } from 'react'

const ActivitySidebar = () => {
    const [isShowingSlider, setIsShowingSlider] = useState(true);
    return (
        <div style={{display: "flex", margin: "0 auto"}}>
            <Activity mode={isShowingSlider ? 'visible' : 'hidden'}>
                <Sidebar/>
            </Activity>
            <main style={{maxWidth: "700px", width: "500px", backgroundColor: "#333"}}>
                <button onClick={() => setIsShowingSlider(!isShowingSlider)}>
                    Toggle Sidebar
                </button>
                <h1>Main Content</h1>
            </main>
        </div>
    )
}

export default ActivitySidebar

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <nav style={{minWidth: "150px", height: "70vh", backgroundColor: "#f0f0f0"}}>
            <button onClick={() => setIsExpanded(!isExpanded)}>
                OvewView
                <span className={`indicator ${isExpanded ? 'down' : 'right'}`}>
                    &#9650;
                </span>
            </button>

            {isExpanded && (
                <ul style={{color: "#333"}}>
                    <li>Section 1</li>
                    <li>Section 2</li>
                    <li>Section 3</li>
                </ul>
            )}
        </nav>
    )
}
