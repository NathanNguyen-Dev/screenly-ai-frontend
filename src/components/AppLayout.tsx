'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Import useRouter

// Placeholder Icons - Replace with actual icons
const UserIcon = () => (
    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);

interface AppLayoutProps {
  children: ReactNode;
  user: User | null; // Pass user from the page using the layout
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, user }) => {
  const { logout } = useAuth();
  const router = useRouter(); // Initialize router

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login'); // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
        <div className="flex items-center justify-between h-16 border-b border-gray-200">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Replace with actual logo SVG if available */}
            <span className="text-2xl font-bold text-indigo-600">Screenly AI</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/jobs" className="text-sm font-medium text-indigo-600 hover:text-indigo-800"> {/* Highlight current page */}
              Jobs
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Display user email if available */}
            {user?.email && (
                <span className="hidden sm:inline-block text-sm text-gray-600">{user.email}</span>
            )}
            <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Sign Out
              </button>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">User menu</span>
              <UserIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10">
        {children}
      </main>
    </div>
  );
};

export default AppLayout; 