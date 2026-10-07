import cafeImage from "../assets/cafe.jpg";
import car01Image from "../assets/car01.jpg";
import car02Image from "../assets/car02.jpg";
import { useRef, useState } from 'react'
type Cat = {
    id: number;
    imageUrl: string;
}
const RefCallback = () => {
    const itemsRef = useRef<Map<Cat,HTMLLIElement>>(null);
    const [catList, setCatList] = useState<Array<Cat>>(setupCatList);
    console.log(catList);
    function scrollToCat(cat: Cat) {
        const map = getMap();
        const node = map?.get(cat);
        node?.scrollIntoView({
            behavior: 'smooth',
            block: "nearest",
            inline: "center",
        });
    }

    function getMap() {
        if(!itemsRef.current) {
            itemsRef.current = new Map();
        }
        return itemsRef.current;
    }
    return (
        <div>
            <nav>
                <button onClick={() => scrollToCat(catList[0])}>Neo</button>
                <button onClick={() => scrollToCat(catList[5])}>Neo</button>
                <button onClick={() => scrollToCat(catList[8])}>Neo</button>
            </nav>
            <div>
                <ul>
                    {catList.map((cat) => (
                        <li
                            key={cat.id}
                            ref={(node) => {
                                const map = getMap();
                                if(node) {
                                    map?.set(cat, node);
                                }
                                return () => {
                                    map?.delete(cat);
                                };
                            }}
                        >
                            <img src={cat.imageUrl} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

function setupCatList(): Array<Cat> {
    const catCount = 10;
    const catList = new Array(catCount);
    for(let i = 0; i < catCount; i++) {
        let imageUrl;
        if(i < 5) {
            imageUrl = cafeImage;
        } else if (i < 8) {
            imageUrl = car01Image;
        } else {
            imageUrl = car02Image;
        }
        catList[i] = {
            id: i,
            imageUrl,
        };
    }
    return catList;
}

export default RefCallback
