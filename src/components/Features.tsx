import React from 'react';

export default function Features() {
    return (
        <section id="features" className="pt-28">
            <div className="mx-auto max-w-5xl px-6">
                {/* Top label + heading */}
                <div className="text-center mb-10">
                    {/* Small label/pill with icon inserted */}
                    <div className="flex items-center justify-center mb-3">
                        <span className="inline-flex items-center px-4 py-2 text-md font-medium bg-indigo-100 text-indigo-500 rounded-full">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.176 0l-3.39 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                            </svg>

                            Features
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-2xl mx-auto">

                        More flexible, more efficient, more equitable.
                    </h2>
                </div>

                {/* Container for the 3 columns */}
                <div className="pt-4 grid gap-12 md:grid-cols-3 text-center">
                    {/* 1. Generate Drafts and Outlines */}
                    <div className="flex flex-col items-center">
                        {/* Icon */}
                        <div className="mb-4 p-4 rounded-full bg-indigo-100">
                            {/* Replace this with your actual icon */}
                            <svg
                                className="w-8 h-8 text-indigo-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 6H5.4C5.17909 6 5 6.17909 5 6.4V9m14 0V6.4C19 6.17909 18.8209 6 18.6 6H16M5 9l5.586-5.586a2 2 0 012.828 0L19 9M9 11v2m0 4h6m-6-2h6"
                                />
                            </svg>
                        </div>
                        {/* Title + Description */}
                        <h3 className="text-xl font-semibold mb-2">
                            Automated Interviews                        </h3>
                        <p className="text-gray-700 max-w-sm">
                            Run voice interviews 24/7 without lifting a finger. Instantly ask relevant questions and collect candidate responses over the phone, no scheduling needed.                        </p>
                    </div>

                    {/* 2. Find and Cite High-Quality Sources */}
                    <div className="flex flex-col items-center">
                        {/* Icon */}
                        <div className="mb-4 p-4 rounded-full bg-indigo-100">
                            {/* Replace this with your actual icon */}
                            <svg
                                className="w-8 h-8 text-indigo-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-6a6 6 0 10-12 0 6 6 0 0012 0z"
                                />
                            </svg>
                        </div>
                        {/* Title + Description */}
                        <h3 className="text-xl font-semibold mb-2">
                            Score and Compare Objectively

                        </h3>
                        <p className="text-gray-700 max-w-sm">
                            Our AI analyzes responses in real-time and ranks candidates based on customizable criteria, helping you shortlist top talent without bias or guesswork.

                        </p>
                    </div>

                    {/* 3. Chat and Rewrite Effortlessly */}
                    <div className="flex flex-col items-center">
                        {/* Icon */}
                        <div className="mb-4 p-4 rounded-full bg-indigo-100">
                            {/* Replace this with your actual icon */}
                            <svg
                                className="w-8 h-8 text-indigo-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9.07 15.07A4 4 0 1116 12h1a2 2 0 110 4h-1a4 4 0 01-6.93-.93z"
                                />
                            </svg>
                        </div>
                        {/* Title + Description */}
                        <h3 className="text-xl font-semibold mb-2">
                            Human-Like Conversations
                        </h3>
                        <p className="text-gray-700 max-w-sm">
                            Engage applicants with natural, friendly voice AI that feels like a real person, giving every candidate a great first impression of your brand.

                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
