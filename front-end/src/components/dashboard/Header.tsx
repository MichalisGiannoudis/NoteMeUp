"use client";

import Image from 'next/image';
import { User } from '@/types/user';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ThemeButton } from '../theme/ThemeToggle';

export const Header = ({ user }: {user: User | null}) => {
  const currentDate = new Date().toLocaleDateString('gr-GR', {weekday: 'long',month: 'long',day: 'numeric',year: 'numeric',});
  const router = useRouter();
  const { logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const widgetOptions = [
    { label: "Tasks", value: "tasks" },
    { label: "Stats", value: "stats" },
    { label: "Notification", value: "notification" },
    { label: "Bar Chart", value: "barChart" },
    { label: "Performance Chart", value: "performanceChart" },
  ];
  const [widgetType, setWidgetType] = useState<string | null>(null);

  const handleDropdownSelect = (type: string) => {
    setWidgetType(type);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-card-bg text-card-fg shadow-sm">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <Image onClick={() => router.push('/user')} src={`${user?.profilePicture || '/dashboard/user-icon.png'}`} alt="ProfilePic" width={40} height={40} className="object-cover cursor-pointer"/>
        </div>
        <div>
          <h2 className="font-bold text-foreground cursor-default">Hey, {user?.firstname || 'User'}</h2>
          <p className="text-xs text-foreground/60 cursor-default">{currentDate}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center">
          <div className="flex items-center mr-8" onClick={() => setShowDropdown((prev) => !prev)}>
            <Image src="/dashboard/plus-icon.png" alt="Logo" width={30} height={30} className="cursor-pointer" />    
              {showDropdown && ( 
                <div className="absolute z-50 mt-2 border rounded shadow-lg top-12">
                  {widgetOptions.map(opt => (
                    <div key={opt.value} className="px-4 py-2 cursor-pointer" onClick={() => handleDropdownSelect(opt.value)}>
                      {opt.label}
                    </div>
                ))}
              </div>
            )}
            <span className="ml-2 text-lg font-bold text-foreground cursor-pointer">Add Widget</span>
          </div>
        </div>
        <ThemeButton user={user}/>
        <div onClick={handleLogout} className="relative">
          <Image src="/dashboard/shutdown-icon.png" alt="logout" width={24} height={24} className="cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};
