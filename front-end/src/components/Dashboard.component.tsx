'use client';

import React from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth.hook';
import { useAuthStore } from '../store/authStore';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';

export const Dashboard = () => {
  const { user, authenticated, isLoading } = useRequireAuth() as { user: User | null, authenticated: boolean, isLoading: boolean };
  const { logout } = useAuthStore();
  const router = useRouter();
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  
  if (isLoading) {
    return (
      <div className="p-16 bg-gray-800 h-screen">
        <div className="text-2xl mb-4 font-bold text-white">Dashboard</div>
        <div className="ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-white" />
        <div className="mt-4 text-white">Verifying authentication...</div>
      </div>
    );
  }
  
  if (!authenticated) {
    return null;
  }
  
  return (
    <div className="p-16 bg-gray-800 h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold text-white">Dashboard</div>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">Logout</button>
      </div>
      { user &&
        <div className='text-white'>
          <div className="text-lg text-bold mb-2"> User Details </div>
          <div className="flex">
            <div className="w-24 font-medium">
              <div> Email : </div>
              <div> Firstname : </div>
              <div> Lastname : </div>
            </div>
            <div>
              <div> {user.email} </div>
              <div> {user.firstname} </div>
              <div> {user.lastname} </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}