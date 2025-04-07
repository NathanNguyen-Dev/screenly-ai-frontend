'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image for placeholders/logos

// Placeholder components for icons - replace with actual icons later
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between h-16 border-b border-gray-200">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* <PlaceholderIcon className="w-8 h-8 text-indigo-600 mr-2" /> Replace with actual logo */}
            <span className="text-2xl font-bold text-indigo-600">Screenly AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-center flex-wrap items-center space-x-8 text-sm font-medium text-gray-600">
              <li><Link href="#" className="hover:text-indigo-600">Benefits</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Features</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">How it Works</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Pricing</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Blog</Link></li>
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login"
              className="hidden md:inline-block px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              Log In
            </Link>
            <Link href="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button (implement later if needed) */}
          {/* <button className="md:hidden">Menu</button> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-10 md:pt-32 md:pb-16 text-center bg-gradient-to-b from-indigo-50 via-white to-white overflow-hidden">
          {/* Background decoration (dots) - simplified */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
             {/* Add subtle background patterns if desired */}
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              Automated Candidate
            </h1>
            {/* Placeholder for candidate images row */}
            <div className="flex justify-center items-center space-x-2 my-4 h-12">
                <span className="text-indigo-600 text-4xl md:text-5xl lg:text-6xl font-extrabold">Screening</span>
                {/* Add placeholder images or icons here later */}
            </div>

            <p className="mt-6 text-lg text-gray-600">
              Simple pricing, just $3 per completed call.
            </p>

            {/* Optional: Listen to screen button */}
            <button className="mt-8 px-6 py-3 text-lg font-medium text-indigo-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               ▷ Listen to screen (Example)
            </button>
          </div>

          {/* Integrations */}
          <div className="mt-16">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Integrations</p>
            <div className="flex justify-center items-center space-x-6 md:space-x-10 text-gray-400">
              {/* Replace with actual logos */}
              <span>Lever</span>
              <span>Taleo</span>
              <span>bambooHR</span>
              <span>greenhouse</span>
              <span>Ashby</span>
              <span>ICIMS</span>
            </div>
          </div>
        </section>

        {/* App Mockup Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
           <div className="max-w-5xl mx-auto">
             {/* Placeholder for the large app screenshot/mockup */}
             <div className="aspect-video bg-indigo-100 rounded-lg shadow-xl flex items-center justify-center text-indigo-400">
                App Mockup/Image Placeholder
             </div>
           </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <PlaceholderIcon className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Pre-Qualified</h3>
                <p className="text-gray-600">Ensure every candidate meets your baseline requirements.</p>
              </div>
              <div className="p-6">
                <PlaceholderIcon className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Boost Candidates</h3>
                <p className="text-gray-600">Surface top talent faster with consistent evaluations.</p>
              </div>
              <div className="p-6">
                <PlaceholderIcon className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Remove Bias</h3>
                <p className="text-gray-600">Standardized screening process for fairer hiring.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center w-full h-24 border-t border-gray-200 bg-white">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Screenly AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
