'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAtmosphere } from './AtmosphereContext';

const PATHS = [
  { id: 'artery-1', d: "M 20,0 Q 80,2000 30,4000 T 70,6000 T 50,8000", color: 'primary' },
  { id: 'artery-2', d: "M 80,0 Q 20,2500 70,5000 T 30,7500 T 50,8000", color: 'primary' },
  { id: 'ghost-1', d: "M 50,0 Q 10,1500 90,3000 T 10,4500 T 90,6000 T 50,8000", color: 'secondary', isGhost: true },
];

export default function NeuralNexus() {
  const { vfxDensity, mood, motionFidelity } = useAtmosphere();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create a motion value for mood to enable interpolation
  const moodMV = useMotionValue(mood);
  useEffect(() => { moodMV.set(mood) }, [mood]);

  // Interpolate the primary nexus color between Logic Blue and Art Gold
  const primaryColor = useTransform(moodMV, [0, 1], ["#4a7fd4", "#c8a97e"]);
  const secondaryColor = useTransform(moodMV, [0, 1], ["#0ea5e9", "#f59e0b"]);

  useEffect(() => {
    // Skip pointer tracking entirely on non-desktop viewports
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;

    let rafPending = false;
    let lastX = 0;
    let lastY = 0;
    const handleMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      // Coalesce to at most one update per animation frame
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        mouseX.set(lastX);
        mouseY.set(lastY);
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  const springConfig = { 
    stiffness: motionFidelity * 40 + 5, 
    damping: 40 
  };
  const mX = useSpring(mouseX, springConfig);

  // Calculate a subtle horizontal shift based on mouse position
  const nexusShift = useTransform(mX, [0, 2000], [-15, 15]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden hidden md:block">
      <svg className="w-full h-[8000px] opacity-30" viewBox="0 0 100 8000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="nexus-grad-primary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <motion.stop offset="50%" stopColor={primaryColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="nexus-grad-secondary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <motion.stop offset="50%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {PATHS.map((path) => (
          <React.Fragment key={path.id}>
            {!path.isGhost && (
              <motion.path
                key={`${path.id}-glow`}
                d={path.d}
                stroke={path.color === 'primary' ? primaryColor : secondaryColor}
                strokeWidth={path.isGhost ? 4 : 8}
                fill="transparent"
                strokeLinecap="round"
                style={{ 
                  x: nexusShift,
                  opacity: vfxDensity * 0.4,
                  filter: 'blur(16px)',
                }}
              />
            )}
            <motion.path
              d={path.d}
              stroke={path.color === 'primary' ? "url(#nexus-grad-primary)" : "url(#nexus-grad-secondary)"}
              strokeWidth={path.isGhost ? 0.3 : 0.8}
              fill="transparent"
              strokeLinecap="round"
              style={{ 
                x: nexusShift,
                opacity: path.isGhost ? vfxDensity * 0.2 : vfxDensity * 0.7,
                filter: 'drop-shadow(0 0 8px rgba(74, 127, 212, 0.2))' 
              }}
            />
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
}
