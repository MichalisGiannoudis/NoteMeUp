"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { User } from '@/types/user';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  user: User | null;
};

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { theme, toggleTheme } = useTheme();
  const currentDate = new Date().toLocaleDateString('gr-GR', {weekday: 'long',month: 'long',day: 'numeric',year: 'numeric',});
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
    setShowDropdown(false);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-card-bg text-card-fg shadow-sm">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
          <Image src={`${user?.profilePicture || '/dashboard/user-icon.png'}`} alt="ProfilePic" width={40} height={40} className="object-cover"/>
        </div>
        <div>
          <h2 className="font-bold text-foreground">Hey, {user?.firstname || 'User'}</h2>
          <p className="text-xs text-foreground/60">{currentDate}</p>
        </div>
      </div>
      
      <div className="flex items-center">        
        <button onClick={toggleTheme} className="mr-2" aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m0 12.728l1.414-1.414M17.657 6.343l-1.414-1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>

        <div onClick={handleLogout} className="relative">
          <Image src="/dashboard/shutdown-icon.png" alt="logout" width={24} height={24} className="cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};
