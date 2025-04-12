import React from 'react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-30 w-full py-4 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-sm shadow-sm">
            <div className="max-w-5xl mx-auto flex items-center justify-between h-16 border-gray-200">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <span className="text-2xl mr-3">📞</span>
                    <span className="text-2xl font-bold text-black">Screenly&nbsp;</span>
                    <span className="text-2xl font-bold text-indigo-600">AI</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:grow">
                    <ul className="flex grow justify-center flex-wrap items-center space-x-8 text-base font-medium text-gray-500">
                        <li>
                            <Link href="#benefits" className="hover:text-indigo-600">
                                Benefits
                            </Link>
                        </li>
                        <li>
                            <Link href="#features" className="hover:text-indigo-600">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="#how-it-works" className="hover:text-indigo-600">
                                How it Works
                            </Link>
                        </li>

                        <li>
                            <Link href="#faq" className="hover:text-indigo-600">
                                FAQ
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
                    <Link
                        href="/login"
                        className="hidden md:inline-block px-4 py-2 text-base font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button (implement later if needed) */}
                {/* <button className="md:hidden">Menu</button> */}
            </div>
        </header>
    );
}
