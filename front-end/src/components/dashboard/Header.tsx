"use client";

import Image from 'next/image';
import { User } from '@/types/user';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUpdateUser } from "@/hooks/useUpdateUser.hook";

type HeaderProps = {
  user: User | null;
};

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { theme, setTheme } = useTheme();
  const { updateUser } = useUpdateUser();
  const [lastThemeChange, setLastThemeChange] = useState<number>(0);
  const cooldownTime = 500;
  const currentDate = new Date().toLocaleDateString('gr-GR', {weekday: 'long',month: 'long',day: 'numeric',year: 'numeric',});
  const router = useRouter();
  const { logout } = useAuthStore();
  const [, setUpdateTrigger] = useState(0);

  useEffect(() => {
    if (Date.now() - lastThemeChange < cooldownTime) {
      const interval = setInterval(() => {
        setUpdateTrigger(Date.now());
        if (Date.now() - lastThemeChange >= cooldownTime) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lastThemeChange, cooldownTime]);

  const handleThemeToggle = () => {
    const now = Date.now();
    if (now - lastThemeChange < cooldownTime) {
      return;
    }
    
    const newTheme = theme === 'light' ? 'dark' : 'light';
    if (user) {
      updateUser({ theme: newTheme });
    }
    setTheme(newTheme);
    setLastThemeChange(now);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-card-bg text-card-fg shadow-sm">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
          <Image onClick={() => router.push('/user')} src={`${user?.profilePicture || '/dashboard/user-icon.png'}`} alt="ProfilePic" width={40} height={40} className="object-cover cursor-pointer"/>
        </div>
        <div>
          <h2 className="font-bold text-foreground cursor-default">Hey, {user?.firstname || 'User'}</h2>
          <p className="text-xs text-foreground/60 cursor-default">{currentDate}</p>
        </div>
      </div>
      
      <div className="flex items-center">        
        <div className="flex items-center mr-4 relative">
          <button onClick={handleThemeToggle} 
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
            } ${Date.now() - lastThemeChange < cooldownTime ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={Date.now() - lastThemeChange < cooldownTime}>
            <span className="absolute left-1.5 text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="absolute right-1.5 text-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </span>
            <span className={`${theme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'} inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-md z-10`}/>
          </button>
        </div>

        <div onClick={handleLogout} className="relative">
          <Image src="/dashboard/shutdown-icon.png" alt="logout" width={24} height={24} className="cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};
