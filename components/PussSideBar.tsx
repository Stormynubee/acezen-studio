'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function PussSideBar() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

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
                className="relative w-full h-full"
            >
                {/* Optimized Video Loop — lazy loaded, preload=none */}
                <video
                    ref={videoRef}
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover object-center opacity-80 scale-[1.4] origin-top"
                >
                    <source src="/images/puss-bongo-v2.mp4" type="video/mp4" />
                </video>

                {/* Glitch Overlay Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none"
                />

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px]" />
            </motion.div>
        </div>
    );
}

