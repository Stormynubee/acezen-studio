'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * MOUNTAIN SCROLL — Smooth Frame Sequence Animation
 * 
 * Fixes applied:
 * 1. FRAME_STEP reduced from 4 → 2 (96 frames instead of 48) for much smoother playback
 * 2. Nearest-frame interpolation: if the target frame isn't loaded yet, finds closest loaded neighbor
 * 3. Increased preload window (10 ahead, 4 behind) to stay ahead of scroll
 * 4. Continuous rAF loop instead of scroll-event-only rendering for buttery transitions
 * 5. Initial batch loads frames 0-8 for above-fold coverage
 */

const TOTAL_ORIGINAL = 192;
const FRAME_STEP = 2; // Load every 2nd frame for 2x smoother animation
const TOTAL_FRAMES = Math.ceil(TOTAL_ORIGINAL / FRAME_STEP); // 96 frames

// Map logical index (0-95) to the actual filename number (1, 3, 5, 7, ...)
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

    const drawImage = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
        const scaleX = w / img.width;
        const scaleY = h / img.height;
        const scale = Math.max(scaleX, scaleY);

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        const x = (w - scaledWidth) / 2;
        let y = (h - scaledHeight) / 2;

        // Mobile: Align towards bottom to show mountain base
        if (isMobileRef.current && scaledHeight > h) {
            y = h - scaledHeight;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    }, []);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (index === lastFrameRef.current) return;
        lastFrameRef.current = index;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;

        // Try the exact frame first
        let img = imagesRef.current[index];

        // If exact frame not loaded, find nearest loaded neighbor
        if (!img || !img.complete || img.naturalWidth === 0) {
            for (let offset = 1; offset <= 5; offset++) {
                // Prefer the frame behind (closer to what user already saw)
                const behind = imagesRef.current[index - offset];
                if (behind && behind.complete && behind.naturalWidth > 0) {
                    img = behind;
                    break;
                }
                const ahead = imagesRef.current[index + offset];
                if (ahead && ahead.complete && ahead.naturalWidth > 0) {
                    img = ahead;
                    break;
                }
            }
        }

        // Final fallback: use last successfully drawn image
        if (!img || !img.complete || img.naturalWidth === 0) {
            img = lastDrawnImgRef.current;
        }

        if (img && img.complete && img.naturalWidth > 0) {
            lastDrawnImgRef.current = img;
            drawImage(ctx, img, w, h);
        }
    }, [drawImage]);

    // Continuous animation loop — smoother than scroll-event-only rendering
    const animationLoop = useCallback(() => {
        const scrollTop = window.scrollY;
        const docHeight = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
        );
        const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        const frame = Math.round(progress * (TOTAL_FRAMES - 1));
        targetFrameRef.current = frame;
        renderFrame(frame);
        rafRef.current = requestAnimationFrame(animationLoop);
    }, [renderFrame]);

    useEffect(() => {
        const resize = () => {
            if (!canvasRef.current) return;
            isMobileRef.current = window.innerWidth < 768;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvasRef.current.width = window.innerWidth * dpr;
            canvasRef.current.height = window.innerHeight * dpr;

            lastFrameRef.current = -1;
            renderFrame(targetFrameRef.current);
        };

        // ── LOADING STRATEGY ──
        // Load a single frame by logical index
        const loadFrame = (i: number) => {
            if (i < 0 || i >= TOTAL_FRAMES) return;
            if (loadedSetRef.current.has(i)) return;
            loadedSetRef.current.add(i);

            const img = new Image();
            img.src = getFrameSrc(i);
            img.onload = () => {
                imagesRef.current[i] = img;
                // If it's the first frame, render immediately
                if (i === 0) {
                    lastFrameRef.current = -1;
                    renderFrame(0);
                }
            };
            img.onerror = () => { /* silent */ };
        };

        // 1. CRITICAL: Load frame 0 immediately (first paint)
        loadFrame(0);

        // 2. Preload frames 1-8 after a short delay (above-fold scroll range)
        setTimeout(() => {
            for (let i = 1; i <= 8; i++) loadFrame(i);
        }, 100);

        // 3. Scroll-aware loading: load frames near the user's scroll position
        const PRELOAD_AHEAD = 10;
        const PRELOAD_BEHIND = 4;

        const checkScrollAndLoad = () => {
            const scrollTop = window.scrollY;
            const docHeight = Math.max(
                document.documentElement.scrollHeight - window.innerHeight,
                1
            );
            const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
            const currentFrame = Math.round(progress * (TOTAL_FRAMES - 1));

            // Load frames in the window [current - BEHIND, current + AHEAD]
            const start = Math.max(0, currentFrame - PRELOAD_BEHIND);
            const end = Math.min(TOTAL_FRAMES - 1, currentFrame + PRELOAD_AHEAD);

            for (let i = start; i <= end; i++) {
                loadFrame(i);
            }
        };

        // 4. Attach scroll listener for progressive loading
        window.addEventListener('scroll', checkScrollAndLoad, { passive: true });
        setTimeout(checkScrollAndLoad, 200);

        // 5. Background load: after 3s, start loading ALL remaining frames
        const bgLoadTimer = setTimeout(() => {
            for (let i = 0; i < TOTAL_FRAMES; i++) {
                // Stagger loads to avoid saturating the network
                setTimeout(() => loadFrame(i), i * 50);
            }
        }, 3000);

        resize();

        // Start continuous animation loop (replaces scroll-event-only rendering)
        rafRef.current = requestAnimationFrame(animationLoop);
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('scroll', checkScrollAndLoad);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafRef.current);
            clearTimeout(bgLoadTimer);
        };
    }, [animationLoop, renderFrame]);

    return (
        <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden bg-zinc-900 pointer-events-none">
            <canvas ref={canvasRef} className="block w-full h-full object-cover" />
        </div>
    );
}
