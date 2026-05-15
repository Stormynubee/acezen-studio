'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [shouldExit, setShouldExit] = useState(false);

    const onCompleteRef = useRef(onComplete);

    // Always keep the ref updated to the latest callback without triggering a full effect teardown
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        // If we are already exiting, do nothing and do not reset timers.
        if (shouldExit) return;

        // PERFORMANCE FIX: Exit after 1.2s — don't wait for all assets.
        // The mountain video loads progressively in the background;
        // users should see the site quickly, not stare at a loading screen.
        const exitTimer = setTimeout(() => {
            setShouldExit(true);
            setTimeout(() => onCompleteRef.current(), 600);
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
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-4xl md:text-6xl font-black tracking-tighter text-white"
                    >
                        ACEZEN
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        className="h-[2px] bg-white/20 mt-4 rounded-full overflow-hidden"
                    >
                        <motion.div
                            className="h-full bg-white"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
