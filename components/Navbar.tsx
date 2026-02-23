'use client';

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Magnetic from './Magnetic';

function useUISound() {
    const ctxRef = useRef<AudioContext | null>(null);
    const tickBufferRef = useRef<AudioBuffer | null>(null);
    const readyRef = useRef(false);

    // Build the tick waveform buffer (runs once on mount)
    const buildTickBuffer = (ctx: AudioContext): AudioBuffer => {
        const sampleRate = ctx.sampleRate;
        const duration = 0.04;
        const length = Math.floor(sampleRate * duration);
        const buffer = ctx.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            const progress = t / duration;
            const freq = 900 * Math.pow(200 / 900, progress);
            const amp = 0.08 * Math.pow(1 - progress, 3);
            data[i] = amp * Math.sin(2 * Math.PI * freq * t);
        }
        return buffer;
    };

    // 1. Create AudioContext + pre-render tick buffer on mount
    useEffect(() => {
        try {
            const AC = window.AudioContext || (window as any).webkitAudioContext;
            if (!AC) return;
            const ctx = new AC();
            ctxRef.current = ctx;
            tickBufferRef.current = buildTickBuffer(ctx);
        } catch (e) { /* silently fail */ }
    }, []);

    // 2. On first REAL gesture: resume context + play the REAL tick (not silence!) to wake up WASAPI
    useEffect(() => {
        const wakeAndPlay = async () => {
            const ctx = ctxRef.current;
            const buffer = tickBufferRef.current;
            if (!ctx || readyRef.current) return;

            try {
                // Resume the AudioContext (browser policy)
                if (ctx.state === 'suspended') await ctx.resume();

                // Play the REAL tick sound immediately — this forces Windows Audio Service awake
                if (buffer) {
                    const src = ctx.createBufferSource();
                    src.buffer = buffer;
                    src.connect(ctx.destination);
                    src.start(0);
                }

                // ALSO play a tiny WAV through HTMLAudioElement as a secondary hardware wake-up
                // This goes through a different OS audio path and guarantees WASAPI activation
                const audio = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
                audio.volume = 0.01;
                audio.play().catch(() => { });

                readyRef.current = true;
            } catch (e) { /* silently fail */ }
        };

        const events = ['click', 'pointerdown', 'touchstart', 'keydown'] as const;
        events.forEach(e => window.addEventListener(e, wakeAndPlay, { once: true, passive: true }));
        return () => { events.forEach(e => window.removeEventListener(e, wakeAndPlay)); };
    }, []);

    // 3. Play pre-built buffer — ultra cheap (~0.1ms per hover)
    const playClick = () => {
        try {
            const ctx = ctxRef.current;
            const buffer = tickBufferRef.current;
            if (!ctx || !buffer || ctx.state !== 'running') return;

            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.start(0);
        } catch (e) { /* silently fail */ }
    };

    return { playClick };
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
            setActiveText('The Journey');
            setActiveTab('');
            setIsScrolled(true);
        } else if (latest < height * 2.5) {
            setActiveText('The Founder');
            setActiveTab('about');
            setIsScrolled(true);
        } else if (latest < height * 3.5) {
            setActiveText('Expertise');
            setActiveTab('services');
            setIsScrolled(true);
        } else if (latest < height * 5.5) {
            setActiveText('Selected Works');
            setActiveTab('work');
            setIsScrolled(true);
        } else {
            setActiveText('Get in Touch');
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
                    className="hidden lg:flex items-center justify-center bg-zinc-900/90 border border-white/10 rounded-full px-5 py-2 shadow-2xl min-w-[140px]"
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={activeText}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="text-white font-medium text-xs tracking-[0.2em] uppercase whitespace-nowrap"
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
                        <motion.a
                            href="https://hansraj-dev.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={playClick}
                            animate={isScrolled ? {
                                scale: [1, 1.02, 1],
                                boxShadow: [
                                    "0px 0px 0px rgba(255, 255, 255, 0)",
                                    "0px 0px 20px rgba(255, 255, 255, 0.5)",
                                    "0px 0px 0px rgba(255, 255, 255, 0)"
                                ],
                                backgroundColor: ["#ffffff", "#f4f4f5", "#ffffff"],
                                color: "#000000"
                            } : {
                                scale: 1,
                                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                                backgroundColor: "#ffffff",
                                color: "#000000"
                            }}
                            transition={isScrolled ? {
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            } : { duration: 0.3 }}
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(255, 255, 255, 0.8)" }}
                            className="relative bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-colors group"
                        >
                            <span className="relative z-10 group-hover:opacity-80 transition-opacity whitespace-nowrap">Portfolio</span>

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
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.3 }}
                            href="https://hansraj-dev.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 bg-white text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide"
                        >
                            Portfolio
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
