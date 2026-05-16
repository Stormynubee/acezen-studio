'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import CinematicHero from '@/components/CinematicHero';
import MountainScroll from '@/components/MountainScroll';
import ScrollIndicator from '@/components/ScrollIndicator';
import EnginePill from '@/components/EnginePill';
import OverrideOverlay from '@/components/OverrideOverlay';

// Lazy load below-the-fold components
const AboutTeam = dynamic(() => import('@/components/AboutTeam'), { ssr: false });
const ServicesBento = dynamic(() => import('@/components/ServicesBento'), { ssr: false });
const WorkShowcase = dynamic(() => import('@/components/WorkShowcase'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Ticker = dynamic(() => import('@/components/Ticker'), { ssr: false });
const Process = dynamic(() => import('@/components/Process'), { ssr: false });
const TerminalEasterEgg = dynamic(() => import('@/components/TerminalEasterEgg'), { ssr: false });

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <main className="min-h-screen" style={{ background: 'var(--az-void)' }}>
      <OverrideOverlay />
      <EnginePill />
      <TerminalEasterEgg />
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

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
        style={{ background: 'var(--az-void)', boxShadow: '0 -32px 80px rgba(0,0,0,0.7)' }}
      >
        <React.Suspense fallback={<div className="h-screen" style={{ background: 'var(--az-void)' }} />}>
          <div id="about">
            <AboutTeam />
          </div>
          <div id="services">
            <ServicesBento />
          </div>
          <div id="work">
            <WorkShowcase />
          </div>
          <Ticker />
          <Process />
          <div id="contact">
            <Footer />
          </div>
        </React.Suspense>
      </div>
    </main>
  );
}
