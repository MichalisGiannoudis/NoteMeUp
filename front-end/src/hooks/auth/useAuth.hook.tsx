'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '@/context/ThemeContext';

export function useAuth() {
  const { user, authenticated, isLoading, getAuthenticatedUser, signIn: authSignIn } = useAuthStore();
  const { setTheme } = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { user } = await getAuthenticatedUser();
        if (user?.theme) {
          setTheme(user.theme as 'light' | 'dark');
        }
      } catch (err) {
        setError('Failed to get authenticated user:' + err);
      } finally {
        setIsInitialized(true);
      }
    };
    
    initAuth();
  }, [getAuthenticatedUser, setTheme]);
  
  const signIn = async (email: string, password: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setError(null);
    
    if (!API_URL) {
      return { success: false, error: 'API configuration error' };
    }
    
    try {
      const response = await axios.post(
        `${API_URL}/auth/signin`,
        { email, password }
      );
      
      if (!response?.data?.token) {
        const errorMsg = 'Sign-in failed: No token received from server';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      const userData = response.data.user || { email };
      authSignIn(response.data.token, userData);

      if (userData.theme) {
        setTheme(userData.theme as 'light' | 'dark');
      }
      
      return { success: true };
      
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || 'Unknown error during sign-in';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  return { user, authenticated, isLoading: isLoading || !isInitialized, error, signIn };
}