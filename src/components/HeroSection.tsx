import React from 'react';
import Link from 'next/link';


export default function HeroSection() {
    return (
        <section className="relative pt-20 pb-10 md:pt-32 md:pb-16 text-center from-indigo-50 via-white to-white overflow-hidden">
            {/* Background decoration (dots) - simplified */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
                {/* Add subtle background patterns if desired */}
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 mb-4">
                    Automated
                </h1>
                {/* Second line: Candidate Screening with extra spacing */}
                <div className="flex justify-center items-center space-x-4 my-4">
                    <span className="text-gray-900 text-4xl md:text-5xl lg:text-7xl font-extrabold">
                        Candidate
                    </span>
                    <span className="text-indigo-600 text-4xl md:text-5xl lg:text-7xl font-extrabold">
                        Screening
                    </span>
                </div>

                <p className="text-base text-gray-800 pt-4 font-medium mb-8">
                    Evaluate job candidates efficiently with AI-powered phone interviews. Accurately assess skills, experience, and fit using advanced natural language analysis.
                </p>

                {/* Button container */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link href="/login" className="px-6 py-3 text-lg font-medium text-indigo-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-105 transition-transform duration-300 ease-in-out">
                        Launch App
                    </Link>

                </div>
            </div>
        </section >
    );
}
