'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingContact() {
    const [isVisible, setIsVisible] = useState(false);

    // Only show the button after scrolling down a bit (e.g., past the hero)
    // and hide it when they are already near the bottom (the footer).
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.scrollHeight;

            // Show after scrolling past 1.5x the window height (around the Team section)
            const pastHero = scrollY > windowHeight * 1.5;
            // Hide when within 800px of the bottom (footer form is visible)
            const nearBottom = scrollY + windowHeight >= documentHeight - 800;

            setIsVisible(pastHero && !nearBottom);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToFooter = () => {
        const targetPosition = document.body.scrollHeight;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        // Adjust this duration (in ms) to control the speed. 3500ms = 3.5 seconds for a very slow glide.
        const duration = 3500;
        let start: number | null = null;

        // Cinematic Ease In Out Cubic easing function for super smooth acceleration and deceleration
        const easeInOutCubic = (t: number) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animation = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);

            window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    onClick={scrollToFooter}
                    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[40] group overflow-hidden rounded-full p-[1px]"
                    aria-label="Scroll to contact form"
                >
                    {/* Animated Border Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-500 via-white to-zinc-500 rounded-full animate-[spin_4s_linear_infinite]" />

                    {/* Inner Pill */}
                    <div className="relative px-6 py-3 bg-zinc-950/90 backdrop-blur-md rounded-full flex items-center gap-3 transition-colors duration-300 group-hover:bg-zinc-900/90">
                        {/* Dot indicator */}
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />

                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-white">
                            Start Project
                        </span>

                        {/* Arrow Icon */}
                        <motion.svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white transform transition-transform duration-300 group-hover:translate-y-1"
                        >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <polyline points="19 12 12 19 5 12"></polyline>
                        </motion.svg>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
