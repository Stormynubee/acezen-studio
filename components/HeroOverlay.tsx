'use client';

import { motion } from 'framer-motion';

export default function HeroOverlay() {
    return (
        <div className="absolute inset-0 z-0 flex flex-col justify-end pb-16 md:pb-32 px-6 md:px-12 lg:px-24 pointer-events-none text-white overflow-hidden">
            {/* Ambient Base Gradient for Text Legibility */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

            <div className="relative z-10 w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-xs uppercase tracking-[0.4em] mb-3 md:mb-6 text-zinc-400 font-medium font-mono">
                        Digital Reality Architects
                    </p>
                    <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter leading-[0.85] text-white">
                        AceZen<br />
                        <span className="text-zinc-600 block mt-1 md:mt-2">Studio</span>
                    </h1>
                </motion.div>

                {/* Right: Premium Glass Description Pill */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="md:max-w-sm mb-1 md:mb-2"
                >
                    <div className="bg-zinc-900/90 border border-white/5 rounded-2xl p-5 md:p-8 transform-gpu">
                        <p className="text-base md:text-base font-light leading-relaxed text-zinc-300">
                            We transcend traditional development. Engineering cinematic digital realities from system kernels to immersive brand experiences.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <span className="h-[1px] w-12 bg-white/20"></span>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">2026</span>
                        </div>
                    </div>
                </motion.div>
            </div>


        </div>
    );
}
