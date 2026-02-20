'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PussSideBar from './PussSideBar';
import ScrambleText from './ScrambleText';

const TEAM = [
    {
        id: 'hansraj',
        role: 'Founder & System Architect',
        name: 'Hansraj Tiwari',
        bio: 'A polymath with over 9+ years of experience bridging the gap between raw code and cinematic storytelling. From complex React/Node.js ecosystems to Hardware Prototyping (Arduino/IoT) and High-Fidelity Video Production, I architect complete digital realities.',
        quote: '"I don\'t just build apps; I engineer experiences."',
        skills: ['System Architecture', 'Full Stack Dev', 'Video Editing', 'Motion Graphics', 'IoT & Hardware', 'React & Node.js'],
        theme: 'from-blue-500/20 to-cyan-500/20'
    },
    {
        id: 'sayli',
        role: 'Partner & Visual Director',
        name: 'Sayli Changan',
        bio: 'A multidisciplinary artist who translates code into canvas. She brings a dual mastery of high-end 3D artistry and frontend engineering. Her workflow integrates specialized ZBrush Sculpting, complex Retopology, and precision UV Unwrapping.',
        quote: '"The topology determines the soul."',
        skills: ['3D Sculpting (ZBrush)', 'Retopology', 'UV Unwrapping', 'Color Grading', 'React & Frontend'],
        theme: 'from-purple-500/20 to-pink-500/20'
    }
];

export default function AboutTeam() {
    // Track hover state for smoother animations
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="relative w-full h-[800px] bg-zinc-950 flex flex-col md:flex-row border-y border-white/5 overflow-hidden">

            {/* 1. Left Sidebar: Puss in Boots (50% Width on Desktop) */}
            <motion.div
                initial={{ x: '-100%' }}
                whileInView={{ x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 aspect-video md:aspect-auto md:h-full relative border-b md:border-b-0 md:border-r border-white/10 z-10 shrink-0 bg-black"
            >
                <PussSideBar />
                <div className="absolute bottom-8 left-8 pointer-events-none">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2"
                    >
                        Mascot & Guide
                    </motion.p>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-white font-bold text-3xl tracking-tighter"
                    >
                        Puss x Bongo
                    </motion.h3>
                </div>
            </motion.div>

            {/* 2. Right: Expansive Hover Reveal (50% Width) */}
            <motion.div
                initial={{ x: '100%' }}
                whileInView={{ x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex-1 flex flex-col md:flex-row h-full relative bg-zinc-950 overflow-hidden"
            >
                {/* Connecting Ampersand */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none mix-blend-difference hidden md:block select-none">
                    <span className="text-[200px] font-black italic text-zinc-800/50 leading-none">&</span>
                </div>

                {/* 2A. Hansraj (Left - Expansive) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onHoverStart={() => setHoveredId('hansraj')}
                    onHoverEnd={() => setHoveredId(null)}
                    animate={{
                        flex: hoveredId === 'hansraj' ? 2 : (hoveredId === 'sayli' ? 0.5 : 1),
                        backgroundColor: hoveredId === 'hansraj' ? '#18181b' : '#09090b'
                    }}
                    className="relative group/hansraj border-r border-white/5 overflow-hidden flex flex-col justify-center p-8 md:p-12"
                >
                    {/* Background Effect: Code Matrix (Subtle) */}
                    <div className="absolute inset-0 opacity-0 group-hover/hansraj:opacity-10 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                        <div className="p-4 font-mono text-[10px] text-blue-500/40 leading-tight absolute inset-0 overflow-hidden text-right">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div key={i} className="whitespace-nowrap opacity-50">
                                    {`import { ${['React', 'Next', 'Editing', 'VFX'][i % 4]} } from '@future/tech'; // System Architecture v${i}.0 <Kernel Panic>`}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 space-y-6 md:text-right flex flex-col md:items-end">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] flex items-center justify-start md:justify-end gap-3 group-hover/hansraj:text-blue-400 transition-colors">
                            System & VFX
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/hansraj:animate-pulse" />
                        </p>

                        <h2 className="text-4xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-bold text-white leading-[0.85] tracking-tighter group-hover/hansraj:scale-105 transition-transform duration-700 origin-left md:origin-right whitespace-nowrap">
                            <ScrambleText text="Hansraj" speed={60} /><br /><span className="text-zinc-600 group-hover/hansraj:text-white transition-colors duration-700">Tiwari</span>
                        </h2>

                        {/* Description Reveal - Using AnimatePresence for smoothness */}
                        <AnimatePresence>
                            {hoveredId === 'hansraj' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="max-w-md ml-auto overflow-hidden"
                                >
                                    <div className="pt-8 space-y-8">
                                        <p className="text-sm lg:text-base text-zinc-400 font-light leading-relaxed">
                                            A polymath bridging raw code and cinematic storytelling. Architecting complete digital realities from complex React/Node.js ecosystems to Hardware Prototyping (IoT).
                                        </p>

                                        <div className="pl-4 border-l border-blue-500/20 md:border-l-0 md:border-r md:pr-4 md:pl-0">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-3">Specializing in:</p>
                                            <ul className="text-xs text-blue-300 grid grid-cols-1 gap-y-1.5 font-mono text-left md:text-right">
                                                <li>System Architecture •</li>
                                                <li>Full Stack Dev •</li>
                                                <li className="text-white font-bold opacity-100">Video Editing •</li>
                                                <li className="text-white font-bold opacity-100">Motion Graphics •</li>
                                                <li>IoT Hardware •</li>
                                                <li>Graphic Design •</li>
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Static Number */}
                        <span className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-[5rem] md:text-[10rem] lg:text-[12rem] leading-none font-black text-zinc-900 group-hover/hansraj:text-zinc-800 transition-colors duration-700 select-none -z-10 bg-clip-text text-transparent bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover/hansraj:from-blue-900/10 group-hover/hansraj:to-transparent">
                            01
                        </span>
                    </div>
                </motion.div>

                {/* 2B. Sayli (Right - Expansive) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onHoverStart={() => setHoveredId('sayli')}
                    onHoverEnd={() => setHoveredId(null)}
                    animate={{
                        flex: hoveredId === 'sayli' ? 2 : (hoveredId === 'hansraj' ? 0.5 : 1),
                        backgroundColor: hoveredId === 'sayli' ? '#18181b' : '#09090b'
                    }}
                    className="relative group/sayli overflow-hidden flex flex-col justify-center p-8 md:p-12"
                >
                    {/* Background Effect: Wireframe (Subtle) */}
                    <div className="absolute inset-0 opacity-0 group-hover/sayli:opacity-10 transition-opacity duration-700 pointer-events-none">
                        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.2" className="text-purple-500" />
                            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.2" fill="none" className="text-purple-500" />
                            <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="0.2" fill="none" className="text-purple-500" />
                        </svg>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent_70%)]" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-3 group-hover/sayli:text-purple-400 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover/sayli:animate-pulse" />
                            Visual Director
                        </p>

                        <h2 className="text-4xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-white leading-[0.85] tracking-tighter group-hover/sayli:scale-105 transition-transform duration-700 origin-left whitespace-nowrap">
                            <ScrambleText text="Sayli" speed={60} /><br /><span className="text-zinc-600 group-hover/sayli:text-white transition-colors duration-700">Changan</span>
                        </h2>

                        {/* Description Reveal - Using AnimatePresence for smoothness */}
                        <AnimatePresence>
                            {hoveredId === 'sayli' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="max-w-md overflow-hidden"
                                >
                                    <div className="pt-8 space-y-8">
                                        <p className="text-sm lg:text-base text-zinc-400 font-light leading-relaxed">
                                            Translating code into canvas. Dual mastery of high-end 3D artistry (ZBrush) and frontend engineering. Precision in every polygon.
                                        </p>

                                        <div className="pl-4 border-l border-purple-500/20">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-3">Specializing in:</p>
                                            <ul className="text-xs text-purple-300 grid grid-cols-1 gap-y-1.5 font-mono">
                                                <li>• 3D Sculpting</li>
                                                <li>• Retopology</li>
                                                <li>• UV Mapping</li>
                                                <li className="text-white font-bold opacity-100">• React & Frontend</li>
                                                <li>• Color Grading</li>
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Static Number */}
                        <span className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-[5rem] md:text-[10rem] lg:text-[12rem] leading-none font-black text-zinc-900 group-hover/sayli:text-zinc-800 transition-colors duration-700 select-none -z-10 bg-clip-text text-transparent bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover/sayli:from-purple-900/10 group-hover/sayli:to-transparent">
                            02
                        </span>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
