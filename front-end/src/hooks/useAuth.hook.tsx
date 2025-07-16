'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, authenticated, isLoading, getAuthenticatedUser, signIn: authSignIn } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await getAuthenticatedUser();
      } catch (err) {
        setError('Failed to get authenticated user:' + err);
      } finally {
        setIsInitialized(true);
      }
    };
    
    initAuth();
  }, [getAuthenticatedUser]);
  
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
      
      authSignIn(response.data.token, response.data.user || { email });
      return { success: true };
      
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || 'Unknown error during sign-in';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  return { user, authenticated, isLoading: isLoading || !isInitialized, error, signIn };
}