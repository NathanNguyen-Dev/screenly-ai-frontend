import React from 'react';

export default function BenefitsSection() {
    return (
        <section id="benefits" className="pt-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Top label + heading */}
                <div className="text-center mb-10">
                    {/* Small label/pill with icon inserted */}
                    <div className="flex items-center justify-center mb-3">
                        <span className="inline-flex items-center px-4 py-2 text-md font-medium bg-indigo-100 text-indigo-500 rounded-full">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.176 0l-3.39 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                            </svg>
                            Benefits
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-2xl mx-auto">
                        Accelerate candidate throughput, and recoup valuable time.
                    </h2>
                </div>

                {/* 4-Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Card 1: Voice AI Interviews */}
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        {/* Microphone icon */}
                        <div className="mb-4 w-10 h-10 bg-indigo-100 rounded flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-indigo-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 00-3 3v9a3 3 0 006 0V4a3 3 0 00-3-3zM5 10v2a7 7 0 0014 0v-2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Voice AI Interviews
                        </h3>
                        <p className="text-gray-600">
                            Automatically conduct phone screenings, analyzing candidate responses in real time. Free yourself from manual calls and focus on identifying top talent.
                        </p>
                    </div>

                    {/* Card 2: Zero Scheduling Hassles */}
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        {/* Calendar icon */}
                        <div className="mb-4 w-10 h-10 bg-indigo-100 rounded flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-indigo-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Zero Scheduling Hassles
                        </h3>
                        <p className="text-gray-600">
                            Let candidates screen themselves at their convenience—no more phone tag or wasted back-and-forth. Free up hours each week for high-value tasks.
                        </p>
                    </div>

                    {/* Card 3: Insightful Reports */}
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        {/* Chart icon */}
                        <div className="mb-4 w-10 h-10 bg-indigo-100 rounded flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-indigo-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4v11H3zM10 5h4v16h-4zM17 9h4v12h-4z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Insightful Reports
                        </h3>
                        <p className="text-gray-600">
                            Receive transcripts, sentiment analysis, and automated scoring for every interview. Quickly pinpoint strengths, weaknesses, and overall fit.
                        </p>
                    </div>

                    {/* Card 4: Built for Small Business */}
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        {/* Briefcase icon */}
                        <div className="mb-4 w-10 h-10 bg-indigo-100 rounded flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-indigo-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7V4a2 2 0 012-2h8a2 2 0 012 2v3M6 7h12M6 7v12a2 2 0 002 2h8a2 2 0 002-2V7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Built for Small Business
                        </h3>
                        <p className="text-gray-600">
                            Enjoy a simple setup, budget-friendly pricing, and minimal training overhead. Get started in minutes and scale as your team grows.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
