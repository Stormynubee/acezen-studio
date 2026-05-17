# AceZen: Digital Reality Architects

This file defines the foundational mandates and engineering standards for the AceZen Digital Studio project. All agent actions must adhere to these principles.

## 🌌 Brand Identity: Cinematic Dark Luxury
AceZen is not a traditional agency; we are architects of digital reality. The aesthetic is "Observatory at Midnight"—deep space, cinematic motion, and high-fidelity technical precision.

### Design Tokens
- **Palette:** 
  - `Void`: `#020204` (Primary background)
  - `Logic Blue`: `#4a7fd4` (Cold/System accent)
  - `Art Gold`: `#c8a97e` (Warm/Luxury accent)
- **Typography:**
  - **Display:** `Instrument Serif` (Use `@utility text-editorial`)
  - **Mono:** `DM Mono` (For metrics, labels, and technical metadata)
  - **Body:** `DM Sans` (Clean, modern sans-serif)

## 🛠️ Tech Stack & Architecture
- **Framework:** Next.js 16 + React 19 (App Router).
- **Styling:** Tailwind CSS 4 (Strictly vanilla CSS variables for dynamic interpolation).
- **Motion:** Framer Motion (High-damping, viscous physics).
- **Scrolling:** Lenis (Global smooth scroll orchestrated in `layout.tsx`).

## 🧠 Core Patterns
### 1. The Atmosphere Engine
All visual components should ideally respect or contribute to the `AtmosphereContext`.
- **Interpolation:** Use CSS variables (e.g., `--az-accent`) for colors so they react to the "Mood" slider.
- **VFX Density:** Scale complexity (grain, star counts, blur) based on `--vfx-density`.

### 2. High-Fidelity Interaction
- **Magnetic Physics:** Use `Magnetic.tsx` for buttons and interactive anchors.
- **Reactive Backgrounds:** Background layers (like `NeuralNexus`) must track the mouse with subtle, spring-based movement.
- **X-Ray Masking:** Prefer SVG masks and radial gradients over static images for "reveal" effects.

### 3. Engineering Standards
- **Surgical Edits:** Only modify code directly related to the task.
- **Type Safety:** Strict TypeScript. No `any` casts.
- **Performance:** Dynamic imports for below-the-fold components (Services, Work, Footer).

## 📁 Directory Structure
- `app/`: Routing and global orchestration.
- `components/`: Modular UI units.
- `docs/superpowers/`: Detailed specs and logic plans.
- `scripts/`: Asset optimization and generation tools.

## 🚀 Workflows
- **Research First:** Always check `docs/superpowers/` before modifying Atmosphere Engine logic.
- **Build Verification:** Always run `npm run build` or `next build` after major UI changes to ensure CSS/Type integrity.
