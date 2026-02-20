'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function Navbar() {
    const [activeText, setActiveText] = useState('AceZen');
    const [activeTab, setActiveTab] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const height = window.innerHeight;

            if (scrollY < height * 0.5) {
                setActiveText('AceZen');
                setActiveTab('');
            } else if (scrollY < height * 1.5) {
                setActiveText('The Journey');
                setActiveTab('');
            } else if (scrollY < height * 2.5) {
                setActiveText('The Founder');
                setActiveTab('about');
            } else if (scrollY < height * 3.5) {
                setActiveText('Expertise');
                setActiveTab('services');
            } else if (scrollY < height * 5.5) {
                setActiveText('Selected Works');
                setActiveTab('work');
            } else {
                setActiveText('Get in Touch');
                setActiveTab('portfolio');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3"
            >
                {/* Dynamic Context Label — desktop only */}
                <motion.div
                    className="hidden lg:flex items-center justify-center bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full px-5 py-2 shadow-2xl min-w-[140px]"
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
                <div className="hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full p-2 pl-6 shadow-2xl">
                    <div className="flex gap-6 mr-4">
                        {['about', 'services', 'work'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => scrollToSection(tab)}
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
                        ))}
                    </div>
                    <motion.a
                        href="https://hansraj-dev.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        animate={activeTab === 'portfolio' ? {
                            scale: 1.05,
                            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.2)",
                            backgroundColor: "#ffffff",
                            color: "#000000"
                        } : {
                            scale: 1,
                            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                            backgroundColor: "#ffffff",
                            color: "#000000"
                        }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors"
                    >
                        Portfolio
                    </motion.a>
                </div>

                {/* Mobile: context pill + hamburger */}
                <div className="flex md:hidden items-center gap-3">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={activeText}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="text-white text-[10px] tracking-[0.2em] uppercase font-medium bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
                        >
                            {activeText}
                        </motion.span>
                    </AnimatePresence>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
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
                        className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
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
