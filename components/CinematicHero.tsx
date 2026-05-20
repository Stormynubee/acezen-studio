'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, MotionValue } from 'framer-motion';
import { useAtmosphere } from '@/components/AtmosphereContext';

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN DIRECTION: "Cinematic Dark Luxury"
   Aesthetic: Observatory at midnight — deep space, editorial serif, warm gold accent
   DFII Score: 13/15
   Anchor: Diagonal slash + mouse-tracking ambient orb you can't ignore
   Fonts: Instrument Serif (display) / DM Mono (labels)
───────────────────────────────────────────────────────────────────────────── */

/* ─── MOUSE-TRACKING AMBIENT ORB ─── */
function AmbientOrb() {
    const orbRef = useRef<HTMLDivElement>(null);
    const posRef = useRef({ x: 0.5, y: 0.4 });
    const currentRef = useRef({ x: 0.5, y: 0.4 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            posRef.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        };
        window.addEventListener('mousemove', onMove, { passive: true });

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        const tick = () => {
            currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.06);
            currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.06);
            if (orbRef.current) {
                orbRef.current.style.left = `${currentRef.current.x * 100}%`;
                orbRef.current.style.top = `${currentRef.current.y * 100}%`;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={orbRef}
            aria-hidden
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{
                width: 700,
                height: 700,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(200,169,126,0.09) 0%, rgba(74,127,212,0.05) 45%, transparent 75%)',
                filter: 'blur(60px)',
                willChange: 'left, top',
                zIndex: 1,
            }}
        />
    );
}

/* ─── STATIC GRAIN OVERLAY (renders once, zero animation cost) ─── */
function GrainOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = 512, H = 512;
        canvas.width = W;
        canvas.height = H;
        const imageData = ctx.createImageData(W, H);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const v = Math.floor(Math.random() * 255);
            imageData.data[i] = v;
            imageData.data[i + 1] = v;
            imageData.data[i + 2] = v;
            imageData.data[i + 3] = 14;
        }
        ctx.putImageData(imageData, 0, 0);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ imageRendering: 'pixelated', mixBlendMode: 'screen', opacity: 0.55, zIndex: 2 }}
        />
    );
}

/* ─── SVG MOUNTAIN SILHOUETTES — 3-layer parallax ─── */
function MountainLayers({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const y1 = useTransform(scrollProgress, [0, 1], ['0%', '22%']);
    const y2 = useTransform(scrollProgress, [0, 1], ['0%', '13%']);
    const y3 = useTransform(scrollProgress, [0, 1], ['0%', '6%']);
    const opacity = useTransform(scrollProgress, [0, 0.6], [1, 0]);

    return (
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden style={{ opacity }}>
            {/* Far range */}
            <motion.div style={{ y: y3 }} className="absolute inset-0">
                <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice"
                    className="absolute bottom-0 w-full" style={{ height: '88%' }}>
                    <defs>
                        <linearGradient id="farGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(74,127,212,0.08)" />
                            <stop offset="100%" stopColor="rgba(10,10,18,0.6)" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,900 L0,520 L100,400 L200,460 L310,310 L420,390 L510,240 L620,340 L740,190 L860,290 L970,140 L1070,260 L1180,110 L1300,220 L1400,370 L1440,310 L1440,900 Z"
                        fill="url(#farGrad)"
                    />
                </svg>
            </motion.div>

            {/* Mid range */}
            <motion.div style={{ y: y2 }} className="absolute inset-0">
                <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice"
                    className="absolute bottom-0 w-full" style={{ height: '82%' }}>
                    <defs>
                        <linearGradient id="midGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(13,13,22,0.8)" />
                            <stop offset="100%" stopColor="rgba(4,4,8,0.95)" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,900 L0,590 L70,530 L150,570 L260,420 L380,490 L490,340 L590,430 L700,270 L820,360 L920,210 L1020,340 L1140,195 L1260,310 L1370,430 L1440,380 L1440,900 Z"
                        fill="url(#midGrad)"
                    />
                </svg>
            </motion.div>

            {/* Foreground ridge */}
            <motion.div style={{ y: y1 }} className="absolute inset-0">
                <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice"
                    className="absolute bottom-0 w-full" style={{ height: '75%' }}>
                    <defs>
                        <linearGradient id="fgGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(5,5,9,0.96)" />
                            <stop offset="100%" stopColor="rgba(2,2,4,1)" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,900 L0,660 L50,630 L120,660 L200,590 L300,640 L400,510 L490,580 L570,460 L660,540 L760,400 L860,480 L950,360 L1060,460 L1160,340 L1260,450 L1380,530 L1440,490 L1440,900 Z"
                        fill="url(#fgGrad)"
                    />
                </svg>
                {/* Ground mist */}
                <div className="absolute bottom-0 left-0 right-0"
                    style={{
                        height: '35%',
                        background: 'linear-gradient(to top, rgba(2,2,4,1) 0%, rgba(2,2,4,0.8) 35%, transparent 100%)',
                    }} />
            </motion.div>
        </motion.div>
    );
}

/* ─── STAR FIELD ─── */
function StarField() {
    const stars = Array.from({ length: 80 }, (_, i) => ({
        x: ((i * 41 + i * i * 7) % 100),
        y: ((i * 67 + i * 11) % 58),
        s: i % 9 === 0 ? 2 : i % 5 === 0 ? 1.5 : 1,
        o: 0.15 + (i % 9) * 0.07,
        dur: 2.5 + (i % 6),
        delay: i * 0.07,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.s, height: star.s }}
                    animate={{ opacity: [star.o, star.o * 3.5, star.o] }}
                    transition={{ duration: star.dur, repeat: Infinity, ease: 'easeInOut', delay: star.delay }}
                />
            ))}
        </div>
    );
}

/* ─── DIAGONAL SLASH (the differentiation anchor) ─── */
function DiagonalSlash({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const x = useTransform(scrollProgress, [0, 0.8], ['0%', '8%']);
    const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0]);

    return (
        <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ opacity, zIndex: 3 }}
        >
            {/* Main slash line */}
            <motion.div
                style={{ x, transformOrigin: 'top center' }}
                className="absolute"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 2.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <svg
                    className="absolute"
                    style={{ top: '-10%', left: '52%', height: '130%', width: '2px', opacity: 0.12 }}
                    viewBox="0 0 2 1000"
                    preserveAspectRatio="none"
                >
                    <line x1="1" y1="0" x2="1" y2="1000" stroke="url(#slashGrad)" strokeWidth="2" />
                    <defs>
                        <linearGradient id="slashGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="30%" stopColor="#c8a97e" />
                            <stop offset="70%" stopColor="#c8a97e" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* Horizontal accent hairline */}
            <motion.div
                className="absolute left-0 right-0"
                style={{ top: '72%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,169,126,0.15) 30%, rgba(200,169,126,0.15) 70%, transparent)', zIndex: 4 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
        </motion.div>
    );
}

/* ─── ANIMATED LABEL ─── */
function AnimatedLabel({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

/* ─── CHAR-BY-CHAR HEADLINE ─── */
function SplitHeadline({ lines }: { lines: Array<{ text: string; delay: number; italic?: boolean }> }) {
    return (
        <h1
            className="overflow-hidden"
            aria-label={lines.map(l => l.text).join(' ')}
            style={{ fontFamily: 'var(--font-display)' }}
        >
            {lines.map((line, li) => (
                <div key={li} className="block overflow-hidden leading-[0.92]" style={{ marginBottom: '0.02em' }}>
                    {line.text.split('').map((ch, ci) => (
                        <motion.span
                            key={ci}
                            initial={{ opacity: 0, y: '0.5em' }}
                            animate={{ opacity: 1, y: '0em' }}
                            transition={{
                                duration: 0.9,
                                delay: line.delay + ci * 0.035,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                                display: 'inline-block',
                                willChange: 'transform, opacity',
                                fontStyle: line.italic ? 'italic' : 'normal',
                            }}
                        >
                            {ch === ' ' ? '\u00A0' : ch}
                        </motion.span>
                    ))}
                </div>
            ))}
        </h1>
    );
}

/* ─── STAT COUNTER ─── */
function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1"
        >
            <span
                className="text-2xl lg:text-3xl font-semibold tracking-tight"
                style={{ color: 'var(--az-accent)', fontFamily: 'var(--font-display)' }}
            >
                {value}
            </span>
            <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: 'var(--az-muted)', fontFamily: 'var(--font-mono)' }}
            >
                {label}
            </span>
        </motion.div>
    );
}

/* ─── SCROLL CUE ─── */
function ScrollCue() {
    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 1.2 }}
        >
            <motion.div
                className="w-px origin-top"
                style={{
                    height: 52,
                    background: 'linear-gradient(to bottom, rgba(200,169,126,0) 0%, rgba(200,169,126,0.5) 50%, rgba(200,169,126,0) 100%)',
                }}
                animate={{ scaleY: [0.3, 1, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
                className="text-[9px] uppercase tracking-[0.5em]"
                style={{ color: 'var(--az-muted)', fontFamily: 'var(--font-mono)' }}
            >
                Explore
            </span>
        </motion.div>
    );
}

/* ─── BLUEPRINT MESH ─── */
function BlueprintMesh({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const gridOpacity = useTransform(scrollProgress, [0, 0.4], [0.1, 0]);
    
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div 
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{ opacity: gridOpacity }}
        >
            <div 
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"
                style={{
                  maskImage: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), black, transparent 80%)`,
                  WebkitMaskImage: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), black, transparent 80%)`,
                } as React.CSSProperties}
            />
            {/* Using a motion div to hold the dynamic values for the mask */}
            <motion.div 
                style={{ 
                    '--mouse-x': useSpring(mouseX, { stiffness: 100, damping: 20 }),
                    '--mouse-y': useSpring(mouseY, { stiffness: 100, damping: 20 })
                } as React.CSSProperties}
            />
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN CINEMATIC HERO
───────────────────────────────────────────────────────────────────────────── */
export default function CinematicHero() {
    const { vfxDensity, motionFidelity } = useAtmosphere();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });
    const smoothProgress = useSpring(scrollYProgress, { 
        stiffness: motionFidelity * 100 + 20, 
        damping: 25 - motionFidelity * 10 
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const textY = useTransform(scrollYProgress, [0, 0.65], ['0%', '-20%']);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden"
            aria-label="AceZen Studio — Digital Reality Architects"
        >
            {/* ── ATMOSPHERE BACKGROUND ── */}
            <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
                {/* Deep void */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse 100% 80% at 60% -10%, #0a1330 0%, #04040a 50%, #020204 100%)',
                    }}
                />
                {/* Cold blue top light */}
                <div
                    className="absolute"
                    style={{
                        top: '-15%', left: '20%',
                        width: '90%', height: '80%',
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse, rgba(74,127,212,0.12) 0%, transparent 70%)',
                        filter: 'blur(120px)',
                    }}
                />
                <StarField />
                <BlueprintMesh scrollProgress={smoothProgress} />
                <MountainLayers scrollProgress={smoothProgress} />
                <GrainOverlay />
            </motion.div>

            {/* ── MOUSE-TRACKING ORB (sits above mountains, below text) ── */}
            <AmbientOrb />

            {/* ── DESIGN ANCHOR: Diagonal slash composition ── */}
            <DiagonalSlash scrollProgress={smoothProgress} />

            {/* ── HERO COPY ── */}
            <motion.div
                className="relative h-full flex flex-col justify-end"
                style={{ opacity: heroOpacity, y: textY, zIndex: 10 }}
            >
                <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16 xl:px-24 pb-20 lg:pb-28">

                    {/* Eyebrow label */}
                    <AnimatedLabel delay={0.9}>
                        <p
                            className="flex items-center gap-4 mb-8"
                            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.45em', color: 'var(--az-muted)', textTransform: 'uppercase' }}
                        >
                            <span
                                style={{
                                    display: 'inline-block', width: 28, height: 1,
                                    background: 'linear-gradient(to right, transparent, var(--az-accent))',
                                }}
                            />
                            Digital Reality Architects
                            <span
                                style={{
                                    display: 'inline-block', width: 6, height: 6,
                                    borderRadius: '50%', background: 'var(--az-accent)', opacity: 0.8,
                                }}
                            />
                            Est. 2022
                        </p>
                    </AnimatedLabel>

                    {/* Main layout: headline left, descriptor right */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">

                        {/* ── HEADLINE — Instrument Serif, massive ── */}
                        <div className="flex-1">
                            <SplitHeadline
                                lines={[
                                    {
                                        text: 'AceZen',
                                        delay: 1.1,
                                        italic: false,
                                    },
                                    {
                                        text: 'Studio',
                                        delay: 1.35,
                                        italic: true,
                                    },
                                ]}
                            />
                            {/* Size token using clamp and editorial style */}
                            <style>{`
                                h1 { 
                                  font-size: clamp(3.5rem, 15vw, 16rem); 
                                  line-height: 0.85;
                                  letter-spacing: -0.04em;
                                }
                                h1 div:first-child span { color: #f0ede8; }
                                h1 div:last-child span { color: rgba(200,169,126,0.4); }
                            `}</style>
                        </div>

                        {/* ── RIGHT PANEL ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.4, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:max-w-[360px] xl:max-w-[420px] flex-shrink-0"
                        >
                            {/* Glass descriptor card */}
                            <div
                                className="rounded-2xl p-8 xl:p-10 mb-10"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    backdropFilter: 'blur(32px)',
                                    border: '1px solid var(--az-border)',
                                    boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.05)',
                                }}
                            >
                                <p
                                    className="leading-relaxed"
                                    style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(240,237,232,0.6)', fontWeight: 300 }}
                                >
                                    We transcend conventional development — engineering cinematic digital
                                    realities from system kernels to immersive brand experiences.
                                </p>

                                {/* CTA */}
                                <motion.a
                                    href="#work"
                                    className="inline-flex items-center gap-4 mt-8 group"
                                    whileHover={{ x: 4 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '11px',
                                        letterSpacing: '0.3em',
                                        textTransform: 'uppercase',
                                        color: 'var(--az-accent)',
                                    }}
                                >
                                    Explore Work
                                    <span
                                        className="inline-block transition-transform group-hover:translate-x-1"
                                        style={{ width: 32, height: 1, background: 'var(--az-accent)' }}
                                    />
                                </motion.a>
                            </div>

                            {/* Stats row */}
                            <div
                                className="grid grid-cols-3 gap-6 pt-6"
                                style={{ borderTop: '1px solid var(--az-border)' }}
                            >
                                <StatItem value="60+" label="Projects" delay={2.4} />
                                <StatItem value="5★" label="Rating" delay={2.55} />
                                <StatItem value="Est." label="2022" delay={2.7} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* ── SCROLL CUE ── */}
            <ScrollCue />

            {/* ── BOTTOM FADE into content ── */}
            <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                    height: 160,
                    background: 'linear-gradient(to top, var(--az-void) 0%, transparent 100%)',
                    zIndex: 15,
                }}
            />
        </section>
    );
}
