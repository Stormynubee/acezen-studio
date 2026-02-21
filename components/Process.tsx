'use client';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent, useEffect, useState } from 'react';

const steps = [
    {
        num: '01',
        title: 'Strategy',
        desc: 'Backed by 4 years of shipping products. We dig deep into your business to find the most effective path forward.'
    },
    {
        num: '02',
        title: 'Execution',
        desc: 'A team of 20 designers, devs, and editors. We don\'t outsource. We build custom platforms, stunning visuals, and video content under one roof.'
    },
    {
        num: '03',
        title: 'Delivery',
        desc: 'We launch fast and flawless. Your project goes live optimized for speed, SEO, and user experience on every device.'
    },
];

const ProcessContent = ({ isRevealed = false }: { isRevealed?: boolean }) => {
    return (
        <div className="max-w-screen-2xl mx-auto w-full">
            <div className="flex justify-between items-end mb-16 md:mb-32">
                <h2 className={`text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none ${isRevealed ? 'text-white' : 'text-zinc-900'}`}>
                    Process<span className={isRevealed ? 'text-blue-500' : 'text-zinc-950'}>.</span>
                </h2>
                <p className={`hidden md:block text-[10px] uppercase tracking-[0.4em] font-mono pb-4 ${isRevealed ? 'text-zinc-300' : 'text-zinc-900'}`}>
                    Systematic Excellence
                </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-12 lg:gap-x-24 border-t pt-16 ${isRevealed ? 'border-white/20' : 'border-zinc-900'}`}>
                {steps.map((step, i) => (
                    <div key={i} className="relative group flex flex-col">
                        <span className={`text-[6rem] md:text-[10rem] font-bold leading-none absolute -top-12 md:-top-16 -left-4 md:-left-12 -z-10 select-none ${isRevealed ? 'text-zinc-800' : 'text-zinc-950'}`}>
                            {step.num}
                        </span>

                        <h3 className={`text-2xl md:text-3xl font-bold mb-6 tracking-tight ${isRevealed ? 'text-white' : 'text-zinc-800'}`}>
                            {step.title}
                        </h3>

                        <p className={`leading-relaxed text-sm lg:text-base max-w-sm ${isRevealed ? 'text-zinc-400' : 'text-zinc-800'}`}>
                            {step.desc}
                        </p>

                        <div className="mt-8 overflow-hidden h-10 flex items-center">
                            <div className={`w-full h-[1px] relative ${isRevealed ? 'bg-white/10' : 'bg-zinc-900'}`}>
                                {isRevealed && (
                                    <div className="absolute top-0 left-0 h-full bg-blue-500 w-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Process() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // FIX: Framework hook must remain at the top level, never conditionally nested!
    const maskImageTemplate = useMotionTemplate`radial-gradient(${isHovering ? '450px' : '0px'} circle at ${mouseX}px ${mouseY}px, black 20%, transparent 100%)`;

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            setIsMobile(!!window.matchMedia("(pointer: coarse)")?.matches);
        }
    }, []);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        if (isMobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            className="relative py-32 px-5 md:px-12 bg-black z-10 overflow-hidden cursor-crosshair min-h-screen flex items-center"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* The Dark Base Layer (Visible constantly but extremely dim) */}
            <div className="w-full relative z-10 transition-opacity duration-500">
                <ProcessContent isRevealed={isMobile} />
            </div>

            {/* The Bright "X-Ray" Overlay Layer (Masked by the mouse) */}
            {!isMobile && (
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none py-32 px-5 md:px-12 bg-zinc-950 flex items-center"
                    style={{
                        maskImage: maskImageTemplate,
                        WebkitMaskImage: maskImageTemplate,
                        transition: 'mask-image 0.2s ease-out, -webkit-mask-image 0.2s ease-out',
                    }}
                >
                    <ProcessContent isRevealed={true} />
                </motion.div>
            )}
        </section>
    );
}
