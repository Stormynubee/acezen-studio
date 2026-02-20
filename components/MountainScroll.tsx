'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useLoading } from './LoadingContext';

const TOTAL_FRAMES = 192;

export default function MountainScroll() {
    const { incrementLoaded, setTotal, progress } = useLoading();
    // Debug log
    // console.log('Mountain mounted. Total:', TOTAL_FRAMES);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
    const lastFrameRef = useRef(-1);
    const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);
    const rafRef = useRef<number>(0);
    const isMobileRef = useRef(false);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (index === lastFrameRef.current) return;
        lastFrameRef.current = index;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;

        const img = imagesRef.current[index] || lastDrawnImgRef.current;
        if (img && img.complete && img.naturalWidth > 0) {
            if (imagesRef.current[index]) lastDrawnImgRef.current = img;

            const scaleX = w / img.width;
            const scaleY = h / img.height;
            const baseScale = Math.max(scaleX, scaleY);

            // Sharpen: Remove Zoom, use native fit (Watermark cropped at source)
            const zoomMultiplier = 1.0;
            const scale = baseScale * zoomMultiplier;

            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;

            const x = (w - scaledWidth) / 2;
            let y = (h - scaledHeight) / 2;

            // Mobile: Align more towards bottom to show mountain base/mid-section
            if (isMobileRef.current && scaledHeight > h) {
                y = h - scaledHeight;
            }

            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        }
    }, []);

    const onScroll = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
            const frame = Math.round(progress * (TOTAL_FRAMES - 1));
            renderFrame(frame);
        });
    }, [renderFrame]);

    useEffect(() => {
        const resize = () => {
            if (!canvasRef.current) return;
            const mobile = window.innerWidth < 768;
            isMobileRef.current = mobile;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvasRef.current.width = window.innerWidth * dpr;
            canvasRef.current.height = window.innerHeight * dpr;

            lastFrameRef.current = -1;
            onScroll();
        };

        // AGGRESSIVE LOADING STRATEGY
        // To fix "not smooth" playback, we load faster.
        const loadBatch = (start: number, end: number) => {
            for (let i = start; i < end; i++) {
                if (i >= TOTAL_FRAMES) break;
                if (imagesRef.current[i]) continue; // Already loaded

                const img = new Image();
                const pad = String(i + 1).padStart(5, '0');
                const src = `/images/sequence/${pad}.webp?v=hd-q80`; // BUST CACHE: Q80 Optimized
                img.src = src;

                const onLoad = () => {
                    imagesRef.current[i] = img;
                    incrementLoaded();
                    if (i === 0) {
                        lastFrameRef.current = -1;
                        renderFrame(0);
                    }
                };

                const onError = () => {
                    // console.error(`Mountain: Failed to load ${src}`); // Suppress console noise
                    incrementLoaded();
                };

                img.onload = onLoad;
                img.onerror = onError;
            }
        };

        // 1. Critical: Frame 0 (Instant)
        loadBatch(0, 1);

        // 2. Intelligent Scroll-Based Loading (The "No Network Freeze" Fix)
        // Instead of downloading 192 images all at once and killing the browser queue,
        // we only download a small chunk AHEAD of where the user currently is.
        const PRELOAD_BUFFER = 15; // How many frames to keep loaded ahead of the scroll

        let lastLoadedFrame = 0; // We loaded frame 0 instantly

        const checkScrollAndLoad = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
            const currentFrame = Math.round(scrollProgress * (TOTAL_FRAMES - 1));

            // Calculate how far ahead we need to load
            const targetFrame = Math.min(currentFrame + PRELOAD_BUFFER, TOTAL_FRAMES);

            if (targetFrame > lastLoadedFrame) {
                // Load from last loaded up to our new target
                loadBatch(lastLoadedFrame + 1, targetFrame + 1);
                lastLoadedFrame = targetFrame;
            }
        };

        // Attach to scroll and fire once to load the first immediate chunk
        window.addEventListener('scroll', checkScrollAndLoad, { passive: true });

        // Wait a tiny bit for layout to settle before initial check
        setTimeout(checkScrollAndLoad, 100);

        resize();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafRef.current);
        };
    }, [onScroll, renderFrame]);

    return (
        <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden bg-zinc-900 pointer-events-none">
            <canvas ref={canvasRef} className="block w-full h-full object-cover" />
        </div>
    );
}
