"use client";

import { useEffect, useRef, useState } from "react";

export default function SplitWords({ text = "", className, durationMs = 500, staggerMs = 80 }) {
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

  // Split into words but keep spaces by capturing them
  const tokens = String(text).split(/(\s+)/);

  return (
    <p ref={paragraphRef} className={`${className || ""} whitespace-pre-wrap`}>
      {tokens.map((token, index) => {
        const isSpace = /^\s+$/.test(token);
        if (isSpace) {
          return <span key={`space-${index}`}>{token}</span>;
        }
        return (
          <span
            key={`word-${index}`}
            className={`inline-block translate-y-2 opacity-0 transition-opacity ease-out ${
              isVisible ? "translate-y-0 opacity-100" : ""
            }`}
            style={{ transitionDelay: `${index * staggerMs}ms`, transitionDuration: `${durationMs}ms` }}
          >
            {token}
          </span>
        );
      })}
    </p>
  );
}


