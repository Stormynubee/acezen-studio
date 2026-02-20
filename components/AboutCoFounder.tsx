'use client';

import { motion } from 'framer-motion';

export default function AboutCoFounder() {
    return (
        <section className="relative py-12 md:py-20 px-5 md:px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 overflow-hidden">

            {/* Background Atmosphere - REMOVED per user request */}

            {/* Visual Side (Left) - Mirroring Founder Layout */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Cinematic ease
                className="w-full md:flex-1 relative aspect-video md:aspect-square max-w-full md:max-w-md perspective-1000"
            >
                <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 relative group shadow-2xl shadow-black/50">
                    {/* Placeholder for 3D Art Showcase */}
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000"
                        alt="3D Art Sculpture"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                    {/* Floating Label */}
                    <div className="absolute bottom-8 left-8">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em] mb-2"
                        >
                            Render Output
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-white font-serif italic text-xl tracking-wide"
                        >
                            "The topology determines the soul."
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            {/* Text Side (Right) */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } },
                    hidden: {}
                }}
                className="flex-1 relative z-10"
            >
                <motion.h2
                    variants={{
                        hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8 } }
                    }}
                    className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-8 leading-[0.9] text-right md:text-left tracking-tight"
                >
                    Visual Director <span className="text-zinc-600">&</span> <br />
                    <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                        Frontend Artisan
                    </span>
                </motion.h2>

                <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 md:mb-14 text-right md:text-left font-light">
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
                        <span className="text-white font-medium">Sayli Changan</span> is a Partner and Co-Founder at AceZen. She brings a dual mastery of high-end 3D artistry and frontend engineering, enabling the creation of immersive digital experiences that maintain visual fidelity without compromising performance.
                    </motion.p>
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
                        Her workflow integrates specialized <span className="text-zinc-200">ZBrush Sculpting</span>, complex <span className="text-zinc-200">Retopology</span> for real-time engines, and precision <span className="text-zinc-200">UV Unwrapping</span>. She combines these asset creation skills with React-based development to build scalable, interactive web architectures.
                    </motion.p>
                    <motion.div
                        variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 1, ease: 'circOut' } } }}
                        className="pl-6 border-l w-full md:w-auto border-white/20 origin-left"
                    >
                        <p className="italic text-zinc-500 text-sm">
                            &ldquo;True optimization happens when the artist understands the rendering pipeline, and the developer respects the polygon count.&rdquo;
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 justify-end md:justify-start">
                    {[
                        '3D Sculpting (ZBrush)',
                        'Retopology Optimization',
                        'UV Unwrapping',
                        'Color Grading (DaVinci)',
                        'Video Editing',
                        'React & Frontend',
                        'Maya / Blender'
                    ].map((skill, i) => (
                        <motion.span
                            key={skill}
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                            }}
                            className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] text-xs md:text-sm text-zinc-300 hover:border-white/20 hover:bg-white/10 transition-colors backdrop-blur-md"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

        </section>
    );
}
