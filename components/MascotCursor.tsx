'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MascotCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    // Track if device has a fine pointer (mouse) vs coarse (touch/mobile)
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Only enable on devices that have a real mouse cursor to avoid mobile touch bugs
        const mediaQuery = window.matchMedia('(pointer: fine)');
        setIsDesktop(mediaQuery.matches);

        if (!mediaQuery.matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    if (!isDesktop) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[100]"
            animate={{
                x: mousePosition.x + 20, // Offset 20px to the right of cursor
                y: mousePosition.y + 20, // Offset 20px below cursor
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
            }}
            transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.5,
                opacity: { duration: 0.2 }
            }}
        >
            <div className="relative w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <Image
                    src="/images/mascot-cursor.png"
                    alt="Puss x Bongo Companion"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            {/* Subtle premium label */}
            <div className="absolute top-[110%] left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[8px] text-white/50 uppercase tracking-[0.2em] font-mono">
                Companion
            </div>
        </motion.div>
    );
}
