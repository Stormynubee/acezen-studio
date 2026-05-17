'use client';

import { motion, useTransform, useScroll, useVelocity, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const works: { id: number; title: string; category: string; image: string; video?: string }[] = [
    { id: 1, title: 'Sakura Promo', category: 'Video Editing', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1000' },
    { id: 2, title: 'Xero', category: 'Concept Logo', image: '/showcase/design-1.png' },
    { id: 3, title: 'Apex Finance', category: 'Web Development', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000' },
    { id: 4, title: 'Pristine', category: 'Graphic Design', image: '/showcase/design-2.png' },
    { id: 5, title: 'Umang OS', category: 'Hardware / IoT', image: '/showcase/umang-os.jpg' },
    { id: 6, title: 'Sign Language Gloves', category: 'Assistive Tech', image: '/showcase/sign-gloves.jpg' },
    { id: 7, title: 'Elevate', category: 'Marketing', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000' },
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

    // Row 1 (Top) - 2 items
    const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
    // Row 2 (Middle) - 3 items
    const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
    // Row 3 (Bottom) - 2 items
    const x3 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

    return (
        <section ref={targetRef} className="relative h-[170vh] bg-transparent text-white">
            <div className="sticky top-0 flex h-screen flex-col justify-center px-4 gap-4 overflow-hidden">

                {/* Header Section */}
                <div className="flex-none pl-4 md:pl-16 z-10 mb-4 md:mb-12">
                    <h2 className="text-[clamp(3.5rem,8vw,10rem)] font-bold leading-[0.85] mb-4 md:mb-6 tracking-tighter text-white text-editorial">
                      Selected Works<span className="text-zinc-800">.</span>
                    </h2>
                    <div className="flex items-center gap-4 ml-2">
                      <div className="w-12 h-[1px] bg-white/20" />
                      <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.45em] text-zinc-500">Curation of Digital Empires</p>
                    </div>
                </div>


                {/* Row 1 - 2 items */}
                <div className="w-full overflow-hidden">
                    <motion.div style={{ x: x1 }} className="flex gap-6 pl-4 w-max">
                        {works.slice(0, 2).map((work) => (
                            <WorkCard key={work.id} work={work} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - 3 items */}
                <div className="w-full overflow-hidden">
                    <motion.div style={{ x: x2 }} className="flex gap-6 pl-32 w-max">
                        {works.slice(2, 5).map((work) => (
                            <WorkCard key={work.id} work={work} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 3 - 2 items */}
                <div className="w-full overflow-hidden">
                    <motion.div style={{ x: x3 }} className="flex gap-6 pl-16 w-max">
                        {works.slice(5).map((work) => (
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
    const isLogo = work.category === 'Concept Logo';

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div 
            onMouseMove={handleMouseMove}
            className="relative h-[22vh] w-[40vw] min-w-[400px] overflow-hidden bg-zinc-950 group cursor-pointer flex-none border border-white/5 shadow-2xl rounded-xl transition-all duration-700 hover:border-white/20 hover:shadow-[0_0_80px_rgba(0,0,0,0.5)]"
        >
            <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
                {work.video ? (
                    <video
                        src={work.video}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000"
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
                        className={`transition-all duration-1000 scale-110 group-hover:scale-100 opacity-60 group-hover:opacity-90 ${isLogo ? 'object-contain p-10' : 'object-cover'}`}
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
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-700 pointer-events-none z-10" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 p-6 lg:p-8 w-full z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                <div className="flex items-center gap-3 mb-2 lg:mb-3 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    <span className="w-6 h-[1px] bg-blue-500" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-400 font-medium">{work.category}</p>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-white/90 group-hover:text-white transition-colors duration-700" style={{ fontFamily: 'var(--font-display)' }}>{work.title}</h3>
            </div>
        </div>
    );
}

function MobileWorkShowcase() {
    return (
        <section className="py-24 px-6 text-white bg-transparent">
            <div className="mb-16">
                <h2 className="text-5xl font-bold leading-[0.85] tracking-tighter mb-4 text-white">Selected<br />Works<span className="text-zinc-700">.</span></h2>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">A curation of digital outputs</p>
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
                                    className="w-full h-full object-cover opacity-90"
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
                                    className={`object-cover opacity-90 ${work.category === 'Concept Logo' ? 'object-contain p-12' : ''}`}
                                />
                            )}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400 mb-2">{work.category}</p>
                            <h3 className="text-3xl font-bold tracking-tighter text-white">{work.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
