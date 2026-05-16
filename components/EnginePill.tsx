'use client';

import { motion } from 'framer-motion';
import { useAtmosphere } from './AtmosphereContext';

export default function EnginePill() {
  const { isActive, setIsActive } = useAtmosphere();

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={() => setIsActive(!isActive)}
      className="fixed bottom-24 right-8 z-[60] group flex items-center gap-3"
    >
      <div className="overflow-hidden bg-zinc-900/90 border border-white/10 rounded-full px-4 py-2 backdrop-blur-xl shadow-2xl transition-all group-hover:border-white/20">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border border-blue-500 rounded-sm flex items-center justify-center"
          >
            <div className="w-1 h-1 bg-blue-500 rounded-full" />
          </motion.div>
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.3em] group-hover:text-white transition-colors">
            {isActive ? 'EXIT ENGINE' : 'ENVIRONMENT ENGINE'}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
