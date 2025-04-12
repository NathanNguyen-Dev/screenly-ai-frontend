import React from 'react';

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="pt-36 md:py-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24">
                {/* Top label + heading */}
                <div className="text-center mb-10">
                    {/* Small label/pill with icon inserted */}
                    <div className="flex items-center justify-center mb-3">
                        <span className="inline-flex items-center px-4 py-2 text-md font-medium bg-indigo-100 text-indigo-500 rounded-full">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.176 0l-3.39 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                            </svg>
                            How it Works
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-2xl mx-auto">
                        Accelerate candidate throughput, and recoup valuable time.
                    </h2>
                </div>

                {/* Main container (2-column layout on md+) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Column: Steps */}
                    <div className="space-y-5">
                        {/* STEP 1 */}
                        <div className="flex items-start space-x-4">
                            {/* Step Number */}
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                                01
                            </div>
                            {/* Step Text */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">Import your job listing</h3>
                                <p className="text-gray-600 mt-1">
                                    Quickly bring in your existing listings so everything stays in one place.
                                </p>
                            </div>
                        </div>

                        {/* STEP 2 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                                02
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">Share your screening link</h3>
                                <p className="text-gray-600 mt-1">
                                    Provide a single link for candidates to begin the AI-powered interview process.
                                </p>
                            </div>
                        </div>

                        {/* STEP 3 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                                03
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">AI agent screens the candidate</h3>
                                <p className="text-gray-600 mt-1">
                                    Automated phone interviews and transcripts let you see exactly how candidates respond.
                                </p>
                            </div>
                        </div>

                        {/* STEP 4 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                                04
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">Intelligent candidate scoring</h3>
                                <p className="text-gray-600 mt-1">
                                    Our models analyze responses and provide a ranked score based on relevance and experience.
                                </p>
                            </div>
                        </div>

                        {/* STEP 5 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                                05
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">Review the candidate</h3>
                                <p className="text-gray-600 mt-1">
                                    Easily listen to recordings or read transcripts, and move promising talent to the next stage.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Candidate Preview Card */}
                    <div className="relative bg-gray-50 rounded-xl shadow-lg p-6">
                        {/* Example candidate info box */}
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-700">Gil Gunderson</h4>
                            <p className="text-sm text-gray-500">gilgunderson@gmail.com</p>
                            <p className="text-sm text-gray-500">555-555-5555</p>
                        </div>

                        {/* Score box */}
                        <div className="flex items-center justify-between border-t border-b border-gray-200 py-3 mb-4">
                            <span className="text-gray-600">Score</span>
                            <span className="text-2xl font-bold text-indigo-600">89</span>
                        </div>

                        {/* Quick actions */}
                        <div className="flex space-x-4 mb-4">
                            <button className="flex-1 text-sm text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-3 rounded-md transition">
                                Listen to phone screen
                            </button>
                            <button className="flex-1 text-sm text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-3 rounded-md transition">
                                Read the transcript
                            </button>
                        </div>

                        {/* Example question + answer snippet */}
                        <div>
                            <p className="text-sm text-gray-700 font-medium mb-2">
                                Q: What measures do you take to maintain a clean and organized work environment?
                            </p>
                            <p className="text-sm text-gray-600">
                                A: I stay very organized by ensuring all my tools are properly stored...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
