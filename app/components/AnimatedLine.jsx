"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedLine() {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.2 });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-[1px] overflow-hidden">
            <div className={`w-full h-full bg-zinc-400 transition-transform duration-700 ease-out will-change-transform ${isVisible ? "translate-x-0" : "translate-x-[-100%]"}`}></div>
        </div>
    );
}