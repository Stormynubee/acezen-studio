'use client';

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Magnetic from './Magnetic';

// Lightweight no-op stub — removes use-sound dependency (~15KB saved)
function useUISound() {
    return { playClick: () => {} };
}

export default function Navbar() {
    const [activeText, setActiveText] = useState('AceZen');
    const [activeTab, setActiveTab] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const { playClick } = useUISound();

    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // High-performance scroll tracking using Framer Motion (optimized API request frame)
        if (typeof window === 'undefined') return;

        const height = window.innerHeight;

        if (latest < height * 0.5) {
            setActiveText('AceZen');
            setActiveTab('');
            setIsScrolled(false);
        } else if (latest < height * 1.5) {
            setActiveText('Atmosphere');
            setActiveTab('');
            setIsScrolled(true);
        } else if (latest < height * 2.5) {
            setActiveText('The Team');
            setActiveTab('about');
            setIsScrolled(true);
        } else if (latest < height * 3.5) {
            setActiveText('Expertise');
            setActiveTab('services');
            setIsScrolled(true);
        } else if (latest < height * 5.5) {
            setActiveText('Portfolio');
            setActiveTab('work');
            setIsScrolled(true);
        } else {
            setActiveText('Contact');
            setActiveTab('portfolio');
            setIsScrolled(true);
        }
    });

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="fixed top-4 lg:top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3"
            >
                {/* Dynamic Context Label — desktop only */}
                <motion.div
                    className="hidden lg:flex items-center gap-4 bg-zinc-900/90 border border-white/10 rounded-full px-5 py-2 shadow-2xl min-w-[240px]"
                >
                    <div className="flex flex-col">
                        <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">Studio</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            <span className="text-[8px] font-mono text-emerald-400 font-medium uppercase tracking-wider">Available Q3 '26</span>
                        </div>
                    </div>

                    <div className="w-px h-6 bg-white/10" />

                    <AnimatePresence mode="wait">
                        <motion.span
                            key={activeText}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-white font-medium text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
                        >
                            {activeText}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-2 bg-zinc-900/90 border border-white/5 rounded-full p-2 pl-6 shadow-2xl">
                    <div className="flex gap-6 mr-4">
                        {['about', 'services', 'work'].map((tab) => (
                            <Magnetic key={tab} strength={0.25}>
                                <button
                                    onClick={() => scrollToSection(tab)}
                                    onMouseEnter={playClick}
                                    className={clsx(
                                        "text-[10px] transition-colors uppercase tracking-[0.2em] font-medium relative py-1",
                                        activeTab === tab ? "text-white" : "text-zinc-500 hover:text-white"
                                    )}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="active-dot"
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                                        />
                                    )}
                                </button>
                            </Magnetic>
                        ))}
                    </div>
                    <Magnetic strength={0.3}>
                        <button
                            onClick={() => scrollToSection('contact')}
                            onMouseEnter={playClick}
                            className="relative bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-colors group mr-2"
                        >
                            <span className="relative z-10 group-hover:opacity-80 transition-opacity whitespace-nowrap">Start a project</span>

                            {/* Inner wrapper for shimmer clipping to bypass Safari artifacts */}
                            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                                {/* Premium Shimmer effect - slowed down, highly visible */}
                                {isScrolled && (
                                    <motion.div
                                        className="absolute top-0 bottom-0 z-0 w-[150%] left-[-150%] bg-gradient-to-r from-transparent via-black/20 to-transparent skew-x-[-20deg]"
                                        animate={{ x: ['0%', '250%'] }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatDelay: 1.5
                                        }}
                                    />
                                )}
                            </div>
                        </button>
                    </Magnetic>
                    <Magnetic strength={0.3}>
                        <motion.a
                            href="https://hansraj-dev.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={playClick}
                            whileHover={{ scale: 1.05 }}
                            className="border border-white/20 text-white/60 bg-transparent px-5 py-2 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] hover:text-white hover:border-white/40 transition-colors"
                        >
                            Portfolio
                        </motion.a>
                    </Magnetic>
                </div>

                {/* Mobile: context pill + hamburger */}
                <div className="flex lg:hidden items-center gap-3">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={activeText}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="text-white text-xs tracking-[0.2em] uppercase font-medium bg-zinc-900/95 border border-white/10 rounded-full px-5 py-2.5"
                        >
                            {activeText}
                        </motion.span>
                    </AnimatePresence>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-12 h-12 rounded-full bg-zinc-900/95 border border-white/10 flex items-center justify-center"
                        aria-label="Menu"
                    >
                        <div className="flex flex-col gap-[5px]">
                            <motion.span
                                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                                className="block w-4 h-[1.5px] bg-white origin-center"
                            />
                            <motion.span
                                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="block w-4 h-[1.5px] bg-white"
                            />
                            <motion.span
                                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                                className="block w-4 h-[1.5px] bg-white origin-center"
                            />
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile fullscreen menu overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-zinc-950/95 flex flex-col items-center justify-center gap-8"
                    >
                        {['about', 'services', 'work'].map((tab, i) => (
                            <motion.button
                                key={tab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => scrollToSection(tab)}
                                className="text-3xl font-bold text-white uppercase tracking-widest hover:text-gray-300 transition-colors"
                            >
                                {tab}
                            </motion.button>
                        ))}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.3 }}
                            onClick={() => scrollToSection('contact')}
                            className="mt-4 bg-white text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide"
                        >
                            Start a project
                        </motion.button>
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.4 }}
                            href="https://hansraj-dev.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white/20 text-white/60 bg-transparent px-8 py-3 rounded-full text-sm font-medium uppercase tracking-wide"
                        >
                            Portfolio
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
