'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import PussSideBar, { PussSideBarHandle } from './PussSideBar';
import ScrambleText from './ScrambleText';
import AboutFounder from './AboutFounder';
import AboutCoFounder from './AboutCoFounder';

/* ─── TEAM DATA ─── */
const TEAM = [
    {
        id: 'hansraj',
        name: 'Hansraj Tiwari',
        role: 'System Architect & Founder',
        bio: 'Building complex digital infrastructures and cinematic visual narratives.',
        skills: ['Next.js', 'System Arch', 'VFX', 'Hardware'],
    },
    {
        id: 'sayli',
        name: 'Sayli Changan',
        role: 'Co-Founder & Visual Director',
        bio: 'Merging high-end 3D artistry with precision frontend engineering.',
        skills: ['3D Art', 'React', 'Motion', 'Design'],
    }
];

/* ─── FOUNDER MODAL COMPONENT ─── */
function FounderModal({ type, onClose }: { type: 'hansraj' | 'sayli'; onClose: () => void }) {
    // Scroll Lock
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
        >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />
            
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                    ✕
                </button>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 lg:p-20">
                    {type === 'hansraj' ? <AboutFounder /> : <AboutCoFounder />}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─── AESTHETIC PROFILE BUTTON ─── */
function ProfileButton({ color = 'blue', label = 'Initialize Access' }: { color?: 'blue' | 'purple', label?: string }) {
    return (
        <motion.div 
            className="relative mt-10 group/btn overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
        >
            <div className={`flex items-center gap-6 px-8 py-4 border border-white/5 bg-white/[0.01] backdrop-blur-xl rounded-full transition-all duration-700 group-hover/btn:border-${color}-500/40 group-hover/btn:bg-${color}-500/5 group-hover/btn:px-10 shadow-2xl`}>
                {/* Minimalist Scanning Node */}
                <div className="relative flex items-center justify-center w-3 h-3">
                    <div className={`absolute inset-0 bg-${color}-500 rounded-full animate-ping opacity-10`} />
                    <div className={`w-1.5 h-1.5 bg-${color}-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]`} />
                    <motion.div 
                        className={`absolute -inset-1 border border-${color}-500/30 rounded-full`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
                
                <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-zinc-400 group-hover/btn:text-white transition-colors duration-700">
                    {label}
                </span>

                <div className="overflow-hidden w-0 group-hover/btn:w-6 transition-all duration-700 ease-out">
                    <svg className={`w-4 h-4 text-${color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
            
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-${color}-500/5 blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 pointer-events-none`} />
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN ABOUT TEAM SECTION
───────────────────────────────────────────────────────────────────────────── */
export default function AboutTeam() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [activeModal, setActiveModal] = useState<'hansraj' | 'sayli' | null>(null);
    const [isPussHovered, setIsPussHovered] = useState(false);
    const [activeFrame, setActiveFrame] = useState(1);
    const pussRef = useRef<PussSideBarHandle>(null);

    return (
        <section id="about" className="relative w-full min-h-[800px] lg:h-[800px] bg-zinc-950 flex flex-col lg:flex-row border-y border-white/5 overflow-hidden">

            {/* 1. Left Sidebar: Scroll-driven Mascot (28% Width on Desktop) */}
            <motion.div
                initial={{ x: '-100%' }}
                whileInView={{ x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                onMouseEnter={() => setIsPussHovered(true)}
                onMouseLeave={() => setIsPussHovered(false)}
                className="w-full lg:w-[28%] h-[200px] lg:h-full relative border-b lg:border-b-0 lg:border-r border-white/10 z-10 shrink-0 bg-black overflow-hidden cursor-pointer group"
            >
                <PussSideBar ref={pussRef} hovered={isPussHovered} onFrameChange={(f) => setActiveFrame(f)} />
                <motion.div
                    animate={{ opacity: isPussHovered ? 0 : 1, y: isPussHovered ? 8 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-8 left-8 pointer-events-none"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2"
                    >
                        Mascot &amp; Interactive Guide
                    </motion.p>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-white font-bold text-xl tracking-tighter"
                    >
                        Studio Mascot
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-[10px] font-mono text-zinc-400 italic mt-1"
                    >
                        "Scroll or wheel to animate frame-by-frame."
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* Expanded Mascot Frame Overlay — slides in from right on hover */}
            <AnimatePresence>
                {isPussHovered && (
                    <motion.div
                        key="mascot-expanded"
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-0 right-0 h-full z-30 hidden lg:flex items-center justify-center bg-black/95 border-l border-white/10 pointer-events-none"
                        style={{ width: '72%' }}
                    >
                        {/* Scanlines */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:100%_3px] z-10" />
                        {/* Subtle vignette */}
                        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-black/60 pointer-events-none z-10" />

                        {/* Corner decorations */}
                        <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/20 pointer-events-none z-20" />
                        <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/20 pointer-events-none z-20" />
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/20 pointer-events-none z-20" />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/20 pointer-events-none z-20" />

                        {/* Label */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Full Frame View (Frame {activeFrame}/40)</span>
                        </div>

                        {/* Full-aspect frame image */}
                        <img
                            src={`/animation/bongo-cat/ezgif-frame-${String(activeFrame).padStart(3, '0')}.jpg`}
                            alt="Mascot Animation Frame"
                            className="w-full h-full object-cover object-center relative z-0"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Right: Expansive Hover Reveal (50% Width) */}
            <motion.div
                initial={{ x: '100%' }}
                whileInView={{ x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex-1 flex flex-col lg:flex-row lg:h-full relative bg-zinc-950 overflow-hidden"
            >
                {/* Connecting Ampersand — The Architectural Pivot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none mix-blend-screen hidden lg:block select-none opacity-10">
                    <motion.span 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[280px] font-black italic text-white/20 leading-none font-display"
                    >
                      &
                    </motion.span>
                </div>

                {/* 2A. Hansraj (Left - Expansive) — CLICKABLE with entrance pulse */}
                <motion.div
                    initial={{ opacity: 0, borderColor: 'rgba(255,255,255,0.02)' }}
                    whileInView={{
                        opacity: 1,
                        borderColor: [
                            'rgba(255,255,255,0.02)',
                            'rgba(255,255,255,0.18)',
                            'rgba(255,255,255,0.02)'
                        ]
                    }}
                    transition={{
                        opacity: { duration: 0.5, delay: 0.2 },
                        borderColor: { duration: 2, delay: 1, ease: 'easeInOut' }
                    }}
                    viewport={{ once: true }}
                    onHoverStart={() => setHoveredId('hansraj')}
                    onHoverEnd={() => setHoveredId(null)}
                    onClick={() => setActiveModal('hansraj')}
                    animate={{
                        flex: hoveredId === 'hansraj' ? 1.6 : (hoveredId === 'sayli' ? 0.6 : 1),
                        backgroundColor: hoveredId === 'hansraj' ? '#0d0d12' : '#050508'
                    }}
                    className="relative group/hansraj cursor-pointer border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden flex flex-col justify-center p-8 lg:p-20 min-h-[400px] transition-all duration-1000 z-10"
                >
                    {/* Background Effect: Code Matrix (Subtle) */}
                    <div className="absolute inset-0 opacity-0 group-hover/hansraj:opacity-20 transition-opacity duration-1000 pointer-events-none hidden md:block">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                        <div className="p-4 font-mono text-[9px] text-blue-500/40 leading-tight absolute inset-0 overflow-hidden text-right select-none">
                            {Array.from({ length: 60 }).map((_, i) => (
                                <div key={i} className="whitespace-nowrap opacity-40">
                                    {`exec kernel_main --target=ACEZEN_VFX_${i} --mode=PRODUCTION --shroud=true`}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Profile Image - High Gloss Cinematic Frame */}
                    <motion.div 
                        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[400px] h-[600px] pointer-events-none z-0 hidden lg:block"
                        animate={{ 
                            x: hoveredId === 'hansraj' ? -40 : 0,
                            opacity: hoveredId === 'hansraj' ? 0.6 : 0,
                            scale: hoveredId === 'hansraj' ? 1 : 1.1,
                            filter: hoveredId === 'hansraj' ? 'grayscale(0) contrast(1.1)' : 'grayscale(1) contrast(0.8)'
                        }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                            <Image 
                                src="/hansraj-v2.jpg" 
                                alt="Hansraj Tiwari" 
                                fill
                                sizes="400px"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            {/* Glass overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-blue-500/10" />
                        </div>
                    </motion.div>

                    <div className="relative z-10 space-y-6 md:space-y-10 lg:text-right flex flex-col lg:items-end">
                        <div className="space-y-4">
                          <p className="text-[9px] md:text-[10px] font-mono text-blue-500 uppercase tracking-[0.5em] group-hover:translate-x-[-8px] transition-transform duration-700">
                              System Architect
                          </p>
                          <div className="w-12 h-[1px] bg-blue-500/30 ml-auto" />
                        </div>

                        <h2 className="text-[clamp(3.5rem,8vw,10rem)] font-bold text-white leading-[0.75] tracking-tighter group-hover:scale-[1.03] transition-transform duration-1000 origin-left lg:origin-right text-editorial">
                            <ScrambleText text="Hansraj" speed={60} /><br />
                            <span className="text-white/10 group-hover:text-white transition-colors duration-1000">Tiwari</span>
                        </h2>

                        {/* Description */}
                        <div className="max-w-md ml-auto">
                            <p className="text-sm md:text-base lg:text-lg text-zinc-500 font-light leading-relaxed transition-colors duration-700 group-hover:text-zinc-200">
                                Hardware hacks, AI systems, and clean web builds. Likes fast code, dark modes, and shipping products.
                            </p>
                        </div>

                        <ProfileButton color="blue" label="View Profile" />
                    </div>

                    {/* Architectural Counter */}
                    <span className="absolute top-12 left-12 text-[10px] font-mono text-zinc-800 tracking-[1em] group-hover:text-blue-500/20 transition-colors">
                        NODE_01
                    </span>
                </motion.div>

                {/* 2B. Sayli (Right - Expansive) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onHoverStart={() => setHoveredId('sayli')}
                    onHoverEnd={() => setHoveredId(null)}
                    onClick={() => setActiveModal('sayli')}
                    animate={{
                        flex: hoveredId === 'sayli' ? 1.6 : (hoveredId === 'hansraj' ? 0.6 : 1),
                        backgroundColor: hoveredId === 'sayli' ? '#120d12' : '#050508'
                    }}
                    className="relative group/sayli cursor-pointer overflow-hidden flex flex-col justify-center p-8 lg:p-20 min-h-[400px] transition-all duration-1000"
                >
                    {/* Background Effect: Wireframe (Subtle) */}
                    <div className="absolute inset-0 opacity-0 group-hover/sayli:opacity-20 transition-opacity duration-1000 pointer-events-none">
                        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.05" className="text-purple-500" />
                            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.05" fill="none" className="text-purple-500" />
                            <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.02" fill="none" className="text-purple-500" />
                        </svg>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)]" />
                    </div>

                    <div className="relative z-10 space-y-10">
                        <div className="space-y-4">
                          <p className="text-[10px] font-mono text-purple-500 uppercase tracking-[0.5em] group-hover:translate-x-[8px] transition-transform duration-700">
                              Co-Founder &amp; Visual Director
                          </p>
                          <div className="w-12 h-[1px] bg-purple-500/30" />
                        </div>

                        <h2 className="text-[clamp(4rem,7vw,10rem)] font-bold text-white leading-[0.75] tracking-tighter group-hover:scale-[1.03] transition-transform duration-1000 origin-left text-editorial">
                            <ScrambleText text="Sayli" speed={60} /><br />
                            <span className="text-white/10 group-hover:text-white transition-colors duration-1000">Changan</span>
                        </h2>

                        {/* Description */}
                        <div className="max-w-md">
                            <p className="text-base lg:text-lg text-zinc-500 font-light leading-relaxed transition-colors duration-700 group-hover:text-zinc-200">
                                Turning complex ideas into 3D art and responsive frontend interfaces. Obsessed with clean layouts and motion.
                            </p>
                        </div>

                        <ProfileButton color="purple" label="View Profile" />
                    </div>

                    {/* Architectural Counter */}
                    <span className="absolute top-12 right-12 text-[10px] font-mono text-zinc-800 tracking-[1em] group-hover:text-purple-500/20 transition-colors">
                        NODE_02
                    </span>
                </motion.div>
            </motion.div>

            {/* ── Founder Modal ── */}
            <AnimatePresence>
                {activeModal && (
                    <FounderModal type={activeModal} onClose={() => setActiveModal(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
