'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import ScrambleText from './ScrambleText';

type ServiceKey = 'video' | 'marketing' | 'design' | 'designing' | 'building' | null;

const services = [
    {
        key: 'video' as const,
        title: 'Digital Marketing',
        description: 'Growth campaigns, brand positioning, and content strategies designed to reach real audiences.',
        className: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
        video: '/showcase/sakura-promo.mp4',
    },
    {
        key: 'marketing' as const,
        title: 'Web & App Dev',
        description: 'Fast Next.js web apps, mobile builds, and custom AI tools designed for real users.',
        className: 'col-span-1 md:col-span-1 row-span-1',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    },
    {
        key: 'design' as const,
        title: 'Brand & Design',
        description: 'Logos, UI/UX systems, and brand directions that actually make people stop scrolling.',
        className: 'col-span-1 md:col-span-1 row-span-1',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000',
    },
    {
        key: 'designing' as const,
        title: 'Motion & Edits',
        description: 'High-octane video editing, 3D renders, and content assets for creators and brands.',
        className: 'col-span-1 md:col-span-2 row-span-1',
        image: '/showcase/design-1.png',
    },
];

function SpotlightCard({ service, index, onClick }: { service: typeof services[0], index: number, onClick: () => void }) {
    const divRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [mediaLoaded, setMediaLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            const isCoarse = !!window.matchMedia("(pointer: coarse)")?.matches;
            setTimeout(() => setIsMobile(isCoarse), 0);
        }
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                videoRef.current.play().catch(() => {});
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isHovered]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        if (isMobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
        setPosition({ x: clientX - left, y: clientY - top });
    }

    return (
        <motion.div
            ref={divRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className={clsx(
                'group relative rounded-3xl p-8 md:p-10 overflow-hidden bg-zinc-950/80 border border-white/5 cursor-pointer flex flex-col justify-between transition-all duration-700 hover:border-white/20 hover:shadow-[0_0_50px_rgba(0,0,0,0.8)]',
                service.className
            )}
        >
            {/* Background Media */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                {service.video ? (
                    <video
                        ref={videoRef}
                        src={service.video}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onLoadedData={() => setMediaLoaded(true)}
                        className={clsx(
                            "w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 opacity-40 group-hover:opacity-80",
                            !mediaLoaded && "scale-105 blur-sm"
                        )}
                    />
                ) : (
                    <Image
                        src={service.image!}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="eager"
                        onLoad={() => setMediaLoaded(true)}
                        className="object-cover transition-transform duration-1000 group-hover:scale-100 scale-110 opacity-40 group-hover:opacity-80"
                    />
                )}
            </div>

            {/* Inner Rim Light / Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    boxShadow: 'inset 0 0 40px rgba(255,255,255,0.02), inset 0 0 100px rgba(200,169,126,0.03)',
                }}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-100 transition-opacity duration-700" />

            {/* Spotlight Glare */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-700 group-hover:opacity-100 mix-blend-overlay"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end translate-z-20">
                <div className="absolute top-0 right-0 transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:opacity-100 opacity-40">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-white/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <motion.h3
                    className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-3 transform transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-2 origin-left"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    {service.title}
                </motion.h3>

                <motion.p
                    className="text-zinc-400 text-sm md:text-base font-light max-w-[90%] group-hover:text-zinc-200 transition-all duration-700 transform group-hover:-translate-y-2 leading-relaxed"
                >
                    {service.description}
                </motion.p>
            </div>
        </motion.div>
    );
}

export default function ServicesBento() {
    const [activeModal, setActiveModal] = useState<ServiceKey>(null);

    return (
        <section id="services" className="py-24 md:py-48 px-5 md:px-12 max-w-screen-2xl mx-auto block">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16 md:mb-40 flex flex-col md:flex-row md:justify-between md:items-end gap-8"
            >
                <h2 className="text-[clamp(3.5rem,8vw,12rem)] font-bold tracking-tighter leading-none text-white text-editorial">
                    <ScrambleText text="Expertise" /><span className="text-zinc-800">.</span>
                </h2>
                <div className="flex flex-col items-start md:items-end gap-4 pb-4">
                  <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-[0.5em] font-mono">
                      What we bring to the table
                  </p>
                  <div className="w-16 h-[1px] bg-white/10" />
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[300px] gap-3 md:gap-4">
                {services.map((service, index) => (
                    <SpotlightCard
                        key={service.title}
                        service={service}
                        index={index}
                        onClick={() => setActiveModal(service.key)}
                    />
                ))}
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setActiveModal(null)}
                        className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-950 border border-white/10 rounded-2xl md:rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto"
                        >
                            {/* Close button */}
                            <div className="sticky top-0 z-10 flex justify-end p-4">
                                <button
                                    onClick={() => setActiveModal(null)}
                                    aria-label="Close modal"
                                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="px-6 md:px-10 pb-10 -mt-4">
                                {activeModal === 'video' && <MarketingShowcase />}
                                {activeModal === 'marketing' && <WebAppShowcase />}
                                {activeModal === 'design' && <DesignShowcase />}
                                {activeModal === 'designing' && <VideoShowcase />}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

/* ── Video Editing Showcase ── */
function VideoShowcase() {
    return (
        <div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Motion &amp; Edits</h3>
            <p className="text-zinc-400 text-sm mb-8">High-octane promo edits, motion graphics, and 3D visual cuts.</p>

            <div className="space-y-8">
                <div>
                    <h4 className="text-white font-semibold text-lg mb-3">Sakura Promo — Commercial Motion Cut</h4>
                    <div className="rounded-xl overflow-hidden bg-black border border-white/5">
                        <video
                            src="/showcase/sakura-promo.mp4"
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full aspect-video"
                        />
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-semibold text-lg mb-3">Nexus Motion Reel</h4>
                    <div className="rounded-xl overflow-hidden bg-black border border-white/5">
                        <video
                            src="/showcase/neues-projekt.mp4"
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full aspect-video"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function DesignShowcase() {
    return (
        <div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Brand &amp; Design</h3>
            <p className="text-zinc-400 text-sm mb-8">Logos, visual identity systems, and UI/UX directions.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border border-white/5 bg-black relative aspect-[4/3]">
                    <Image
                        src="/showcase/design-1.png"
                        alt="DianaStreams Brand System"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
                <div className="rounded-xl overflow-hidden border border-white/5 bg-black relative aspect-[4/3]">
                    <Image
                        src="/showcase/design-2.png"
                        alt="Pristine Visual Identity"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

function WebAppShowcase() {
    const projects = [
        { name: 'BizCatcher', tag: 'Lead Generation SaaS', desc: 'High-performance discovery engine with Next.js 16 and OpenStreetMap.', link: 'https://github.com/Stormynubee/BizCatcher' },
        { name: 'RetainIQ', tag: 'Causal ML Engine', desc: 'Cost-aware retention model for IIT Kharagpur reducing customer churn costs by 68.8%.', link: 'https://github.com/Stormynubee/retainiq-churnzero-26' },
        { name: 'AceBoard Sync', tag: 'Micro-SaaS', desc: 'Next.js application letting video editors share timestamped review links with clients.', link: 'https://github.com/Stormynubee/aceboard-client-sync' },
        { name: 'MineHealth OS', tag: 'Gamified AI Dashboard', desc: 'Minecraft-inspired Life OS with AI integration and habit tracking.', link: 'https://github.com/Stormynubee/MineHealthftw' },
    ];

    return (
        <div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Web &amp; App Dev</h3>
            <p className="text-zinc-400 text-sm mb-8">Full-stack Web &amp; Mobile applications built with modern frameworks.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p) => (
                    <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer" className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all group block">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-semibold text-base group-hover:text-blue-400 transition-colors">{p.name}</h4>
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">{p.tag}</span>
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed">{p.desc}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}

function MarketingShowcase() {
    const clients = [
        { name: 'Doodles NFT', tag: 'Community Growth', desc: 'Marketing strategy and community growth campaign.' },
        { name: 'Legends of Asian', tag: 'Gaming Campaign', desc: 'Brand positioning and gaming community launch.' },
    ];

    const streamers = [
        { name: 'GTX Preet', handle: '@gtxpreet' },
        { name: 'Lebrangston', handle: '@lebrangston' },
        { name: 'BigBBoiChief', handle: '@bigbboichief' },
        { name: 'Rise Angle', handle: '@riseangle' },
    ];

    return (
        <div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Digital Marketing</h3>
            <p className="text-zinc-400 text-sm mb-8">Campaign strategies, community growth, and creator partnerships.</p>

            <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4 font-mono">Brand Campaigns</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clients.map((client) => (
                        <div key={client.name} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                {client.name[0]}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-white font-semibold text-sm">{client.name}</h4>
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">{client.tag}</span>
                                </div>
                                <p className="text-zinc-400 text-xs">{client.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4 font-mono">Streamers &amp; Creators</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {streamers.map((s) => (
                        <div key={s.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                            <p className="text-white font-semibold text-sm">{s.name}</p>
                            <p className="text-zinc-500 text-xs font-mono mt-1">{s.handle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
