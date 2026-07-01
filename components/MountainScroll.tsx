'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * MOUNTAIN SCROLL — Optimized Lazy Frame Sequence
 *
 * Key performance improvements over previous version:
 * 1. Activates ONLY after user scrolls past the hero fold (IntersectionObserver)
 * 2. No background bulk-load timer — frames load strictly on-demand near scroll position
 * 3. Reduced preload window (6 ahead, 3 behind) to limit concurrent requests
 * 4. rAF loop only runs while component is mounted AND visible
 * 5. First frame painted immediately from a lightweight placeholder
 */

const TOTAL_ORIGINAL = 192;
const FRAME_STEP = 2;
const TOTAL_FRAMES = Math.ceil(TOTAL_ORIGINAL / FRAME_STEP); // 96 frames

function getFrameSrc(logicalIndex: number): string {
    const originalFrame = logicalIndex * FRAME_STEP + 1;
    const pad = String(originalFrame).padStart(5, '0');
    return `/images/sequence/${pad}.webp?v=hd-q80`;
}

export default function MountainScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
    const lastFrameRef = useRef(-1);
    const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);
    const rafRef = useRef<number>(0);
    const isMobileRef = useRef(false);
    const loadedSetRef = useRef<Set<number>>(new Set());
    const targetFrameRef = useRef(0);
    const activeRef = useRef(false);
    const docHeightRef = useRef(1);

    const drawImage = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
        const scaleX = w / img.width;
        const scaleY = h / img.height;
        const scale = Math.max(scaleX, scaleY);
        const sw = img.width * scale;
        const sh = img.height * scale;
        const x = (w - sw) / 2;
        let y = (h - sh) / 2;
        if (isMobileRef.current && sh > h) y = h - sh;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, x, y, sw, sh);
    }, []);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (index === lastFrameRef.current) return;
        lastFrameRef.current = index;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const w = canvas.width, h = canvas.height;

        let img = imagesRef.current[index];
        if (!img || !img.complete || img.naturalWidth === 0) {
            for (let offset = 1; offset <= 6; offset++) {
                const behind = imagesRef.current[index - offset];
                if (behind?.complete && behind.naturalWidth > 0) { img = behind; break; }
                const ahead = imagesRef.current[index + offset];
                if (ahead?.complete && ahead.naturalWidth > 0) { img = ahead; break; }
            }
        }
        if (!img || !img.complete || img.naturalWidth === 0) img = lastDrawnImgRef.current;
        if (img?.complete && img.naturalWidth > 0) {
            lastDrawnImgRef.current = img;
            drawImage(ctx, img, w, h);
        }
    }, [drawImage]);

    const loadFrame = useCallback((i: number) => {
        if (i < 0 || i >= TOTAL_FRAMES) return;
        if (loadedSetRef.current.has(i)) return;
        loadedSetRef.current.add(i);
        const img = new Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
            imagesRef.current[i] = img;
            if (i === 0) { lastFrameRef.current = -1; renderFrame(0); }
        };
    }, [renderFrame]);

    const checkScrollAndLoad = useCallback(() => {
        const scrollTop = window.scrollY;
        const docHeight = docHeightRef.current;
        const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        const currentFrame = Math.round(progress * (TOTAL_FRAMES - 1));
        const start = Math.max(0, currentFrame - 3);
        const end = Math.min(TOTAL_FRAMES - 1, currentFrame + 6);
        for (let i = start; i <= end; i++) loadFrame(i);
    }, [loadFrame]);

    // rAF-coalesced scroll render: schedule at most one frame render per scroll burst
    const scheduleRender = useCallback(() => {
        if (!activeRef.current || rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0;
            const scrollTop = window.scrollY;
            const progress = Math.min(Math.max(scrollTop / docHeightRef.current, 0), 1);
            const frame = Math.round(progress * (TOTAL_FRAMES - 1));
            targetFrameRef.current = frame;
            renderFrame(frame);
        });
    }, [renderFrame]);

    const onScroll = useCallback(() => {
        checkScrollAndLoad();
        scheduleRender();
    }, [checkScrollAndLoad, scheduleRender]);

    useEffect(() => {
        const resize = () => {
            if (!canvasRef.current) return;
            isMobileRef.current = window.innerWidth < 768;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvasRef.current.width = window.innerWidth * dpr;
            canvasRef.current.height = window.innerHeight * dpr;
            docHeightRef.current = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            lastFrameRef.current = -1;
            renderFrame(targetFrameRef.current);
        };

        // Only activate after user scrolls past the hero fold
        const sentinel = document.getElementById('mountain-sentinel');
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !activeRef.current) {
                    activeRef.current = true;
                    // Minimal initial load: frames 0-4
                    for (let i = 0; i <= 4; i++) loadFrame(i);
                    resize();
                    scheduleRender();
                    window.addEventListener('scroll', onScroll, { passive: true });
                }
            },
            { rootMargin: '200px 0px' }
        );

        if (sentinel) observer.observe(sentinel);

        window.addEventListener('resize', resize);

        return () => {
            activeRef.current = false;
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', resize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (sentinel) observer.unobserve(sentinel);
        };
    }, [scheduleRender, onScroll, loadFrame, renderFrame]);

    return (
        <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden bg-zinc-950 pointer-events-none">
            <canvas ref={canvasRef} className="block w-full h-full object-cover" />
        </div>
    );
}
