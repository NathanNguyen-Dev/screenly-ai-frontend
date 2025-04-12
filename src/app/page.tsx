'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Demo from '@/components/Demo';
import Benefits from '@/components/Benefits';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';





// Placeholder components for icons - replace with actual icons later
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

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
