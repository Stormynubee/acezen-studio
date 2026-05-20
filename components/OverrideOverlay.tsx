'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAtmosphere } from './AtmosphereContext';

export default function OverrideOverlay() {
  const { isActive, setIsActive, vfxDensity, setVfxDensity, mood, setMood, motionFidelity, setMotionFidelity, reset } = useAtmosphere();

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-3xl flex items-center justify-center p-6"
        >
          <div className="max-w-xl w-full space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter text-white text-editorial">Holographic Override</h2>
              <p className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.4em]">Reality Configuration Mode</p>
            </div>

            <div className="space-y-8 bg-white/[0.02] border border-white/5 p-10 rounded-3xl">
              <Slider label="VFX Density" value={vfxDensity} onChange={setVfxDensity} />
              <Slider label="Atmospheric Mood" value={mood} onChange={setMood} minLabel="Cold" maxLabel="Warm" />
              <Slider label="Motion Fidelity" value={motionFidelity} onChange={setMotionFidelity} minLabel="Static" maxLabel="Liquid" />
            </div>

            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={reset}
                className="text-[10px] font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-colors"
              >
                Reset to Default Signature
              </button>
              
              <button
                className="bg-white text-black px-12 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-transform"
                onClick={() => {
                  alert(`Atmospheric Signature Locked:\nVFX: ${Math.round(vfxDensity * 100)}%\nMood: ${mood > 0.5 ? 'Warm' : 'Cold'}\nMotion: ${Math.round(motionFidelity * 100)}%`);
                }}
              >
                Initiate Transmission
              </button>
              
              <button onClick={() => setIsActive(false)} className="text-white/20 hover:text-white text-xs">Close Console</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  minLabel?: string;
  maxLabel?: string;
}

function Slider({ label, value, onChange, minLabel, maxLabel }: SliderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>
        <span className="text-xs font-bold text-white">{Math.round(value * 100)}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-blue-500 bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
      />
      {minLabel && (
        <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase tracking-tighter">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
