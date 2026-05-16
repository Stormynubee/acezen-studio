'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAtmosphere } from './AtmosphereContext';

const PATHS = [
  { id: 'artery-1', d: "M 20,0 Q 80,1000 30,2000 T 70,4000 T 20,6000 T 50,8000", color: 'blue' },
  { id: 'artery-2', d: "M 80,0 Q 20,1500 70,3000 T 30,5000 T 80,7000 T 40,8000", color: 'gold' },
  { id: 'ghost-1', d: "M 50,0 Q 90,1200 10,2500 T 90,4500 T 50,8000", color: 'blue', isGhost: true },
];

export default function NeuralNexus() {
  const { vfxDensity, mood, motionFidelity } = useAtmosphere();
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <svg className="w-full h-[8000px] opacity-40" viewBox="0 0 100 8000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="nexus-grad-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#4a7fd4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="nexus-grad-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#c8a97e" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {PATHS.map((path) => (
           <motion.path
             key={path.id}
             d={path.d}
             stroke={path.color === 'blue' ? "url(#nexus-grad-blue)" : "url(#nexus-grad-gold)"}
             strokeWidth={path.isGhost ? 0.3 : 0.8}
             fill="transparent"
             strokeLinecap="round"
             style={{ 
               opacity: path.isGhost ? vfxDensity * 0.3 : vfxDensity * 0.8,
               filter: 'drop-shadow(0 0 8px rgba(74, 127, 212, 0.2))' 
             }}
           />
        ))}
      </svg>
    </div>
  );
}
