# Atmosphere Override Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive "Environment Engine" that allows clients to manipulate the site's visual reality (VFX, Mood, Motion) in real-time.

**Architecture:** A global `AtmosphereProvider` (React Context) manages visual state, which is reflected via dynamic CSS variables and component subscriptions. A floating `EnginePill` triggers a holographic `OverrideOverlay`.

**Tech Stack:** Next.js (App Router), Framer Motion, Tailwind CSS.

---

### Task 1: Global Infrastructure

**Files:**
- Create: `components/AtmosphereContext.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create Atmosphere Context**

```tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type AtmosphereState = {
  vfxDensity: number; // 0 to 1
  mood: number; // 0 (Cold Blue) to 1 (Warm Gold)
  motionFidelity: number; // 0 (Brutal) to 1 (Liquid)
  isActive: boolean;
};

type AtmosphereContextType = AtmosphereState & {
  setVfxDensity: (val: number) => void;
  setMood: (val: number) => void;
  setMotionFidelity: (val: number) => void;
  setIsActive: (val: boolean) => void;
  reset: () => void;
};

const defaultState: AtmosphereState = {
  vfxDensity: 0.4,
  mood: 0.5,
  motionFidelity: 0.6,
  isActive: false,
};

const AtmosphereContext = createContext<AtmosphereContextType | undefined>(undefined);

export function AtmosphereProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AtmosphereState>(defaultState);

  const setVfxDensity = (vfxDensity: number) => setState(s => ({ ...s, vfxDensity }));
  const setMood = (mood: number) => setState(s => ({ ...s, mood }));
  const setMotionFidelity = (motionFidelity: number) => setState(s => ({ ...s, motionFidelity }));
  const setIsActive = (isActive: boolean) => setState(s => ({ ...s, isActive }));
  const reset = () => setState(defaultState);

  // Sync state to CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--vfx-density', state.vfxDensity.toString());
    root.style.setProperty('--atmosphere-mood', state.mood.toString());
    root.style.setProperty('--motion-fidelity', state.motionFidelity.toString());
    
    // Interpolate accent color
    const gold = { r: 200, g: 169, b: 126 };
    const blue = { r: 74, g: 127, b: 212 };
    const r = Math.round(blue.r + (gold.r - blue.r) * state.mood);
    const g = Math.round(blue.g + (gold.g - blue.g) * state.mood);
    const b = Math.round(blue.b + (gold.b - blue.b) * state.mood);
    root.style.setProperty('--az-accent', `rgb(${r}, ${g}, ${b})`);
  }, [state.vfxDensity, state.mood, state.motionFidelity]);

  return (
    <AtmosphereContext.Provider value={{ 
      ...state, 
      setVfxDensity, 
      setMood, 
      setMotionFidelity, 
      setIsActive, 
      reset 
    }}>
      {children}
    </AtmosphereContext.Provider>
  );
}

export function useAtmosphere() {
  const context = useContext(AtmosphereContext);
  if (!context) throw new Error('useAtmosphere must be used within AtmosphereProvider');
  return context;
}
```

- [ ] **Step 2: Wrap Root Layout**

Modify `app/layout.tsx` to include the provider.

```tsx
// ... imports
import { AtmosphereProvider } from "@/components/AtmosphereContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ... head */}
      <body className="antialiased cinematic-grain bg-black text-white selection:bg-white/10 selection:text-white">
        <AtmosphereProvider>
          {/* ... existing atmosphere divs */}
          <CustomCursor />
          <FloatingContact />
          <SmoothScroll>
            <div className="relative z-[2]">
              {children}
            </div>
          </SmoothScroll>
          <SpeedInsights />
        </AtmosphereProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/AtmosphereContext.tsx app/layout.tsx
git commit -m "feat: add atmosphere context and provider"
```

---

### Task 2: CSS & Global Integration

**Files:**
- Modify: `app/globals.css`
- Modify: `components/CinematicHero.tsx`

- [ ] **Step 1: Update Global CSS for Dynamic Variables**

```css
:root {
  /* ... existing colors */
  --grain-opacity: calc(var(--vfx-density) * 0.1);
  --motion-stiffness: calc(var(--motion-fidelity) * 200 + 50);
  --motion-damping: calc(30 - var(--motion-fidelity) * 10);
}

.cinematic-grain::before {
  /* ... */
  opacity: var(--grain-opacity);
}
```

- [ ] **Step 2: Connect CinematicHero to Context**

```tsx
// components/CinematicHero.tsx
import { useAtmosphere } from './AtmosphereContext';

// Inside CinematicHero component:
const { vfxDensity, motionFidelity } = useAtmosphere();

// Update framer-motion transitions to use dynamic spring values
const smoothProgress = useSpring(scrollYProgress, { 
  stiffness: motionFidelity * 100 + 20, 
  damping: 25 - motionFidelity * 10 
});
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css components/CinematicHero.tsx
git commit -m "feat: connect global styles and hero to atmosphere context"
```

---

### Task 3: The Engine Pill Component

**Files:**
- Create: `components/EnginePill.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build EnginePill**

```tsx
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
```

- [ ] **Step 2: Add EnginePill to Home**

```tsx
// app/page.tsx
import EnginePill from '@/components/EnginePill';

// Inside Home:
return (
  <main ...>
    <EnginePill />
    {/* ... rest */}
  </main>
);
```

- [ ] **Step 3: Commit**

```bash
git add components/EnginePill.tsx app/page.tsx
git commit -m "feat: add environment engine pill trigger"
```

---

### Task 4: The Holographic Override Overlay

**Files:**
- Create: `components/OverrideOverlay.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build OverrideOverlay**

```tsx
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

function Slider({ label, value, onChange, minLabel, maxLabel }: any) {
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
```

- [ ] **Step 2: Add OverrideOverlay to Home**

```tsx
// app/page.tsx
import OverrideOverlay from '@/components/OverrideOverlay';

// Inside Home:
return (
  <main ...>
    <OverrideOverlay />
    <EnginePill />
    {/* ... */}
  </main>
);
```

- [ ] **Step 3: Commit**

```bash
git add components/OverrideOverlay.tsx app/page.tsx
git commit -m "feat: implement holographic override overlay"
```
