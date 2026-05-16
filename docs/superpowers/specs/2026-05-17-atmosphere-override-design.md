# Design Spec: Atmosphere Override Engine

**Date:** 2026-05-17  
**Topic:** Atmosphere Override  
**Status:** Draft

## 1. Executive Summary
The "Atmosphere Override" is an interactive lead-generation feature that allows potential clients to manipulate the visual "reality" of the AceZen website in real-time. By adjusting high-fidelity sliders, users can customize the cinematic intensity of the site, turning the browsing experience into a live product demo of the studio's technical and creative capabilities.

## 2. Goals & Success Criteria
- **User Engagement:** Increase time-on-site by providing a tactile, interactive playground.
- **Lead Generation:** Capture client preferences (Atmospheric Signature) alongside their contact information.
- **Brand Reinforcement:** Solidify the "Digital Reality Architect" identity through "God Mode" site controls.
- **Performance:** Ensure real-time slider updates do not cause frame drops or layout shifts.

## 3. User Experience (UX)
### A. The Engine Pill
- A floating, glass-morphic button in the bottom-right corner.
- Icon: A pulsing "Kernel" (rotating gear/hexagon).
- Label (on hover): "ENVIRONMENT ENGINE".

### B. The Holographic Override (Overlay)
- Triggered by clicking the pill.
- UI: Full-screen `backdrop-blur-3xl` with a minimal, holographic control panel.
- Controls:
    - **VFX Density (Slider):** Controls grain intensity (`--grain-opacity`), starfield twinkle frequency, and glitch-effect probability.
    - **Atmospheric Mood (Spectrum):** Shifts the site's accent color between "Cold Blue" (`#4a7fd4`) and "Warm Gold" (`#c8a97e`).
    - **Motion Fidelity (Slider):** Adjusts global animation stiffness/damping values.
- Navigation: Site remains scrollable in the background while the override is active.

### C. Transmission (Lead Gen)
- Primary CTA: "INITIATE TRANSMISSION".
- Opens a minimal email capture field.
- Message: "Atmospheric signature locked. Send this briefing to our architects?"
- Payload: User's email + slider values (VFX: 80%, Mood: Gold, Motion: Liquid).

## 4. Technical Architecture
### A. Global State (React Context)
- `AtmosphereContext`: Stores current slider values.
- `AtmosphereProvider`: Wrapped around the `RootLayout` or `Home` component.

### B. High-Performance CSS Integration
- The provider will update root CSS variables:
  ```css
  :root {
    --az-accent: [dynamic-color];
    --grain-opacity: [dynamic-value];
    --motion-stiffness: [dynamic-value];
  }
  ```
- Components (Hero, Services, Grain) will use these variables.

### C. Components to Update
- `globals.css`: Add support for dynamic grain and accent variables.
- `CinematicHero`: Subscribe to context for starfield and light leak intensity.
- `AboutTeam`: Subscribe to context for accent color highlights.

## 5. Implementation Stages
1. **Infrastructure:** Create `AtmosphereProvider` and state hooks.
2. **Global Integration:** Connect `globals.css` and root components to the new state.
3. **UI Development:** Build the `EnginePill` and `OverrideOverlay` components.
4. **Lead Capture:** Integrate the "Transmission" form with the existing Web3Forms logic in the Footer.

## 6. Self-Review Notes
- **Ambiguity:** Ensure "Motion Fidelity" slider actually affects visible animations (Framer Motion springs).
- **Consistency:** The "Override" panel should match the existing "Terminal" and "Footer" aesthetic.
- **Scope:** This spec covers the UI and global state; specific VFX shader updates are out of scope for v1.
