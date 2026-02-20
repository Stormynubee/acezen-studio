'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

// Build the list of valid frame numbers that ACTUALLY exist on disk
// Ranges: 1-110, 142-149, 207-240
const FRAME_NUMBERS: number[] = [];
for (let i = 1; i <= 110; i++) FRAME_NUMBERS.push(i);
for (let i = 142; i <= 149; i++) FRAME_NUMBERS.push(i);
for (let i = 207; i <= 240; i++) FRAME_NUMBERS.push(i);
const TOTAL_FRAMES = FRAME_NUMBERS.length; // 152

export default function AboutFounder() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
    const lastDrawnRef = useRef<HTMLImageElement | null>(null);
    const lastFrameRef = useRef(-1);
    const rafRef = useRef(0);

    // Lazy loading state
    const [startedLoading, setStartedLoading] = useState(false);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (index === lastFrameRef.current) return; // Skip redundant
        lastFrameRef.current = index;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const img = imagesRef.current[index] || lastDrawnRef.current;
        if (img && img.complete && img.naturalWidth > 0) {
            if (imagesRef.current[index]) lastDrawnRef.current = img;
            const scale = Math.max(w / img.width, h / img.height);
            const x = (w - img.width * scale) / 2;
            const y = (h - img.height * scale) / 2;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
    }, []);

    // Direct scroll handler — no spring, no framer-motion
    const onScroll = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Trigger loading when close to viewport (e.g. 500px before)
            // Using a ref for startedLoading check would be better perf, but state is fine for one-time trigger.
            if (!startedLoading && rect.top < windowHeight + 500) {
                setStartedLoading(true);
            }

            // Progress: 0 when section enters viewport, 1 when it leaves
            const progress = Math.min(Math.max(
                (windowHeight - sectionTop) / (sectionHeight + windowHeight),
                0
            ), 1);

            const frame = Math.round(progress * (TOTAL_FRAMES - 1));
            renderFrame(frame);
        });
    }, [renderFrame, startedLoading]);

    // Effect 1: Handle Sizing & Scroll Listener (Runs once on mount + on resize)
    useEffect(() => {
        const resize = () => {
            if (canvasRef.current && canvasRef.current.parentElement) {
                const rect = canvasRef.current.parentElement.getBoundingClientRect();
                const mobile = window.innerWidth < 768;
                const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
                canvasRef.current.width = rect.width * dpr;
                canvasRef.current.height = rect.height * dpr;
                lastFrameRef.current = -1;
                onScroll(); // Force initial render/check
            }
        };

        resize();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafRef.current);
        };
    }, [onScroll]);

    // Effect 2: Load Images (Runs only when startedLoading becomes true)
    useEffect(() => {
        if (!startedLoading) return;

        // Load all valid frames
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const num = FRAME_NUMBERS[i];
            const pad = String(num).padStart(3, '0');
            const img = new Image();
            // USE WEBP (Optimized)
            img.src = `/images/pussinboots/ezgif-frame-${pad}.webp`;
            img.onload = () => {
                imagesRef.current[i] = img;
                if (i === 0) {
                    lastFrameRef.current = -1;
                    renderFrame(0);
                }
            };
        }
    }, [startedLoading, renderFrame]);

    return (
        <section ref={sectionRef} className="py-16 md:py-32 px-5 md:px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
            >
                <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    System Architect & <br /> <span className="font-light italic text-white/70">Creative Visionary</span>
                </h2>
                <div className="space-y-4 md:space-y-6 text-lg md:text-xl text-gray-400 leading-loose mb-10 md:mb-12">
                    <p>
                        Founded by <span className="text-white font-semibold">Hansraj Tiwari</span>, a polymath with over <span className="text-white">9+ years</span> of experience bridging the gap between raw code and cinematic storytelling.
                    </p>
                    <p>
                        Beyond the stack, I am a <span className="text-white">Video Editor &amp; Motion Graphic Artist</span>. My work isn&apos;t just about function, it&apos;s about feeling. From complex React/Node.js ecosystems to Hardware Prototyping (Arduino/IoT) and High-Fidelity Video Production, I architect complete digital realities.
                    </p>
                    <p className="italic text-gray-500 text-sm border-l-2 border-white/20 pl-4">
                        &ldquo;I don&apos;t just build apps; I engineer experiences. Whether it&apos;s the kernel of a custom OS or the final cut of a brand film.&rdquo;
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                    {['System Architecture', 'Full Stack Dev', 'Video Editing', 'Motion Graphics', 'IoT & Hardware', 'React & Node.js'].map((skill) => (
                        <span key={skill} className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 text-[11px] md:text-sm text-gray-300 backdrop-blur-sm">
                            {skill}
                        </span>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full md:flex-1 relative aspect-video md:aspect-square max-w-full md:max-w-md"
            >
                <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                    <canvas ref={canvasRef} className="block w-full h-full" />
                </div>
            </motion.div>
        </section>
    );
}
