import React, { useState, useEffect } from 'react';
import { Notification } from '@/types/notification';
import { useRouter } from 'next/navigation';
import { useDashboardStore } from '@/store/dashboardStore';

interface ExpandableNotificationCardProps {
  height: number;
  rowHeight: number;
  removeWidget: (id: string) => void;
}

export const ExpandableNotificationCard: React.FC<ExpandableNotificationCardProps> = ({ height, rowHeight, removeWidget }) => {
  const router = useRouter();
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);
  const notifications = useDashboardStore(state => state.notifications);
  const isLoading = useDashboardStore(state => state.isLoading);
  const error = useDashboardStore(state => state.error);
  const fetchNotifications = useDashboardStore(state => state.fetchNotifications);

  useEffect(() => {
    if (notifications.length === 0) {
      fetchNotifications();
    }
  }, [notifications, fetchNotifications]);

  useEffect(() => {
    const headerHeight = 40;
    const availableHeight = height - headerHeight;
    const notificationsPerRow = 1;
    const maxVisibleNotifications = Math.max(1, Math.floor(availableHeight / rowHeight) * notificationsPerRow);
    setVisibleNotifications(notifications.slice(0, maxVisibleNotifications));
  }, [height, rowHeight, notifications]);

  if ((!notifications.length && !error) || (isLoading && notifications.length === 0)) {
    return (
      <div className="bg-card-bg rounded-lg h-full flex flex-col">
        <div className="flex justify-between items-center p-3 border-b">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button onClick={() => removeWidget('notification')} className="text-gray-500 hover:text-red-500">×</button>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <p className="text-card-muted">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error && notifications.length === 0) {
    return (
      <div className="bg-card-bg rounded-lg h-full flex flex-col">
        <div className="flex justify-between items-center p-3 border-b">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button onClick={() => removeWidget('notification')} className="text-gray-500 hover:text-red-500">
            ×
          </button>
        </div>
        <div className="flex-grow p-3">
          <p className="text-red-500">Error loading notifications: {error}</p>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="bg-card-bg rounded-lg h-full flex flex-col">
        <div className="flex justify-between items-center p-3 border-b">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button onClick={() => removeWidget('notification')} className="text-gray-500 hover:text-red-500">
            ×
          </button>
        </div>
        <div className="flex-grow p-3">
          <p className="text-card-muted">No notifications available</p>
        </div>
      </div>
    );
  }

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'error':
        return (
        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'warning':
        return (
        <svg className="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'reminder':
        return (
          <svg className="h-6 w-6 text-amber-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6 text-card-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-card-bg rounded-lg h-full flex flex-col">
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button onClick={() => removeWidget('notification')} className="hover:text-red-500">×</button>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {visibleNotifications.map((notification, index) => (
          <div key={index} className="border-b last:border-b-0 p-3">
            <div className="flex items-start">
              <div className="p-2 bg-background rounded-full mr-3">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex flex-grow flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-card-fg capitalize">
                    {notification.type || "Notification"}
                  </h3>
                </div>
                <p className="text-card-muted">{notification.message || "No message available"}</p>
              </div>
            </div>
          </div>
        ))}
        
        {notifications.length > visibleNotifications.length && (
          <div className="p-2 text-center text-md border-t">
            {notifications.length - visibleNotifications.length} more notification(s) - expand to view
          </div>
        )}
      </div>
    </div>
  );
};
