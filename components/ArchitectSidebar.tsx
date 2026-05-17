'use client';

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { useAtmosphere } from './AtmosphereContext';

export default function ArchitectSidebar() {
  const { isActive, setIsActive } = useAtmosphere();
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(Math.round(latest * 100));
  });

  return (
    <>
      {/* ── THE VERTICAL STRIP ── */}
      <motion.aside
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 h-screen w-12 lg:w-16 z-[70] border-l border-white/5 bg-black/20 backdrop-blur-md flex flex-col items-center py-12 justify-between hidden md:flex"
      >
        {/* Top: Architectural Metrics */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] font-mono text-zinc-700 tracking-[0.4em]">VER</span>
            <span className="text-[9px] font-mono text-zinc-500 tabular-nums">4.0.2</span>
          </div>
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        {/* Center: THE ARCHITECTURAL COMPASS (Atmosphere Trigger) */}
        <button
          onClick={() => setIsActive(!isActive)}
          className="group relative flex flex-col items-center gap-6"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Inner Rotating HUD - Mechanical feel */}
            <motion.div 
                className="absolute inset-0 border border-white/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
                className="absolute inset-1.5 border border-blue-500/20 rounded-sm"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            {/* The Precision Core */}
            <div className="relative w-6 h-6 flex items-center justify-center glass-panel rounded-full border-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                <motion.div 
                    className={`w-1.5 h-1.5 rounded-full transition-shadow duration-500 ${isActive ? 'bg-white shadow-[0_0_15px_white]' : 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]'}`}
                    animate={{ scale: isActive ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* HUD Crosshairs */}
                <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[1px] h-1 bg-white/20" />
                <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-[1px] h-1 bg-white/20" />
                <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-[1px] bg-white/20" />
                <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-1 h-[1px] bg-white/20" />
            </div>

            {/* Selection Pulse Overlay */}
            <AnimatePresence>
                {isActive && (
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.6, opacity: 0.2 }}
                        exit={{ scale: 2, opacity: 0 }}
                        className="absolute inset-0 bg-white rounded-full pointer-events-none"
                    />
                )}
            </AnimatePresence>
          </div>
          
          <span className="[writing-mode:vertical-rl] text-[9px] font-mono text-zinc-500 uppercase tracking-[0.5em] group-hover:text-white transition-colors duration-500">
            {isActive ? 'ENVIRONMENT_OVERRIDE' : 'ATMOSPHERE_ENGINE'}
          </span>
        </button>

        {/* Bottom: Navigation Progress */}
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-3">
            <div className="h-24 w-[1px] bg-white/5 relative overflow-hidden">
                <motion.div 
                    className="absolute top-0 left-0 w-full bg-blue-500/40"
                    style={{ height: `${scrollProgress}%` }}
                />
            </div>
            <span className="text-[10px] font-mono text-zinc-400 tabular-nums tracking-widest">{scrollProgress}%</span>
          </div>
          <div className="w-[1px] h-12 bg-gradient-to-t from-transparent via-white/5 to-transparent" />
        </div>
      </motion.aside>

      {/* ── MOBILE TRIGGER (Minimalist) ── */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsActive(!isActive)}
        className="fixed bottom-8 right-8 z-[70] md:hidden w-14 h-14 rounded-full glass-panel border-white/10 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="relative w-6 h-6 flex items-center justify-center border border-blue-500/30 rounded-sm">
            <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white shadow-[0_0_10px_white]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`} />
        </div>
      </motion.button>
    </>
  );
}
