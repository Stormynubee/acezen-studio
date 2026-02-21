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
        title: 'Video Editing',
        description: 'Cinematic storytelling that captivates using industry-leading cuts.',
        className: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
        video: '/showcase/sakura-promo.mp4',
    },
    {
        key: 'marketing' as const,
        title: 'Marketing',
        description: 'Data-driven strategies to amplify your brand voice.',
        className: 'col-span-1 md:col-span-1 row-span-1',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000', // Teal Data
    },
    {
        key: 'design' as const,
        title: 'Product Design',
        description: 'User-centric interfaces that convert.',
        className: 'col-span-1 md:col-span-1 row-span-1',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000', // Clean UI
    },
    {
        key: 'designing' as const,
        title: 'Designing',
        description: 'Visual identities that stand the test of time.',
        className: 'col-span-1 md:col-span-2 row-span-1',
        image: '/showcase/design-1.png', // Local asset if available, else usage will use this path
    },
];

function SpotlightCard({ service, index, onClick }: { service: typeof services[0], index: number, onClick: () => void }) {
    const divRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || !divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();

        // For the static radial glare
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

        // 3D Tilt calculation
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseEnter = () => {
        if (isMobile) return;
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        setIsHovered(false);
        x.set(0);
        y.set(0);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <motion.div
            ref={divRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={clsx(
                'group relative overflow-hidden rounded-xl p-6 md:p-8 bg-zinc-950 cursor-pointer border border-white/5 transition-colors duration-700',
                service.className
            )}
        >
            {/* Cinematic Media Reveal (Background) */}
            <div className="absolute inset-0 transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-60">
                {service.video ? (
                    <video
                        ref={videoRef}
                        src={service.video}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Image
                        src={service.image!}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                )}
            </div>

            {/* Dark Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />

            {/* Spotlight Glare */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-700 group-hover:opacity-100 mix-blend-screen"
                style={{
                    background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end">
                {/* Arrow Icon */}
                <div className="absolute top-0 right-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white/50 group-hover:text-white transition-colors">
                            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <motion.h3
                    className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 transform transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-4 group-hover:scale-[1.02] origin-left"
                >
                    {service.title}
                </motion.h3>

                <motion.p
                    className="text-zinc-500 text-sm md:text-base font-light max-w-[85%] group-hover:text-zinc-300 transition-all duration-700 transform group-hover:-translate-y-4"
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
        <section className="py-24 md:py-32 px-5 md:px-12 max-w-screen-2xl mx-auto block">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16 md:mb-32 flex justify-between items-end"
            >
                <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none text-white">
                    <ScrambleText text="Expertise" /><span className="text-zinc-800">.</span>
                </h2>
                <p className="hidden md:block text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-mono pb-4">
                    Four Pillars
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[300px] gap-3 md:gap-4">
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
                                {activeModal === 'video' && <VideoShowcase />}
                                {activeModal === 'designing' && <DesignShowcase />}
                                {activeModal === 'marketing' && <MarketingShowcase />}
                                {activeModal === 'building' && <BuildingShowcase />}
                                {activeModal === 'design' && (
                                    <GenericShowcase title="Product Design" />
                                )}
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
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Video Editing</h3>
            <p className="text-gray-400 text-sm mb-8">Cinematic projects crafted with precision.</p>

            <div className="space-y-8">
                <div>
                    <h4 className="text-white font-semibold text-lg mb-3">Sakura Project — Promo</h4>
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
                    <h4 className="text-white font-semibold text-lg mb-3">Nexus Project</h4>
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

/* ── Designing Showcase (Behance pieces) ── */
function DesignShowcase() {
    return (
        <div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Graphic Design</h3>
            <p className="text-gray-400 text-sm mb-8">Visual identities & creative direction.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border border-white/5 bg-black relative aspect-[4/3]">
                    <Image
                        src="/showcase/design-1.png"
                        alt="Design showcase 1"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
                <div className="rounded-xl overflow-hidden border border-white/5 bg-black relative aspect-[4/3]">
                    <Image
                        src="/showcase/design-2.png"
                        alt="Design showcase 2"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

/* ── Marketing Showcase (Client list) ── */
function MarketingShowcase() {
    const clients = [
        { name: 'Doodles NFT', tag: 'NFT Project', desc: 'Marketing strategy and community growth for one of the top NFT collections.' },
        { name: 'Legends of Asian', tag: 'Gaming Project', desc: 'Brand positioning and campaign execution for the gaming community.' },
    ];

    const streamers = [
        { name: 'GTX Preet', handle: '@gtxpreet' },
        { name: 'Lebrangston', handle: '@lebrangston' },
        { name: 'BigBBoiChief', handle: '@bigbboichief' },
        { name: 'Rise Angle', handle: '@riseangle' },
    ];

    return (
        <div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Marketing</h3>
            <p className="text-gray-400 text-sm mb-8">Brands and creators we&apos;ve worked with.</p>

            {/* Projects */}
            <div className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Projects</p>
                <div className="space-y-3">
                    {clients.map((client) => (
                        <div key={client.name} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                {client.name[0]}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-white font-semibold text-sm">{client.name}</h4>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{client.tag}</span>
                                </div>
                                <p className="text-gray-400 text-xs">{client.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Streamers */}
            <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Streamers & Creators</p>
                <div className="grid grid-cols-2 gap-3">
                    {streamers.map((s) => (
                        <div key={s.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                            <p className="text-white font-semibold text-sm">{s.name}</p>
                            <p className="text-gray-500 text-xs">{s.handle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Building Showcase (Hardware projects) ── */
function BuildingShowcase() {
    const projects = [
        {
            title: 'Umang OS',
            tag: 'Desk Assistant',
            desc: 'A custom-built desk assistant prototype with sensors, dashboard interface, and IoT connectivity. Hardware prototyping from scratch.',
            image: '/showcase/umang-os.jpg',
        },
        {
            title: 'Sign Language Gloves',
            tag: 'Assistive Tech',
            desc: 'Low-cost gloves for mute individuals that translate hand gestures into text via flex sensors and an LCD display. Built with Arduino.',
            image: '/showcase/sign-gloves.jpg',
        },
    ];

    return (
        <div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Building</h3>
            <p className="text-gray-400 text-sm mb-8">Hardware prototypes and IoT systems.</p>

            <div className="space-y-8">
                {projects.map((project) => (
                    <div key={project.title} className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.02]">
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-white font-semibold text-lg">{project.title}</h4>
                                <span className="text-[10px] text-white/30 uppercase tracking-wider">{project.tag}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{project.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Generic placeholder for other services ── */
function GenericShowcase({ title }: { title: string }) {
    return (
        <div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">More work coming soon.</p>
        </div>
    );
}
