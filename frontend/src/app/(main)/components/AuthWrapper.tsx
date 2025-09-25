"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../utils/auth';

interface AuthWrapperProps {
  children: React.ReactNode;
  platform: 'corex' | 'woc';
  fallbackUrl?: string;
  loadingComponent?: React.ReactNode;
}

export default function AuthWrapper({
  children,
  platform,
  fallbackUrl,
  loadingComponent
}: AuthWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated(platform);
      setIsAuth(authStatus);
      setIsLoading(false);

      if (!authStatus) {
        const redirectUrl = fallbackUrl || (platform === 'corex' ? '/corex/manage-corex' : '/woc/manage-woc');
        router.replace(redirectUrl);
      }
    };

    checkAuth();
  }, [platform, fallbackUrl, router]);

  if (isLoading) {
    return loadingComponent || (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuth) {
    return null; // Will be redirected by useEffect
  }

  return <>{children}</>;
}

// Hook for authentication status
export const useAuth = (platform: 'corex' | 'woc') => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated(platform);
      setIsAuth(authStatus);
      setIsLoading(false);
    };

    checkAuth();
  }, [platform]);

  return { isAuthenticated: isAuth, isLoading };
};