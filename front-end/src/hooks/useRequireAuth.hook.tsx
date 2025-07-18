'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export function useRequireAuth() {
  const { user, authenticated, isLoading, getAuthenticatedUser } = useAuthStore();
  const { setTheme } = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { user } = await getAuthenticatedUser();
        if (user?.theme) {
          setTheme(user.theme as 'light' | 'dark');
        }
      } finally {
        setIsInitialized(true);
      }
    };
    
    initAuth();
  }, [getAuthenticatedUser, setTheme]);

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
