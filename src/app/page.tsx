'use client';

import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Demo from '@/components/Demo';
import Benefits from '@/components/Benefits';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';







export default function LandingPage() {
  return (
    <div
      className="
        flex flex-col min-h-screen 
        bg-white text-gray-800 
        
        bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]
        bg-[length:25px_25px]
      "
    >

      {/* Main Content */}
      <main className="flex-grow">

        <Analytics />
        <Header />
        <HeroSection />
        <Demo />
        <Benefits />
        <Features />
        <HowItWorks />
        <FAQ />
        <CTA />
        <Footer />

      </main>

    </div>
  );
}
