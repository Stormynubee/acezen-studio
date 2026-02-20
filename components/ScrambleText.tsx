'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export default function ScrambleText({ text, as: Component = 'span', className = '', speed = 50 }: { text: string, as?: any, className?: string, speed?: number }) {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const isScrambling = useRef(false);

    useEffect(() => {
        if (!isInView || isScrambling.current) return;

        isScrambling.current = true;
        let iteration = 0;

        const interval = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return text[index];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, speed);

        return () => clearInterval(interval);
    }, [isInView, text, speed]);

    return (
        <Component ref={ref} className={className}>
            {displayText}
        </Component>
    );
}
