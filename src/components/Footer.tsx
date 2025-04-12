import React from 'react';

export default function Footer() {
    return (
        <footer className="flex items-center justify-center w-full h-24 border-t border-gray-200 bg-white">
            <p className="text-gray-600">
                © {new Date().getFullYear()} Screenly AI. All rights reserved.
            </p>
        </footer>
    );
}
