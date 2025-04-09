'use client'; // This directive is needed for contexts using hooks like useState, useEffect

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Adjust path if necessary

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        try {
          const token = await user.getIdToken();
          localStorage.setItem('idToken', token);
          console.log("ID Token stored in localStorage.");
          setUser(user);
        } catch (error) {
          console.error("Error getting ID token: ", error);
          // Handle error: maybe clear local storage and log out user?
          localStorage.removeItem('idToken');
          setUser(null);
          // Optionally call signOut(auth) here if token fetch fails critically
        }
      } else {
        // User is signed out
        localStorage.removeItem('idToken');
        console.log("ID Token removed from localStorage.");
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to get ID token
  const getIdToken = async (): Promise<string | null> => {
    if (user) {
      try {
        // Force refresh if necessary? Usually handled automatically
        const token = await user.getIdToken(false); // Set to true to force refresh
        // Store/update token in localStorage as well?
        // localStorage.setItem('idToken', token);
        return token;
      } catch (error) {
        console.error("Error getting ID token from user object:", error);
        // Attempt logout or clear state if token fails repeatedly
        // await logout(); // Consider this carefully
        return null;
      }
    } else {
      console.log("User not logged in, cannot get ID token.");
      // Check local storage as a fallback? Unreliable.
      // const storedToken = localStorage.getItem('idToken');
      // if (storedToken) return storedToken; 
      return null;
    }
  };

  const logout = async () => {
    setLoading(true);
    // Remove token immediately on explicit logout
    localStorage.removeItem('idToken'); 
    console.log("ID Token removed from localStorage on logout.");
    try {
      await signOut(auth);
      setUser(null); // Listener above will also set user to null, but do it here for immediate UI update
    } catch (error) {
      console.error("Error signing out: ", error);
      // Consider if token should be re-attempted to remove in catch block?
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    logout,
    getIdToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until loading is false to prevent flash of unauthenticated content */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 