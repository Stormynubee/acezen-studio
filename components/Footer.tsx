'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const links = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hansrajtiwari/' },
    { label: 'GitHub', href: 'https://github.com/Stormynubee' },
    { label: 'Portfolio', href: 'https://hansraj-dev.vercel.app/' },
];

export default function Footer() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);
        // Added the user's active Web3Forms Access Key
        formData.append("access_key", "f9237d81-4d93-4504-bd8e-bd3536170da2");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setStatus('idle'), 5000); // Reset after 5s
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (err) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <footer className="bg-black text-white pt-24 pb-8 px-5 md:px-6 rounded-t-2xl md:rounded-t-[3rem] border-t border-white/10 relative z-50 -mt-[10vh]">
            <div className="max-w-7xl mx-auto">

                {/* Minimal Aesthetic Contact Section */}
                <div className="text-center mb-24 md:mb-32 flex flex-col items-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 mb-8"
                    >
                        Start a Conversation
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-16 text-white"
                    >
                        Let&apos;s build together.
                    </motion.h2>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-full max-w-xl flex flex-col gap-8 text-left relative"
                    >
                        <input type="checkbox" name="botcheck" className="hidden" />

                        {/* Email Input */}
                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Your Email Address"
                                className="w-full bg-transparent border-b border-white/20 pb-4 text-lg md:text-xl text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors peer rounded-none"
                            />
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 peer-focus:w-full"
                            />
                        </div>

                        {/* Message Input */}
                        <div className="relative group">
                            <textarea
                                name="message"
                                required
                                placeholder="Tell us about your vision..."
                                rows={1}
                                className="w-full bg-transparent border-b border-white/20 pb-4 text-lg md:text-xl text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none overflow-hidden peer rounded-none"
                                onInput={(e) => {
                                    e.currentTarget.style.height = 'auto';
                                    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                                }}
                            />
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 peer-focus:w-full"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center md:justify-end mt-4">
                            <button
                                type="submit"
                                disabled={status === 'submitting' || status === 'success'}
                                className="relative overflow-hidden rounded-full bg-white text-black px-10 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed group w-full md:w-auto"
                            >
                                <AnimatePresence mode="wait">
                                    {status === 'idle' && (
                                        <motion.span
                                            key="idle"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="block relative z-10"
                                        >
                                            Send Message
                                        </motion.span>
                                    )}
                                    {status === 'submitting' && (
                                        <motion.span
                                            key="submitting"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="block relative z-10"
                                        >
                                            Sending...
                                        </motion.span>
                                    )}
                                    {status === 'success' && (
                                        <motion.span
                                            key="success"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="block relative z-10 text-green-600"
                                        >
                                            Message Sent!
                                        </motion.span>
                                    )}
                                    {status === 'error' && (
                                        <motion.span
                                            key="error"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="block relative z-10 text-red-600"
                                        >
                                            Failed. Try Again.
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            </button>
                        </div>
                    </motion.form>
                </div>

                {/* Link Row */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16 md:mb-24">
                    {links.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            onMouseEnter={() => setHoveredIdx(i)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            className="relative group"
                        >
                            <span className={`text-sm md:text-lg transition-all duration-300 ${hoveredIdx !== null && hoveredIdx !== i ? 'text-white/20' : 'text-white/60 group-hover:text-white'}`}>
                                {link.label}
                            </span>
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                        </motion.a>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-white/20 tracking-wide">AceZen Digital Studio</p>
                    <p className="text-[11px] text-white/20">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
