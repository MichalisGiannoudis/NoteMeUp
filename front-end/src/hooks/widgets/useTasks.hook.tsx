'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { Task } from '../../types/task';

export function useTasks() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { token, setUser } = useAuthStore();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const getTasks = async (): Promise<Task[] | null> => {
    if (!token) {
      setError('Not authenticated');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await axios({
        method: 'GET',
        url: `${API_URL}/widget/getTasks`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-CSRF-Protection': '1'
        },
        withCredentials: true
      });
      
      if (response.data.success && response.data.user) {
        setSuccess(true);
        setIsLoading(false);
        return response.data.tasks;
      }
      
      setIsLoading(false);
      return null;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Failed to get tasks';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };
  
  return { isLoading, error, success, getTasks };
}