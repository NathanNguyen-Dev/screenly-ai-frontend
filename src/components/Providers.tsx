'use client'; // Mark this component as a Client Component

import React from 'react';
// import { NextUIProvider } from '@nextui-org/react'; // Removed old provider
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes"; // Import Shadcn Theme Provider

export function Providers({ children }: { children: React.ReactNode }) {
  // Client-side providers are nested here
  return (
    <ThemeProvider
        attribute="class" // Use class-based theming
        defaultTheme="light" // Force light theme
        // enableSystem={false} // Disabled system preference detection
        disableTransitionOnChange // Optional: disable animations on theme change
      >
        <AuthProvider>
          {children}
        </AuthProvider>
    </ThemeProvider>
  );
} 