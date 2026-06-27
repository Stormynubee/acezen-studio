'use client';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent, useEffect, useState } from 'react';

const steps = [
    {
        num: '01',
        title: 'Discover',
        desc: 'We align fast — goals, audience, constraints. No bloated discovery sprints. Backed by 4 years of shipping real products.'
    },
    {
        num: '02',
        title: 'Design',
        desc: 'Visual direction and a working prototype before heavy engineering begins. You see it before we build it.'
    },
    {
        num: '03',
        title: 'Build',
        desc: 'Founder-led execution — a dedicated studio of 6 across engineering, content, and design. No outsourcing. No handoffs.'
    },
    {
        num: '04',
        title: 'Launch',
        desc: 'We deploy, measure, and refine. Optimized for speed, SEO, and every device. We don\'t disappear at handoff.'
    },
];

const ProcessContent = ({ isRevealed = false }: { isRevealed?: boolean }) => {
    return (
        <div className="max-w-screen-2xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 md:mb-40 gap-8">
                <h2 className={`text-6xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-none text-editorial ${isRevealed ? 'text-white' : 'text-zinc-900'}`}>
                    Process<span className={isRevealed ? 'text-[var(--az-accent)]' : 'text-zinc-950'} style={isRevealed ? { color: 'var(--az-accent)' } : {}}>.</span>
                </h2>
                <div className="flex flex-col items-start md:items-end gap-4 pb-6">
                  <p className={`text-[10px] uppercase tracking-[0.5em] font-mono ${isRevealed ? 'text-zinc-400' : 'text-zinc-900'}`}>
                      Systematic Excellence
                  </p>
                  <div className={`w-16 h-[1px] ${isRevealed ? 'bg-white/10' : 'bg-zinc-900'}`} />
                </div>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-24 md:gap-x-10 lg:gap-x-16 border-t pt-20 ${isRevealed ? 'border-white/10' : 'border-zinc-900'}`}>
                {steps.map((step, i) => (
                    <div key={i} className="relative group flex flex-col">
                        <span className={`text-[8rem] md:text-[12rem] font-bold leading-none absolute -top-16 md:-top-24 -left-4 md:-left-16 -z-10 select-none transition-all duration-700 ${isRevealed ? 'text-zinc-900/50 group-hover:text-[var(--az-accent)] group-hover:opacity-15' : 'text-zinc-950'}`}>
                            {step.num}
                        </span>

                        <div className="flex items-center gap-4 mb-8">
                          <div className={`w-2 h-2 rounded-full transition-colors duration-700 ${isRevealed ? 'bg-[var(--az-accent)]' : 'bg-zinc-900'}`} style={isRevealed ? { backgroundColor: 'var(--az-accent)' } : {}} />
                          <h3 className={`text-3xl md:text-4xl font-bold tracking-tighter ${isRevealed ? 'text-white' : 'text-zinc-800'}`}>
                              {step.title}
                          </h3>
                        </div>

                        <p className={`leading-relaxed text-base lg:text-lg max-w-sm font-light transition-colors duration-700 ${isRevealed ? 'text-zinc-400 group-hover:text-zinc-200' : 'text-zinc-800'}`}>
                            {step.desc}
                        </p>

                        <div className="mt-12 overflow-hidden h-px flex items-center w-full relative">
                            <div className={`w-full h-full relative ${isRevealed ? 'bg-white/5' : 'bg-zinc-900'}`}>
                                {isRevealed && (
                                    <div className="absolute top-0 left-0 h-full bg-[var(--az-accent)] w-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-[0.16,1,0.3,1]" style={{ backgroundColor: 'var(--az-accent)' }} />
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

    const maskImageTemplate = useMotionTemplate`radial-gradient(${isHovering ? '550px' : '0px'} circle at ${mouseX}px ${mouseY}px, black 25%, transparent 100%)`;

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            const isCoarse = !!window.matchMedia("(pointer: coarse)")?.matches;
            setTimeout(() => setIsMobile(isCoarse), 0);
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
            className="relative py-48 px-5 md:px-12 bg-black z-10 overflow-hidden cursor-none min-h-screen flex items-center"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Custom Process Cursor */}
            <motion.div 
              className="absolute w-4 h-4 bg-[var(--az-accent)] rounded-full z-[100] pointer-events-none mix-blend-difference lg:block hidden"
              style={{
                left: mouseX,
                top: mouseY,
                x: "-50%",
                y: "-50%",
                backgroundColor: 'var(--az-accent)'
              }}
              animate={{
                scale: isHovering ? 1 : 0,
                opacity: isHovering ? 1 : 0
              }}
            />

            {/* The Dark Base Layer */}
            <div className="w-full relative z-10 transition-opacity duration-500">
                <ProcessContent isRevealed={isMobile} />
            </div>

            {/* The Bright "X-Ray" Overlay Layer */}
            {!isMobile && (
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none py-48 px-5 md:px-12 bg-zinc-950 flex items-center"
                    style={{
                        maskImage: maskImageTemplate,
                        WebkitMaskImage: maskImageTemplate,
                        transition: 'mask-image 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <ProcessContent isRevealed={true} />
                </motion.div>
            )}
        </section>
    );
}
