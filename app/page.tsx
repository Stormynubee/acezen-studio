'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import MountainScroll from '@/components/MountainScroll';
import HeroOverlay from '@/components/HeroOverlay';
import { LoadingProvider } from '@/components/LoadingContext';

// Lazy load below-the-fold components
const AboutTeam = dynamic(() => import('@/components/AboutTeam'), { ssr: false });
const ServicesBento = dynamic(() => import('@/components/ServicesBento'), { ssr: false });
const WorkShowcase = dynamic(() => import('@/components/WorkShowcase'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Ticker = dynamic(() => import('@/components/Ticker'), { ssr: false });
const Process = dynamic(() => import('@/components/Process'), { ssr: false });

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <LoadingProvider>
      <main className="min-h-screen">
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

        <Navbar />
        <MountainScroll />
        <section className="relative h-screen w-full">
          <HeroOverlay />
        </section>

        <div className="h-[100vh]" />

        <div className="relative z-10 bg-zinc-950 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
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
        </div>
      </main>
    </LoadingProvider>
  );
}
