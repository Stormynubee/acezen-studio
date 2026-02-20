'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [mode, setMode] = useState<1 | 2 | 3>(1);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Raw mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth springs for trailing elements
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const fluidConfig = { damping: 40, stiffness: 100, mass: 1 };
    const fluidX = useSpring(mouseX, fluidConfig);
    const fluidY = useSpring(mouseY, fluidConfig);

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
            {/* The Custom Cursors */}
            {isVisible && (
                <>
                    {/* Mode 1: Inverted Halo */}
                    {mode === 1 && (
                        <motion.div
                            className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-white pointer-events-none z-[9999] mix-blend-difference"
                            style={{
                                x: springX,
                                y: springY,
                                translateX: '-50%',
                                translateY: '-50%',
                            }}
                        />
                    )}

                    {/* Mode 2: Magnetic Dot */}
                    {mode === 2 && (
                        <>
                            {/* Inner Dot */}
                            <motion.div
                                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[10000]"
                                style={{
                                    x: mouseX,
                                    y: mouseY,
                                    translateX: '-50%',
                                    translateY: '-50%',
                                }}
                            />
                            {/* Outer Trailing Circle */}
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

                    {/* Mode 3: Fluid Trail */}
                    {mode === 3 && (
                        <>
                            {/* Leading Dot */}
                            <motion.div
                                className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white pointer-events-none z-[10000]"
                                style={{
                                    x: mouseX,
                                    y: mouseY,
                                    translateX: '-50%',
                                    translateY: '-50%',
                                }}
                            />
                            {/* Fluid Blob */}
                            <motion.div
                                className="fixed top-0 left-0 w-12 h-12 rounded-full bg-white/20 blur-md pointer-events-none z-[9999]"
                                style={{
                                    x: fluidX,
                                    y: fluidY,
                                    translateX: '-50%',
                                    translateY: '-50%',
                                }}
                            />
                        </>
                    )}
                </>
            )}

            {/* Floating Selection UI (Only for demo purposes, hidden from mobile) */}
            <div className="fixed bottom-6 left-6 z-[100000] flex flex-col gap-2 pointer-events-auto">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold drop-shadow-md">
                    Cursor Demo
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setMode(1)}
                        className={`px-4 py-2 text-xs rounded-full border transition-all ${mode === 1 ? 'border-white text-zinc-900 bg-white' : 'border-white/20 text-white/70 bg-black/80 hover:bg-white/10 backdrop-blur-md'}`}
                    >
                        Halo
                    </button>
                    <button
                        onClick={() => setMode(2)}
                        className={`px-4 py-2 text-xs rounded-full border transition-all ${mode === 2 ? 'border-white text-zinc-900 bg-white' : 'border-white/20 text-white/70 bg-black/80 hover:bg-white/10 backdrop-blur-md'}`}
                    >
                        Dot
                    </button>
                    <button
                        onClick={() => setMode(3)}
                        className={`px-4 py-2 text-xs rounded-full border transition-all ${mode === 3 ? 'border-white text-zinc-900 bg-white' : 'border-white/20 text-white/70 bg-black/80 hover:bg-white/10 backdrop-blur-md'}`}
                    >
                        Fluid
                    </button>
                </div>
            </div>
        </>
    );
}
