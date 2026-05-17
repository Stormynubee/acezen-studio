# Neural Nexus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a global background layer of interactive, glowing SVG "energy strands" that connect website sections and react magnetically to the cursor.

**Architecture:** A fixed-position `NeuralNexus` component rendered at the root level. It uses SVG paths with dynamic gradient strokes, `framer-motion` for viscous magnetic physics, and subscribes to `AtmosphereContext` for real-time visual syncing.

**Tech Stack:** React, Next.js, Framer Motion, SVG.

---

### Task 1: Component Foundation & Path Data

**Files:**
- Create: `components/NeuralNexus.tsx`

- [ ] **Step 1: Define Path Data & Shell**
Create the component with predefined Bezier paths that "flow" through the site's vertical structure.

```tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAtmosphere } from './AtmosphereContext';

const PATHS = [
  { id: 'artery-1', d: "M 20,0 Q 80,1000 30,2000 T 70,4000 T 20,6000", color: 'blue' },
  { id: 'artery-2', d: "M 80,0 Q 20,1500 70,3000 T 30,5000 T 80,7000", color: 'gold' },
  { id: 'ghost-1', d: "M 50,0 Q 90,1200 10,2500 T 90,4500", color: 'blue', isGhost: true },
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
```

- [ ] **Step 2: Commit**

```bash
git add components/NeuralNexus.tsx
git commit -m "feat: foundation for neural nexus background strands"
```

---

### Task 2: Magnetic Physics Integration

**Files:**
- Modify: `components/NeuralNexus.tsx`

- [ ] **Step 1: Implement Magnetic Attraction Logic**
Update the component to use a `Canvas` or dynamic SVG manipulation for the magnetic "bowing" effect. We'll use a simplified version for high performance: shifting the entire SVG layer slightly or using a displacement filter. 
*Correction:* We will use `framer-motion` to animate the `x` and `skew` of individual paths based on cursor proximity.

```tsx
// Inside NeuralNexus.tsx
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

useEffect(() => {
  const handleMove = (e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  window.addEventListener('mousemove', handleMove);
  return () => window.removeEventListener('mousemove', handleMove);
}, []);

// Magnetic Spring
const springConfig = { 
  stiffness: motionFidelity * 50 + 10, 
  damping: 20 
};
const mX = useSpring(mouseX, springConfig);

// In the map loop, add a subtle x-translation based on mX
// <motion.path style={{ x: useTransform(mX, [0, 2000], [-5, 5]) }} ... />
```

- [ ] **Step 2: Add Photon Bloom (Clone Paths)**
Add a second `<path>` for every artery with a blur filter to create the glow.

```tsx
{/* Glow layer */}
<motion.path
  d={path.d}
  stroke={color}
  strokeWidth={2}
  fill="transparent"
  style={{ filter: 'blur(12px)', opacity: vfxDensity * 0.4 }}
/>
```

- [ ] **Step 3: Commit**

```bash
git add components/NeuralNexus.tsx
git commit -m "feat: add magnetic physics and glow to neural nexus"
```

---

### Task 3: Global Atmosphere Sync

**Files:**
- Modify: `components/NeuralNexus.tsx`
- Modify: `components/AtmosphereContext.tsx`

- [ ] **Step 1: Color Interpolation Sync**
Ensure the Nexus color shifts perfectly with the `mood` slider.

```tsx
// Inside NeuralNexus.tsx
const nexusColor = useTransform(
  useMotionValue(mood), // Wrap mood in motion value for interpolation
  [0, 1],
  ["#4a7fd4", "#c8a97e"]
);
```

- [ ] **Step 2: Refine Path Constants**
Adjust path `d` values to ensure they pass behind the "Expertise" blue dot and the Team "&".

- [ ] **Step 3: Commit**

```bash
git add components/NeuralNexus.tsx
git commit -m "feat: sync neural nexus colors with atmosphere engine"
```

---

### Task 4: Layout Deployment

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Render Nexus in Root**
Place the `NeuralNexus` at the top of the body so it sits behind everything else.

```tsx
// app/layout.tsx
import NeuralNexus from "@/components/NeuralNexus";

// Inside body:
<AtmosphereProvider>
  <NeuralNexus />
  <CustomCursor />
  {/* ... */}
</AtmosphereProvider>
```

- [ ] **Step 2: Verify & Build**
Run `npm run build` to ensure no performance bottlenecks were introduced by the SVG height.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: deploy neural nexus to global layout"
```
