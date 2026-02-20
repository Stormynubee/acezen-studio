'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrolledPast, setScrolledPast] = useState(false);

    // Initial delay so it doesn't instantly appear over the splash screen
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    // Track scroll to hide when exactly reaching the "AboutTeam" section (approx 150vh down)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 1.5) {
                setScrolledPast(true);
            } else {
                setScrolledPast(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check init state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const shouldShow = isVisible && !scrolledPast;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldShow ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4 ${shouldShow ? '' : 'pointer-events-none'}`}
        >
            {/* Scroll Text Prompt */}
            <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Scroll To Explore
            </span>

            {/* Animated Vertical Track */}
            <div className="w-[1px] h-12 md:h-16 bg-white/10 relative overflow-hidden rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <motion.div
                    className="w-full h-1/3 bg-gradient-to-b from-transparent via-white to-transparent"
                    animate={{ y: ['-100%', '300%'] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'linear'
                    }}
                />
            </div>
        </motion.div>
    );
}
