import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import CinematicHero from '@/components/CinematicHero';
import MountainScroll from '@/components/MountainScroll';
import ScrollIndicator from '@/components/ScrollIndicator';
import ArchitectSidebar from '@/components/ArchitectSidebar';
import OverrideOverlay from '@/components/OverrideOverlay';
import TerminalEasterEgg from '@/components/TerminalEasterEgg';

// Allow Next.js to SSR these client components so their content is visible to search engines
const AboutTeam = dynamic(() => import('@/components/AboutTeam'));
const ServicesBento = dynamic(() => import('@/components/ServicesBento'));
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
