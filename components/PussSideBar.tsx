'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface PussSideBarProps {
    hovered?: boolean;
    onFrameChange?: (frame: number) => void;
}

export interface PussSideBarHandle {
    getCurrentFrame: () => number;
    setFrame: (frame: number) => void;
}

const TOTAL_FRAMES = 40;

const PussSideBar = forwardRef<PussSideBarHandle, PussSideBarProps>(function PussSideBar(
    { hovered = false, onFrameChange },
    ref
) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    
    const [isCelebrating, setIsCelebrating] = useState(false);
    const celebratingRef = useRef(false);

    useImperativeHandle(ref, () => ({
        getCurrentFrame: () => currentFrame,
        setFrame: (f: number) => updateFrame(f),
    }));

    // Preload all 40 frame images
    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameNum = String(i).padStart(3, '0');
            img.src = `/animation/bongo-cat/ezgif-frame-${frameNum}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setImagesLoaded(true);
                }
            };
            imgs.push(img);
        }
        imagesRef.current = imgs;
    }, []);

    // Function to draw frame on canvas with object-cover fit
    const renderFrame = (frameIdx: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[frameIdx - 1];
        if (!canvas || !img || !img.complete) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width: cw, height: ch } = canvas;
        const { width: iw, height: ih } = img;

        if (cw === 0 || ch === 0 || iw === 0 || ih === 0) return;

        const scale = Math.max(cw / iw, ch / ih);
        const nw = iw * scale;
        const nh = ih * scale;
        const cx = (cw - nw) / 2;
        const cy = (ch - nh) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, cx, cy, nw, nh);
    };

    const updateFrame = (newFrame: number) => {
        const clamped = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(newFrame)));
        setCurrentFrame(clamped);
        renderFrame(clamped);
        if (onFrameChange) onFrameChange(clamped);
    };

    // Sync canvas resolution to element size
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && canvasRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                canvasRef.current.width = rect.width * (window.devicePixelRatio || 1);
                canvasRef.current.height = rect.height * (window.devicePixelRatio || 1);
                renderFrame(currentFrame);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentFrame, imagesLoaded]);

    // Initial render when loaded
    useEffect(() => {
        if (imagesLoaded) {
            renderFrame(currentFrame);
        }
    }, [imagesLoaded]);

    // Celebration Event Listener
    useEffect(() => {
        const handleCelebrate = () => {
            if (celebratingRef.current) return;
            
            setIsCelebrating(true);
            celebratingRef.current = true;
            
            let frame = 1;
            const interval = setInterval(() => {
                frame = (frame % TOTAL_FRAMES) + 1;
                updateFrame(frame);
            }, 60);

            setTimeout(() => {
                clearInterval(interval);
                setIsCelebrating(false);
                celebratingRef.current = false;
            }, 3000);
        };

        window.addEventListener('acezen:form-sent', handleCelebrate);
        return () => window.removeEventListener('acezen:form-sent', handleCelebrate);
    }, []);

    // Scroll-based animation & mouse wheel scrubbing
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || celebratingRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate scroll progress through section
            const totalDistance = rect.height + windowHeight;
            const currentPos = windowHeight - rect.top;
            const progress = Math.min(1, Math.max(0, currentPos / totalDistance));
            
            const targetFrame = Math.min(TOTAL_FRAMES, Math.max(1, Math.floor(progress * TOTAL_FRAMES) + 1));
            updateFrame(targetFrame);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Direct wheel scrubbing over container
    const handleWheel = (e: React.WheelEvent) => {
        if (celebratingRef.current) return;
        const delta = e.deltaY > 0 ? 1 : -1;
        updateFrame(currentFrame + delta);
    };

    return (
        <div 
            ref={containerRef} 
            onWheel={handleWheel}
            className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center select-none"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                animate={hovered ? { scale: 1.04, opacity: 0.8 } : { scale: 1, opacity: 0.95 }}
                className="relative w-full h-full"
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover object-center block"
                />

                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px]" />

                {/* Scroll hint badge */}
                <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={hovered ? { opacity: 0, y: -4 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-3 right-3 pointer-events-none"
                >
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest border border-emerald-500/30 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full">
                        Scroll / Wheel
                    </span>
                </motion.div>

                {/* Celebration Overlay */}
                <AnimatePresence>
                    {isCelebrating && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none"
                        >
                            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest bg-blue-500/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                Incoming!
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
});

export default PussSideBar;
