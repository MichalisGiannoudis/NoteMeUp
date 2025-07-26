'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { User } from '../../types/user';

type UpdateUserParams = Partial<User>;

interface UpdateUserResponse {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  updateUser: (userData: UpdateUserParams) => Promise<User | null>;
}

export function useUpdateUser(): UpdateUserResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const { token, setUser } = useAuthStore();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const updateUser = async (userData: UpdateUserParams): Promise<User | null> => {
    if (!token) {
      setError('Not authenticated');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await axios({
        method: 'PUT',
        url: `${API_URL}/auth/update`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-CSRF-Protection': '1'
        },
        data: userData,
        withCredentials: true
      });
      
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        setSuccess(true);
        setIsLoading(false);
        return response.data.user;
      }
      
      setIsLoading(false);
      return null;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Failed to update user';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };
  
  return { isLoading, error, success, updateUser };
}