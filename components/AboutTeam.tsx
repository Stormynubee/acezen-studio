'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PussSideBar from './PussSideBar';
import ScrambleText from './ScrambleText';

/* ── Animated Counter ── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 1200;
        const start = performance.now();

        const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Founder Modal ── */
function FounderModal({ onClose }: { onClose: () => void }) {

    // Close on ESC
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const stats = [
        { value: 110, suffix: 'K+', label: 'Community' },
        { value: 9, suffix: '+', label: 'Years' },
        { value: 16, suffix: '+', label: 'Awards' },
        { value: 4, suffix: '', label: 'Shipped Apps' },
    ];

    const techStack = [
        'React', 'Next.js', 'TypeScript', 'Three.js', 'Rust',
        'Python', 'C++', 'Arduino', 'DaVinci Resolve', 'Figma',
    ];

    const highlights = [
        'SIH Grand Finale — Top 0.06% of 320K students',
        '2× NCSC Nationals — India\'s top science olympiad',
        'Harvard CS50x Certified',
        'IEEE Young Engineer Award',
        'IISc Bangalore & BITS Pilani Certified',
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
            <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-950 border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 text-zinc-500 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
                >
                    ESC ✕
                </button>

                <div className="p-8 md:p-12">

                    {/* ── Header ── */}
                    <div className="flex items-start gap-6 mb-10">
                        {/* Monogram — flat, stark, no gradients */}
                        <div className="w-16 h-16 md:w-20 md:h-20 border border-white/20 flex items-center justify-center shrink-0">
                            <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">H</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mb-1">
                                Founder & System Architect
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none mb-3">
                                Hansraj Tiwari
                            </h2>
                            <p className="text-sm text-zinc-500 italic font-light">
                                &quot;I don&apos;t just build apps; I engineer experiences.&quot;
                            </p>
                        </div>
                    </div>

                    {/* ── Divider ── */}
                    <div className="w-full h-px bg-white/5 mb-8" />

                    {/* ── Stats Grid ── */}
                    <div className="grid grid-cols-4 gap-px bg-white/5 mb-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-zinc-950 p-4 text-center">
                                <p className="text-xl md:text-2xl font-bold text-white tabular-nums">
                                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                </p>
                                <p className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] mt-1 font-mono">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ── Tech Arsenal ── */}
                    <div className="mb-8">
                        <p className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-mono mb-3">
                            Tech Arsenal
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.04 }}
                                    className="text-[11px] font-mono text-zinc-400 border border-white/5 px-3 py-1.5 hover:text-white hover:border-white/20 transition-colors cursor-default"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* ── Highlights ── */}
                    <div className="mb-10">
                        <p className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-mono mb-3">
                            Highlights
                        </p>
                        <div className="space-y-0">
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-start gap-3 py-2.5 border-b border-white/[0.03] last:border-0"
                                >
                                    <span className="text-zinc-700 text-xs mt-0.5 shrink-0 font-mono">▸</span>
                                    <p className="text-sm text-zinc-400 font-light">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── CTAs ── */}
                    <div className="space-y-3 mb-8">
                        <motion.a
                            href="https://hansraj-dev.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 4 }}
                            className="group flex items-center justify-between w-full bg-white text-black px-6 py-3.5 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:bg-zinc-200"
                        >
                            <span>View Full Portfolio</span>
                            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                        </motion.a>

                        <motion.button
                            whileHover={{ x: 4 }}
                            onClick={() => {
                                onClose();
                                setTimeout(() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }, 300);
                            }}
                            className="group flex items-center justify-between w-full border border-white/10 text-white px-6 py-3.5 text-sm font-medium uppercase tracking-[0.15em] hover:border-white/30 transition-colors"
                        >
                            <span>Let&apos;s Work Together</span>
                            <span className="text-lg transition-transform group-hover:translate-x-1">↗</span>
                        </motion.button>
                    </div>

                    {/* ── Social Links ── */}
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/Stormynubee" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] hover:text-white transition-colors">
                            GitHub
                        </a>
                        <span className="text-zinc-800">•</span>
                        <a href="https://www.linkedin.com/in/hansrajtiwari/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] hover:text-white transition-colors">
                            LinkedIn
                        </a>
                        <span className="text-zinc-800">•</span>
                        <a href="https://hansraj-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] hover:text-white transition-colors">
                            Portfolio
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── Main Component ── */
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
    const [showFounderModal, setShowFounderModal] = useState(false);

    return (
        <section className="relative w-full min-h-[800px] lg:h-[800px] bg-zinc-950 flex flex-col lg:flex-row border-y border-white/5 overflow-hidden">

            {/* 1. Left Sidebar: Puss in Boots (50% Width on Desktop) */}
            <motion.div
                initial={{ x: '-100%' }}
                whileInView={{ x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 h-[280px] lg:h-full relative border-b lg:border-b-0 lg:border-r border-white/10 z-10 shrink-0 bg-black"
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
                        Puss x Bongo Cat
                    </motion.h3>
                </div>
            </motion.div>

            {/* 2. Right: Expansive Hover Reveal (50% Width) */}
            <motion.div
                initial={{ x: '100%' }}
                whileInView={{ x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex-1 flex flex-col lg:flex-row lg:h-full relative bg-zinc-950 overflow-hidden"
            >
                {/* Connecting Ampersand */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none mix-blend-difference hidden lg:block select-none">
                    <span className="text-[200px] font-black italic text-zinc-800/50 leading-none">&</span>
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
                    onClick={() => setShowFounderModal(true)}
                    animate={{
                        flex: hoveredId === 'hansraj' ? 2 : (hoveredId === 'sayli' ? 0.5 : 1),
                        backgroundColor: hoveredId === 'hansraj' ? '#18181b' : '#09090b'
                    }}
                    className="relative group/hansraj cursor-pointer border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden flex flex-col justify-center p-8 lg:p-12 min-h-[280px]"
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

                    <div className="relative z-10 space-y-6 lg:text-right flex flex-col lg:items-end">
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] flex items-center justify-start lg:justify-end gap-3 group-hover/hansraj:text-blue-400 transition-colors">
                            System & VFX
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/hansraj:animate-pulse" />
                        </p>

                        <h2 className="text-[clamp(2.5rem,4vw,5rem)] xl:text-[clamp(3rem,4.5vw,6rem)] font-bold text-white leading-[0.85] tracking-tighter group-hover/hansraj:scale-105 transition-transform duration-700 origin-left lg:origin-right">
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

                                        <div className="pl-4 border-l border-blue-500/20 lg:border-l-0 lg:border-r lg:pr-4 lg:pl-0">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-3">Specializing in:</p>
                                            <ul className="text-xs text-blue-300 grid grid-cols-1 gap-y-1.5 font-mono text-left lg:text-right">
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
                        <span className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 text-[5rem] lg:text-[10rem] leading-none font-black text-zinc-900 group-hover/hansraj:text-zinc-800 transition-colors duration-700 select-none -z-10 bg-clip-text text-transparent bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover/hansraj:from-blue-900/10 group-hover/hansraj:to-transparent">
                            01
                        </span>
                    </div>

                    {/* Persistent CTA pill — Flashy but brutalist */}
                    <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 z-10">
                        <div className="relative group-hover/hansraj:scale-105 transition-transform duration-300">
                            {/* Ping animation backdrop */}
                            <motion.div
                                className="absolute inset-0 border border-white/60 bg-white/10"
                                animate={{ 
                                    scaleX: [1, 1.15, 1],
                                    scaleY: [1, 1.4, 1],
                                    opacity: [1, 0, 0] 
                                }}
                                transition={{ 
                                    duration: 2.5, 
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                            />
                            
                            {/* Main Button */}
                            <div className="relative border border-white/40 bg-zinc-950 px-4 py-2 flex items-center gap-2 group-hover/hansraj:bg-white transition-colors duration-300">
                                <span className="text-[10px] md:text-xs font-mono text-white group-hover/hansraj:text-black uppercase tracking-[0.2em] transition-colors">
                                    View Profile
                                </span>
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                    className="text-white group-hover/hansraj:text-black transition-colors"
                                >
                                    →
                                </motion.span>
                            </div>
                        </div>
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
                    className="relative group/sayli overflow-hidden flex flex-col justify-center p-8 lg:p-12 min-h-[280px]"
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
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-3 group-hover/sayli:text-purple-400 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover/sayli:animate-pulse" />
                            Visual Director
                        </p>

                        <h2 className="text-[clamp(2.5rem,4vw,5rem)] xl:text-[clamp(3rem,4.5vw,6rem)] font-bold text-white leading-[0.85] tracking-tighter group-hover/sayli:scale-105 transition-transform duration-700 origin-left">
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
                        <span className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 text-[5rem] lg:text-[10rem] leading-none font-black text-zinc-900 group-hover/sayli:text-zinc-800 transition-colors duration-700 select-none -z-10 bg-clip-text text-transparent bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover/sayli:from-purple-900/10 group-hover/sayli:to-transparent">
                            02
                        </span>
                    </div>
                </motion.div>

            </motion.div>

            {/* ── Founder Modal ── */}
            <AnimatePresence>
                {showFounderModal && (
                    <FounderModal onClose={() => setShowFounderModal(false)} />
                )}
            </AnimatePresence>
        </section>
    );
}
