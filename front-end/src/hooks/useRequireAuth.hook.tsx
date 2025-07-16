'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';

export function useRequireAuth() {
  const { user, authenticated, isLoading, getAuthenticatedUser } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await getAuthenticatedUser();
      } finally {
        setIsInitialized(true);
      }
    };
    
    initAuth();
  }, [getAuthenticatedUser]);

  useEffect(() => {
    if (isLoading || !isInitialized) return;
    
    if (!authenticated) {
      router.push('/');
    }
  }, [isLoading, authenticated, router, isInitialized]);

  return { 
    user, 
    authenticated, 
    isLoading: isLoading || !isInitialized 
  };
}
