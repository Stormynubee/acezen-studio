'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TerminalEasterEgg() {
    const [isOpen, setIsOpen] = useState(false);
    const [lines, setLines] = useState<string[]>([]);
    const [inputKey, setInputKey] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen) {
                if (e.key === 'Escape') setIsOpen(false);
                return;
            }

            setInputKey((prev) => {
                const updated = (prev + e.key).slice(-3).toLowerCase();
                if (updated === 'ace') {
                    setIsOpen(true);
                    return '';
                }
                return updated;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setLines([]);
            return;
        }

        const bootSequence = [
            "INITIATING ACEZEN MAINFRAME OVERRIDE...",
            "BYPASSING SECURITY PROTOCOLS...",
            "SUCCESS. ROOT ACCESS GRANTED.",
            " ",
            "    /\\_____/\\",
            "   /  o   o  \\",
            "  ( ==  ^  == )  CYBER PUSS HAS UPLOADED",
            "   )         (   SENSORY DATA TO THE CLOUD.",
            "  (           )",
            " ( (  )   (  ) )",
            "(__(__)___(__)__)",
            " ",
            "Welcome to the internal AceZen node.",
            "If you found this, you look actively beneath the surface.",
            "We like that.",
            " ",
            "> We are always looking for elite engineers and artists.",
            "> Drop us a packet: hello@acezen.in",
            " ",
            "Press ESC to exit the mainframe."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < bootSequence.length) {
                setLines((prev) => [...prev, bootSequence[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 150);

        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="fixed inset-0 z-[100] bg-black text-[#00ff41] p-8 md:p-12 font-mono overflow-auto cursor-text"
                    style={{
                        textShadow: "0 0 5px #00ff41",
                        boxShadow: "inset 0 0 100px rgba(0,255,65,0.1)"
                    }}
                >
                    {/* CRT Scanline Effect */}
                    <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-[101] mix-blend-overlay" />

                    <div className="max-w-3xl mx-auto flex flex-col gap-1 pointer-events-auto selection:bg-[#00ff41] selection:text-black relative z-[102]">
                        {lines.map((line, i) => (
                            <pre key={i} className="whitespace-pre-wrap break-words text-sm md:text-base">
                                {line}
                            </pre>
                        ))}
                        {lines.length > 0 && (
                            <motion.div
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-3 h-5 bg-[#00ff41] mt-2 inline-block"
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
