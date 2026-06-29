'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutFounder() {
    return (
        <section className="py-12 md:py-20 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 space-y-12"
            >
                <div>
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[0.9] tracking-tighter text-editorial">
                        System Architect & <br /> 
                        <span className="text-blue-500/80">Creative Engineer</span>
                    </h2>
                    <div className="w-20 h-[1px] bg-blue-500/40" />
                </div>

                <div className="space-y-8 text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                    <p>
                        Founded by <span className="text-white font-medium">Hansraj Tiwari</span>, a developer with over <span className="text-white">9+ years</span> of experience building custom software and high-impact visual media.
                    </p>
                    <p>
                        Dual background in full-stack code and video production. Working across React, Node.js, IoT hardware prototyping, and motion design.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {['System Architecture', 'Full Stack Dev', 'Video Editing', 'Motion Graphics', 'IoT & Hardware', 'React & Node.js'].map((skill) => (
                        <span key={skill} className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-mono text-zinc-500 tracking-wider backdrop-blur-md">
                            {skill}
                        </span>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full lg:w-[45%] relative aspect-[4/5]"
            >
                <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl group">
                    <Image 
                        src="/hansraj.jpg" 
                        alt="Hansraj Tiwari" 
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        priority
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                    />
                    
                    {/* Glass Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
                    
                    {/* Technical Decals */}
                    <div className="absolute bottom-6 left-6 font-mono text-[8px] text-white/30 uppercase tracking-[0.5em] vertical-rl">
                        Kernel_Access_v4.0
                    </div>
                </div>
                
                {/* Corner Accents */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-blue-500/20 rounded-tr-3xl pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-blue-500/20 rounded-bl-3xl pointer-events-none" />
            </motion.div>
        </section>
    );
}
