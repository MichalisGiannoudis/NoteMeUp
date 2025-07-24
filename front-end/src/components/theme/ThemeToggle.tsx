"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useUpdateUser } from '@/hooks/user/useUpdateUser.hook';
import { User } from '@/types/user';

export const ThemeButton = ({ user }: {user: User | null}) => {

    const [, setUpdateTrigger] = useState(0);
    const { theme, setTheme } = useTheme();
    const { updateUser } = useUpdateUser();
    const [lastThemeChange, setLastThemeChange] = useState<number>(0);
    const cooldownTime = 500;

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

    const handleThemeButton = () => {
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

    return (
        <button onClick={handleThemeButton} className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 mr-6
            ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}> 
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
            <span className={`${theme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'} inline-block h-6 w-6 transform rounded-full bg-white 
                transition-transform duration-300 shadow-md z-10`}/>
        </button>
    );
};