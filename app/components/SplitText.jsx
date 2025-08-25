"use client";

import { useEffect, useRef, useState } from "react";

export default function SplitText({ text = "", className, durationMs = 500, staggerMs = 60 }) {
  const paragraphRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = paragraphRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { root: null, threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={paragraphRef} className={`${className || ""} whitespace-pre-wrap`}>
      {Array.from(text).map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={`inline-block translate-y-2 opacity-0 transition-opacity duration-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : ""
          }`}
          style={{ transitionDelay: `${index * staggerMs}ms`, transitionDuration: `${durationMs}ms` }}
        >
          {character}
        </span>
      ))}
    </p>
  );
}


