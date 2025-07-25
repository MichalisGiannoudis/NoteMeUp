'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDashboardStore } from '@/store/dashboardStore';
import { unReadNotifications } from '@/types/notification';
import { useAuthStore } from '@/store/authStore';

export const Sidebar: React.FC = () => {

  const notifications = useDashboardStore(state => state.notifications);
  const { user } = useAuthStore();
  const tasks = useDashboardStore(state => state.tasks);
  const router = useRouter();

  return (
    <div className="bg-card-bg text-card-fg h-screen w-64 flex flex-col shadow-lg">
      <div className="p-4 border-b flex justify-ce items-center gap-2">
        <Image src="/dashboard/logo.png" alt="Logo" width={40} height={40} className="object-cover" />
        <span className="font-bold text-lg">Note Me Up</span>
      </div>

      <div className="flex-grow overflow-y-auto py-4 space-y-1">
        <div className="flex items-center px-4 py-2 cursor-pointer" onClick={() => {router.push('/dashboard')}}>
          <Image src="/dashboard/dashboard-icon.png" width={20} height={20} alt="Dashboard" />
          <span className="ml-3">Dashboard</span>
        </div>
        <div className="flex items-center px-4 py-2 cursor-pointer" onClick={() => {}}>
          <Image src="/dashboard/inbox-icon.png" width={20} height={20} alt="Inboxes" />
          <span className="ml-3">Inboxes</span>
        </div>
        <div className="flex items-center px-4 py-2 cursor-pointer" onClick={() => {}}>
          <Image src="/dashboard/performance-icon.png" width={20} height={20} alt="Performances" />
          <span className="ml-3">Performance</span>
        </div>
        <div className="flex items-center px-4 py-2 cursor-pointer pl-6" onClick={() => {router.push('/tasks')}}>
          <Image src="/dashboard/tasks-icon.png" width={16} height={16} alt="Active Project" />
          <span className="ml-3">Tasks</span>
          { tasks.length !== 0 &&<span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full ml-auto">{tasks.length}</span>}
        </div>
        <div className="flex items-center px-4 py-2 cursor-pointer" onClick={() => {}}>
          <Image src="/dashboard/analytics-icon.png" width={20} height={20} alt="Analytics" />
          <span className="ml-3">Analytics</span>
        </div>
        <div className="flex items-center px-4 py-2 cursor-pointer" onClick={() => {router.push('/notifications')}}>
          <Image src="/dashboard/notification-icon.png" width={20} height={20} alt="Notification" />
          <span className="ml-3">Notifications</span>
          { unReadNotifications(notifications).length !== 0 && <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full ml-auto">{unReadNotifications(notifications).length}</span>}
        </div>
        { user && user.role === 'admin' && <div className="flex items-center px-4 py-2 cursor-pointer" onClick={() => {router.push('/user')}}>
          <Image src="/dashboard/team-icon.png" width={20} height={20} alt="Users" />
          <span className="ml-3">Users / Teams</span>
        </div> }
        <div className="flex items-center px-4 py-2 cursor-pointer" onClick={() => {}}>
          <Image src="/dashboard/settings-icon.png" width={20} height={20} alt="Help Center" />
          <span className="ml-3">Settings</span>
        </div>
        <div className="flex items-center px-4 py-2 cursor-pointer" onClick={() => {}}>
          <Image src="/dashboard/help-icon.png" width={20} height={20} alt="Help Center" />
          <span className="ml-3">Help Center</span>
        </div>
      </div>
    </div>
  );
};
