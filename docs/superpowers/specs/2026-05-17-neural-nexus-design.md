# Design Spec: Neural Nexus (Fluid Light Trails)

**Date:** 2026-05-17  
**Topic:** Neural Nexus Background  
**Status:** Draft

## 1. Executive Summary
The "Neural Nexus" is a global background layer consisting of interactive, glowing SVG "energy strands" that span the entire vertical length of the website. These strands act as a visual narrative thread, connecting the various sections of the AceZen ecosystem. They react magnetically to the user's cursor and dynamically change color and physics based on the "Atmosphere Override" settings.

## 2. Visual Identity & Aesthetic
- **Form:** 3-5 primary Bezier curves ("Arteries") and several "Ghost Strands" (lower opacity).
- **Stroke:** 0.5px to 1.5px thickness.
- **Glow:** Each path is accompanied by a blurred clone (`filter: blur(4px)`) to create a cinematic "photon bloom."
- **Color:** Interpolated between **Logic Blue** (`#4a7fd4`) and **Art Gold** (`#c8a97e`) based on the `Atmosphere Mood` state.
- **Visibility:** Threads are most visible in the "Void" spaces between sections.

## 3. Interaction Mechanics (The "Magnetic" Pull)
- **Proximity Detection:** Strands within a 400px radius of the cursor subtly bend toward it.
- **Damping:** High-damping springs (via `framer-motion`) ensure the movement feels "liquid" and "viscous."
- **Scroll Sync:** Paths are pre-calculated to flow through key "Anchor Points":
    - **Hero:** Originate from the Blueprint Mesh.
    - **Team:** Weave behind the massive `&` symbol.
    - **Footer:** Converge and "plug into" the Initiate Transmission button.

## 4. Technical Integration
### A. Component: `NeuralNexus.tsx`
- A fixed-position global background component.
- Uses a long SVG container (`h-[1000%]`) or dynamic viewport-based segments.
- **Atmosphere Sync:**
    - `vfxDensity`: Scales stroke-opacity and number of visible ghost strands.
    - `mood`: Controls the CSS gradient stops for the stroke.
    - `motionFidelity`: Adjusts the `stiffness` and `damping` of the magnetic spring.

### B. Performance Strategy
- Use `will-change: transform` on animated paths.
- Leverage CSS variables for mouse coordinates (`--mouse-x`, `--mouse-y`) to minimize React re-renders during mouse move.
- Responsive design: Disable magnetic attraction on mobile to save CPU/Battery.

## 5. Success Criteria
- **Cohesion:** The paths should make the site feel like a single "machine" rather than separate sections.
- **Subtlety:** The effect must be "high-end" (atmospheric) rather than "distracting" (chaotic).
- **Zero Jutter:** Smooth 60fps animation even during rapid scrolling.

## 6. Self-Review Notes
- **Ambiguity:** Clarify if paths are static SVG or generated. *Decision: Paths are predefined Bezier data to ensure they hit specific UI anchors.*
- **Internal Consistency:** Ensure the color interpolation logic matches the `AtmosphereProvider` logic.
- **Scope:** Mobile implementation will be a simplified static version of the paths.
