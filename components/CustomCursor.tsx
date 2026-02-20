'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Raw mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth springs for trailing element
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const mq = window.matchMedia('(pointer: fine)');
        setIsDesktop(mq.matches);
        if (!mq.matches) return;

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        // Hide default cursor
        document.body.style.cursor = 'none';

        // Fix cursor globally on all elements that might override it
        const style = document.createElement('style');
        style.innerHTML = `
            * { cursor: none !important; }
            button:hover, a:hover { cursor: none !important; }
        `;
        document.head.appendChild(style);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.body.style.cursor = 'auto';
            document.head.removeChild(style);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isDesktop) return null;

    return (
        <>
            {isVisible && (
                <>
                    {/* Inner Primary Dot */}
                    <motion.div
                        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[10000]"
                        style={{
                            x: mouseX,
                            y: mouseY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    />
                    {/* Outer Trailing Magnetic Circle */}
                    <motion.div
                        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 pointer-events-none z-[9999]"
                        style={{
                            x: springX,
                            y: springY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    />
                </>
            )}
        </>
    );
}
