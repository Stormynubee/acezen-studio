'use client';

import { motion, useTransform, useScroll, useVelocity, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const works: { id: number; title: string; category: string; image: string; video?: string }[] = [
    { id: 1, title: 'Sakura Promo', category: 'Video Editing', image: '', video: '/showcase/sakura-promo.mp4' },
    { id: 2, title: 'Xero', category: 'Concept Logo', image: '/showcase/design-1.png' },
    { id: 3, title: 'Apex Finance', category: 'Web Development', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000' },
    { id: 4, title: 'Pristine', category: 'Graphic Design', image: '/showcase/design-2.png' },
    { id: 5, title: 'Umang OS', category: 'Hardware / IoT', image: '/showcase/umang-os.jpg' },
    { id: 6, title: 'Sign Language Gloves', category: 'Assistive Tech', image: '/showcase/sign-gloves.jpg' },
    { id: 7, title: 'Elevate', category: 'Marketing', image: 'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&q=80&w=1000' },
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
        <section ref={targetRef} className="relative h-[150vh] bg-transparent text-white">
            <div className="sticky top-0 flex h-screen flex-col justify-center px-4 gap-3 overflow-hidden">

                {/* Header Section */}
                <div className="flex-none pl-4 md:pl-12 z-10 mb-8 md:mb-16">
                    <h2 className="text-5xl md:text-[8rem] font-bold leading-[0.85] mb-2 tracking-tighter text-white">Selected Works<span className="text-zinc-700">.</span></h2>
                    <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 ml-2">A curation of digital empires</p>
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
                    <motion.div style={{ x: x2 }} className="flex gap-6 pl-24 w-max">
                        {works.slice(2, 5).map((work) => (
                            <WorkCard key={work.id} work={work} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 3 - 2 items */}
                <div className="w-full overflow-hidden">
                    <motion.div style={{ x: x3 }} className="flex gap-6 pl-12 w-max">
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
    // Specifically handle logos to prevent cutting
    const isLogo = work.category === 'Concept Logo';

    return (
        <div className="relative h-[27vh] w-[45vw] min-w-[500px] overflow-hidden bg-zinc-950 group cursor-pointer flex-none border border-white/5 shadow-2xl rounded-sm">
            <div className="absolute inset-0 flex items-center justify-center bg-black">
                {work.video ? (
                    <video
                        src={work.video}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
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
                        className={`transition-all duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 ${isLogo ? 'object-contain p-12' : 'object-cover'}`}
                    />
                )}
            </div>
            {/* Minimal Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-700 pointer-events-none" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400 mb-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{work.category}</p>
                <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white/90 group-hover:text-white transition-colors duration-700">{work.title}</h3>
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
