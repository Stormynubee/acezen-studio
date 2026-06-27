'use client';

import { motion, useTransform, useScroll, useVelocity, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const works: { id: number; title: string; category: string; desc: string; image: string; video?: string; github?: string }[] = [
    { id: 1, title: 'Sign Language Gloves', category: 'Assistive Tech & Hardware', desc: 'ESP32 wearable translating flex-sensor hand gestures to speech in real time.', image: '/showcase/sign-gloves.jpg', github: 'https://github.com/Stormynubee' },
    { id: 2, title: 'Aether Hands', category: 'Computer Vision & AI', desc: 'Native gesture computer control system with a cyberpunk Ghost HUD dashboard.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000', github: 'https://github.com/Stormynubee/aether-hands' },
    { id: 3, title: 'MineHealth OS', category: 'AI Life OS & Gamification', desc: 'Minecraft-themed Life OS dashboard with AI integration and agentic productivity.', image: '/showcase/minehealth.png', github: 'https://github.com/Stormynubee/MineHealthftw' },
    { id: 4, title: 'Margi RoadSoS', category: 'Mobile & Offline-First', desc: 'Offline-first Golden Hour emergency navigation co-pilot for IIT Madras RoadSoS 2026.', image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1000', github: 'https://github.com/Stormynubee/Margi' },
    { id: 5, title: 'RetainIQ', category: 'Causal ML & Analytics', desc: 'Cost-aware retention engine reducing business churn costs by 68.8%. IIT Kharagpur 26.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000', github: 'https://github.com/Stormynubee/retainiq-churnzero-26' },
    { id: 6, title: 'BizCatcher', category: 'Full-Stack & LeadGen', desc: 'High-performance business discovery engine with Next.js 16 and OpenStreetMap.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000', github: 'https://github.com/Stormynubee/BizCatcher' },
    { id: 7, title: 'AceBoard Sync', category: 'Video Micro-SaaS', desc: 'Next.js micro-SaaS for video editors to share timestamped review links with clients.', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1000', github: 'https://github.com/Stormynubee/aceboard-client-sync' },
    { id: 8, title: 'Pristine Branding', category: 'Visual Systems & Identity', desc: 'Full physical & digital brand identity system.', image: '/showcase/design-2.png' },
    { id: 9, title: 'Sakura Promo', category: 'Motion & Cinematic Edit', desc: 'High-octane promo video editing and motion work.', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1000', video: '/showcase/sakura-promo.mp4' },
];

export default function WorkShowcase() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    if (isMobile) return <MobileWorkShowcase />;
    return <DesktopWorkShowcase />;
}

function DesktopWorkShowcase() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });

    // Row 1 (Top) - 3 items
    const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
    // Row 2 (Middle) - 3 items
    const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
    // Row 3 (Bottom) - 3 items
    const x3 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);

    return (
        <section id="work" ref={targetRef} className="relative h-[200vh] bg-transparent text-white">
            <div className="sticky top-0 flex h-screen flex-col justify-center px-4 gap-4 overflow-hidden">

                {/* Header Section */}
                <div className="flex-none pl-4 md:pl-16 z-10 mb-2 md:mb-6">
                    <h2 className="text-[clamp(3.5rem,8vw,9rem)] font-bold leading-[0.85] mb-2 md:mb-4 tracking-tighter text-white text-editorial">
                      Selected Works<span className="text-zinc-800">.</span>
                    </h2>
                    <div className="flex items-center gap-4 ml-2">
                      <div className="w-12 h-[1px] bg-white/20" />
                      <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.45em] text-zinc-500">Flagship Engineering &amp; Design</p>
                    </div>
                </div>


                {/* Row 1 - 3 items */}
                <div className="w-full overflow-hidden">
                    <motion.div style={{ x: x1 }} className="flex gap-6 pl-4 w-max">
                        {works.slice(0, 3).map((work) => (
                            <WorkCard key={work.id} work={work} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - 3 items */}
                <div className="w-full overflow-hidden">
                    <motion.div style={{ x: x2 }} className="flex gap-6 pl-32 w-max">
                        {works.slice(3, 6).map((work) => (
                            <WorkCard key={work.id} work={work} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 3 - 3 items */}
                <div className="w-full overflow-hidden">
                    <motion.div style={{ x: x3 }} className="flex gap-6 pl-16 w-max">
                        {works.slice(6, 9).map((work) => (
                            <WorkCard key={work.id} work={work} />
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

function WorkCard({ work }: { work: typeof works[0] }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div 
            onMouseMove={handleMouseMove}
            className="relative h-[24vh] w-[38vw] min-w-[420px] overflow-hidden bg-zinc-950 group cursor-pointer flex-none border border-white/5 shadow-2xl rounded-xl transition-all duration-700 hover:border-white/20 hover:shadow-[0_0_80px_rgba(0,0,0,0.5)]"
        >
            <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
                {work.video ? (
                    <video
                        src={work.video}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-85 group-hover:scale-105 transition-all duration-1000"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="transition-all duration-1000 scale-110 group-hover:scale-100 opacity-50 group-hover:opacity-85 object-cover"
                    />
                )}
            </div>

            {/* Follow Light Gradient */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10 mix-blend-overlay"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.12), transparent 80%)`,
                }}
            />

            {/* Inner Shimmer Rim Light */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-20"
                style={{
                    boxShadow: 'inset 0 0 60px rgba(255,255,255,0.03), inset 0 0 0 1px rgba(255,255,255,0.05)',
                }}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-700 pointer-events-none z-10" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 p-6 lg:p-8 w-full z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                <div className="flex items-center justify-between mb-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-70">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-blue-500" />
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400 font-medium">{work.category}</p>
                    </div>
                    {work.github && (
                        <a 
                            href={work.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            GitHub ↗
                        </a>
                    )}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tighter text-white/90 group-hover:text-white transition-colors duration-700 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{work.title}</h3>
                <p className="text-xs text-zinc-400 font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 max-w-[90%]">{work.desc}</p>
            </div>
        </div>
    );
}

function MobileWorkShowcase() {
    return (
        <section className="py-24 px-6 text-white bg-transparent">
            <div className="mb-16">
                <h2 className="text-5xl font-bold leading-[0.85] tracking-tighter mb-4 text-white">Selected<br />Works<span className="text-zinc-700">.</span></h2>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Flagship Engineering &amp; Design</p>
            </div>

            <div className="flex flex-col gap-8">
                {works.map((work, i) => (
                    <motion.div
                        key={work.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative h-[120vw] max-h-[500px] w-full overflow-hidden bg-zinc-950 border border-white/5 shadow-2xl rounded-sm"
                    >
                        <div className="absolute inset-0 flex items-center justify-center bg-black">
                            {work.video ? (
                                <video
                                    src={work.video}
                                    className="w-full h-full object-cover opacity-80"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <Image
                                    src={work.image}
                                    alt={work.title}
                                    fill
                                    sizes="100vw"
                                    className="object-cover opacity-80"
                                />
                            )}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400">{work.category}</p>
                                {work.github && (
                                    <a href={work.github} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-zinc-400 bg-white/10 px-2 py-0.5 rounded">
                                        GitHub ↗
                                    </a>
                                )}
                            </div>
                            <h3 className="text-3xl font-bold tracking-tighter text-white mb-2">{work.title}</h3>
                            <p className="text-xs text-zinc-400 font-light leading-relaxed">{work.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
