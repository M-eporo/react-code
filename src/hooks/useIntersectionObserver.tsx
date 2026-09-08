import { useEffect, useRef, useState } from "react";

type IntersectionObserverOptions = {
    threshold?: number | number [];
    root?: Element | null;
    rootMargin?: string;
}

const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);


    useEffect(() => {
        const elem = ref.current;
        if(!elem) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting) {
                    setIsIntersecting(true);
                    observer.unobserve(elem);
                }
            },
            {
                threshold: options.threshold ?? 0,
                root: options.root ?? null,
                rootMargin: options.rootMargin ?? "0px"
            }
        );
        observer.observe(elem);
        return () => {
            observer.disconnect();
        }
    }, [options])
    return {
        ref,
        isIntersecting
    }
}
type LazyImageProps = {
    src: string;
    alt: string;
}
function LazyImage({ src, alt }: LazyImageProps) {
    const { ref, isIntersecting } = useIntersectionObserver({
        threshold: 0.1
    });

    return (
        <div ref={ref} style={{ minHeight: "200px", background: "#f0f0f0" }}>
            {isIntersecting ? (
                <img src={src} alt={alt} style={{ width: "100%" }} />
            ) : (
                <p>Scroll to load image...</p>
            )}
        </div>
    );
}

function UseApp() {
    return (
        <div>
            <h2>Lazy Loading Images</h2>
            <div style={{ height: "150vh" }}>
                <p>Scroll down to see images load</p>
            </div>
            <LazyImage
                src="https://picsum.photos/400/200?random=1"
                alt="Image 1"
            />
            <div style={{ height: "50vh" }} />
            <LazyImage
                src="https://picsum.photos/400/200?random=2"
                alt="Image 2"
            />
            <div style={{ height: "50vh" }} />
            <LazyImage
                src="https://picsum.photos/400/200?random=3"
                alt="Image 3"
            />
        </div>
    );
}

export default UseApp;
