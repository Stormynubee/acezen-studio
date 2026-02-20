'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const links = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hansrajtiwari/' },
    { label: 'GitHub', href: 'https://github.com/Stormynubee' },
    { label: 'Portfolio', href: 'https://hansraj-dev.vercel.app/' },
];

export default function Footer() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <footer className="bg-black text-white pt-24 pb-8 px-5 md:px-6 rounded-t-2xl md:rounded-t-[3rem] border-t border-white/10 relative z-50 -mt-[10vh]">
            <div className="max-w-7xl mx-auto">

                {/* Main CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-24"
                >
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/30 mb-4 md:mb-6">Get in touch</p>
                    <a
                        href="mailto:priyanktiwari434@gmail.com"
                        className="group inline-block"
                    >
                        <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold tracking-tighter transition-colors duration-300 group-hover:text-white/60">
                            Say Hello.
                        </h2>
                        <div className="h-[2px] bg-white/20 mt-2 md:mt-4 overflow-hidden">
                            <motion.div
                                className="h-full bg-white"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '0%' }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </a>
                </motion.div>

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
