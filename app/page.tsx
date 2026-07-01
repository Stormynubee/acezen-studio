import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import CinematicHero from '@/components/CinematicHero';
import MountainScroll from '@/components/MountainScroll';
import ScrollIndicator from '@/components/ScrollIndicator';
import ArchitectSidebar from '@/components/ArchitectSidebar';

// Interaction-triggered overlays — dynamically imported so Framer Motion
// and their trees stay out of the initial bundle until actually needed.
const OverrideOverlay = dynamic(() => import('@/components/OverrideOverlay'));
const TerminalEasterEgg = dynamic(() => import('@/components/TerminalEasterEgg'));

// Allow Next.js to SSR these client components so their content is visible to search engines
const AboutTeam = dynamic(() => import('@/components/AboutTeam'));
const ServicesBento = dynamic(() => import('@/components/ServicesBento'));
const Console = dynamic(() => import('@/components/console/Console'));
const WorkShowcase = dynamic(() => import('@/components/WorkShowcase'));
const Footer = dynamic(() => import('@/components/Footer'));
const Ticker = dynamic(() => import('@/components/Ticker'));
const Process = dynamic(() => import('@/components/Process'));

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-blue-500/30" style={{ background: 'var(--az-void)' }}>
      <TerminalEasterEgg />
      <SplashScreen />

      <ArchitectSidebar />
      <OverrideOverlay />

      <ScrollIndicator />
      <Navbar />

      {/* ── CINEMATIC HERO — full viewport, self-contained atmosphere ── */}
      <CinematicHero />

      {/*
        MountainScroll sentinel — the lazy-loader only activates when this
        element enters the viewport (200px root margin), so the sequence
        images never load during the hero impression.
      */}
      <div id="mountain-sentinel" style={{ height: 1, marginTop: -1 }} aria-hidden />
      <MountainScroll />

      {/* ── BELOW-FOLD CONTENT ── */}
      <div
        className="relative z-10"
        style={{ background: 'var(--az-void)', boxShadow: '0 -64px 100px rgba(0,0,0,0.8)' }}
      >
        <React.Suspense fallback={<div className="h-screen" style={{ background: 'var(--az-void)' }} />}>
          <section id="about" className="relative">
            <AboutTeam />
          </section>

          <section id="services" className="relative bg-[#050508]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,127,212,0.03),transparent_70%)] pointer-events-none" />
            <ServicesBento />
          </section>

          <section className="relative z-10 mx-auto mt-14 max-w-5xl px-4 md:mt-20 md:px-8">
            <div className="mb-4 flex items-end justify-between px-1">
              <span className="text-technical-console">// live console — poke at it</span>
              <span className="font-mono-az text-[10px] text-[var(--az-muted-console)]">switch tabs ↗</span>
            </div>
            <Console />
            <p className="mt-4 text-center font-mono-az text-[11px] text-[var(--az-muted-console)]">
              this isn't a screenshot. type, scrub, watch it move.
            </p>
          </section>

          <section id="work" className="relative">
            <WorkShowcase />
          </section>

          <Ticker />

          <Process />

          <div className="relative">
            <Footer />
          </div>
        </React.Suspense>
      </div>
    </main>
  );
}
