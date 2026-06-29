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
                window.dispatchEvent(new Event('acezen:form-sent'));
                // @ts-ignore
                if (typeof window !== 'undefined' && window.gtag) {
                    // @ts-ignore
                    window.gtag('event', 'form_submit', { event_category: 'contact' });
                }
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
        <footer id="contact" className="bg-black text-white pt-40 pb-12 px-5 md:px-12 rounded-t-[4rem] border-t border-white/10 relative z-50 -mt-[15vh] shadow-[0_-40px_100px_rgba(0,0,0,0.8)]">
            <div className="max-w-screen-2xl mx-auto">

                {/* Minimal Aesthetic Contact Section */}
                <div className="text-center mb-32 md:mb-48 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                      <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-zinc-500 font-mono">
                          Got a project in mind?
                      </p>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-8 text-white text-editorial"
                    >
                        Let&apos;s build<br />together<span className="text-blue-500">.</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="mb-24 text-zinc-400 text-sm md:text-base max-w-lg"
                    >
                        Skip the forms and red tape. Tell us what you're building, and we'll get back to you today with a plan.
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-full max-w-2xl flex flex-col gap-12 text-left relative"
                    >
                        <input type="checkbox" name="botcheck" className="hidden" />

                        {/* Email Input */}
                        <div className="relative group">
                            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest absolute -top-6 left-0 transition-colors group-focus-within:text-blue-500">
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="your@email.com"
                                className="w-full bg-transparent text-xl md:text-2xl text-white placeholder-white/10 focus:outline-none transition-all peer rounded-none pb-4"
                            />
                            {/* Base Line */}
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
                            {/* Animated Focus Line */}
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-700 peer-focus:w-full z-10"
                            />
                        </div>

                        {/* Message Input */}
                        <div className="relative group">
                            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest absolute -top-6 left-0 transition-colors group-focus-within:text-blue-500">
                                What are we building?
                            </label>
                            <textarea
                                name="message"
                                required
                                placeholder="Tell us about your project or idea..."
                                rows={1}
                                className="w-full bg-transparent text-xl md:text-2xl text-white placeholder-white/10 focus:outline-none transition-all resize-none overflow-hidden peer rounded-none pb-4"
                                onInput={(e) => {
                                    e.currentTarget.style.height = 'auto';
                                    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                                }}
                            />
                            {/* Base Line */}
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
                            {/* Animated Focus Line */}
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-700 peer-focus:w-full z-10"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center md:justify-end mt-8">
                            <button
                                type="submit"
                                disabled={status === 'submitting' || status === 'success'}
                                className="relative overflow-hidden rounded-full bg-white text-black px-12 py-5 text-[10px] tracking-[0.3em] uppercase font-black transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed group w-full md:w-auto"
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
                                            Send message →
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
                                            className="block relative z-10 text-emerald-600"
                                        >
                                            Sent! We'll reply soon
                                        </motion.span>
                                    )}
                                    {status === 'error' && (
                                        <motion.span
                                            key="error"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="block relative z-10"
                                        >
                                            <span className="text-red-500 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Error. Email priyanktiwarif434@gmail.com
                                        </span>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-blue-50 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                            </button>
                        </div>
                        
                        <div className="mt-8 text-center md:text-left">
                            <a href="mailto:priyanktiwarif434@gmail.com" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                                Or email us directly at priyanktiwarif434@gmail.com
                            </a>
                        </div>
                    </motion.form>
                </div>

                {/* Link Row */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-24 md:mb-32">
                    {links.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onMouseEnter={() => setHoveredIdx(i)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            className="relative group"
                        >
                            <span className={`text-base md:text-xl font-medium tracking-tight transition-all duration-500 ${hoveredIdx !== null && hoveredIdx !== i ? 'text-white/20' : 'text-white/60 group-hover:text-white'}`}>
                                {link.label}
                            </span>
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-500 group-hover:w-full" />
                        </motion.a>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/[0.08] pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">AceZen Digital Studio</p>
                      <div className="flex flex-col md:flex-row items-center gap-4">
                      <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">acezen.in</p>
                      </div>
                    </div>
                    <p className="text-[9px] font-mono text-white/30 tracking-widest uppercase">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
