'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import MountainScroll from '@/components/MountainScroll';
import HeroOverlay from '@/components/HeroOverlay';
import { LoadingProvider } from '@/components/LoadingContext';
import ScrollIndicator from '@/components/ScrollIndicator';

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
    <LoadingProvider>
      <main className="min-h-screen">
        <TerminalEasterEgg />
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

        <ScrollIndicator />

        <Navbar />
        <MountainScroll />

        {/* Hero text — fixed on mobile so it overlays the mountain on the first screen */}
        <div className="fixed lg:relative inset-0 lg:inset-auto z-10 lg:z-0 h-screen w-full pointer-events-none">
          <HeroOverlay />
        </div>

        <div className="h-[100vh]" />

        <div className="relative z-10 bg-zinc-950 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <React.Suspense fallback={<div className="h-screen bg-zinc-950" />}>
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
    </LoadingProvider>
  );
}
