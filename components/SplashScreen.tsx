'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function SplashScreen() {
    const [shouldExit, setShouldExit] = useState(false);

    useEffect(() => {
        // If we are already exiting, do nothing and do not reset timers.
        if (shouldExit) return;

        // PERFORMANCE FIX: Exit after 1.2s — don't wait for all assets.
        // The mountain video loads progressively in the background;
        // users should see the site quickly, not stare at a loading screen.
        const exitTimer = setTimeout(() => {
            setShouldExit(true);
        }, 1200);

        return () => clearTimeout(exitTimer);
    }, [shouldExit]);

    return (
        <AnimatePresence>
            {!shouldExit && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
                >
                    <div className="relative flex flex-col items-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-7xl font-black tracking-[-0.08em] text-white text-editorial"
                        >
                            AceZen
                        </motion.h1>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-8 whitespace-nowrap"
                        >
                            <span className="text-[8px] font-mono uppercase tracking-[0.6em] text-blue-500/50">
                                Architecting_Digital_Reality
                            </span>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-12 flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 140 }}
                            className="h-[1px] bg-white/10 relative overflow-hidden"
                        >
                            <motion.div
                                className="h-full bg-blue-500/40"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                            />
                        </motion.div>
                        <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase">System Initialization</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
