'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { User } from 'firebase/auth';

interface WithAuthProps {
  user: User;
  // Add any other props that your wrapped component might need from the HOC
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>
) => {
  const ComponentWithAuth = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading || !user) {
      // You can render a loading spinner or null while checking auth
      return <div>Loading...</div>;
    }

    // Pass the user object and other props down to the wrapped component
    return <WrappedComponent {...props} user={user} />;
  };

  // Set display name for easier debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithAuth.displayName = `withAuth(${displayName})`;

  return ComponentWithAuth;
};

export default withAuth; 