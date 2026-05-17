'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface PussSideBarProps {
    hovered?: boolean;
}

export interface PussSideBarHandle {
    getCurrentTime: () => number;
}

const PussSideBar = forwardRef<PussSideBarHandle, PussSideBarProps>(function PussSideBar(
    { hovered = false },
    ref
) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Expose currentTime so parent can sync the expanded video
    useImperativeHandle(ref, () => ({
        getCurrentTime: () => videoRef.current?.currentTime ?? 0,
    }));

    // Lazy-load: only start video when section scrolls into view
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible && videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    }, [isVisible]);

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                animate={hovered ? { scale: 1.04, opacity: 0.6 } : { scale: 1, opacity: 0.9 }}
                className="relative w-full h-full"
            >
                {/* Narrow preview video — object-cover fills container, no letterbox */}
                <video
                    ref={videoRef}
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover object-center"
                >
                    <source src="/images/puss-bongo-v2.mp4" type="video/mp4" />
                </video>

                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px]" />

                {/* Hover hint badge */}
                <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={hovered ? { opacity: 0, y: -4 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-3 right-3 pointer-events-none"
                >
                    <span className="text-[9px] font-mono text-white/25 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-full">
                        hover
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
});

export default PussSideBar;
