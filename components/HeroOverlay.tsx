'use client';

import { motion } from 'framer-motion';

export default function HeroOverlay() {
    return (
        <div className="absolute inset-0 z-0 flex flex-col justify-center lg:justify-end pb-0 lg:pb-32 px-6 lg:px-24 pointer-events-none text-white overflow-hidden">
            {/* Mobile: full-screen gradient for legibility over mountain */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 lg:hidden" />
            {/* Desktop: bottom gradient only */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 hidden lg:block" />

            <div className="relative z-10 w-full max-w-screen-2xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-sm uppercase tracking-[0.4em] mb-3 lg:mb-6 text-zinc-300 lg:text-zinc-400 font-medium font-mono">
                        Digital Reality Architects
                    </p>
                    <h1 className="text-[4.5rem] sm:text-8xl lg:text-[12rem] font-bold tracking-tighter leading-[0.85] text-white">
                        AceZen<br />
                        <span className="text-zinc-400 lg:text-zinc-600 block mt-1 lg:mt-2">Studio</span>
                    </h1>
                </motion.div>

                {/* Description Pill */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:max-w-sm mt-4 lg:mt-0 mb-1 lg:mb-2"
                >
                    <div className="bg-zinc-900/80 lg:bg-zinc-900/90 border border-white/10 rounded-2xl p-5 lg:p-8 transform-gpu backdrop-blur-sm">
                        <p className="text-base font-light leading-relaxed text-zinc-200 lg:text-zinc-300">
                            We transcend traditional development. Engineering cinematic digital realities from system kernels to immersive brand experiences.
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                            <span className="h-[1px] w-12 bg-white/20"></span>
                            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">2026</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
