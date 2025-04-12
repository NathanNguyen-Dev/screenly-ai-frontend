import React from 'react';
import Link from 'next/link';

export default function CTA() {
    return (
        <section className="px-4 sm:px-6 lg:px-8 my-4">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl text-center py-12 px-6 border border-gray-200 mb-20">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                    Try Screenly AI for free
                </h2>
                <p className="text-gray-600 text-lg md:text-xl mt-4 mb-10">
                    Make your first hire with AI today and don&apos;t look back.
                </p>
                <Link href="/signup"
                    className="inline-block px-6 py-3 text-lg font-bold text-white bg-indigo-600 rounded-md shadow-lg transform transition duration-300 hover:bg-indigo-700 hover:scale-105">
                    Sign Up — it’s free

                </Link>
            </div>
        </section>
    );
}
