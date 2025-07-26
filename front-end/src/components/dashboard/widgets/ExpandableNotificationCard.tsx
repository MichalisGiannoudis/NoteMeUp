import React, { useState, useEffect } from 'react';
import { Notification, unReadNotifications} from '@/types/notification';
import { useDashboardStore } from '@/store/dashboardStore';
import Image from 'next/image';

interface ExpandableNotificationCardProps {
  height: number;
  rowHeight: number;
  removeWidget: (id: string) => void;
}

export const ExpandableNotificationCard: React.FC<ExpandableNotificationCardProps> = ({ height, rowHeight, removeWidget }) => {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);
  const notifications = useDashboardStore(state => state.notifications);
  const isLoading = useDashboardStore(state => state.isLoading);
  const error = useDashboardStore(state => state.error);
  const fetchNotifications = useDashboardStore(state => state.fetchNotifications);
  const updateNotification = useDashboardStore(state => state.updateNotification);

  useEffect(() => {
    if (notifications.length === 0) {
      fetchNotifications();
    }
  }, [notifications, fetchNotifications]);

  useEffect(() => {
    const headerHeight = 40;
    const footerHeight = 32;
    const notificationHeight = 70;
    const availableHeight = height - headerHeight;

    const unreadNotifications = notifications.filter(n => n.read === false);
    const maxVisibleNotifications = Math.max(1, Math.floor(availableHeight / notificationHeight));
    
    if (notifications.length > maxVisibleNotifications) {
      const availableWithFooter = availableHeight - footerHeight;
      const adjustedMax = Math.max(1, Math.floor(availableWithFooter / notificationHeight));
      setVisibleNotifications(unreadNotifications.slice(0, adjustedMax));
    } else {
      setVisibleNotifications(unreadNotifications);
    }
  }, [height, notifications]);

  if ((!notifications.length && !error) || (isLoading && notifications.length === 0)) {
    return (
      <div className="bg-card-bg rounded-lg h-full flex flex-col">
        <div className="flex justify-between items-center p-3 border-b">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button onClick={() => removeWidget('notification')} className="hover:text-red-500">×</button>
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
          <button onClick={() => removeWidget('notification')} className="hover:text-red-500">×</button>
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
          <button onClick={() => removeWidget('notification')} className="hover:text-red-500">×</button>
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
    <div className="flex justify-between items-center p-1 border-b h-10">
      <h3 className="text-lg font-semibold">Notifications</h3>
      <Image onClick={() => removeWidget('notification')} src="/widget/widget-close.png" alt="Close" width={16} height={16} />
    </div>
    
    <div className="flex-grow overflow-y-auto flex flex-col justify-center">
      {visibleNotifications.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-card-muted text-md">No notifications available</p>
        </div>
      ) : (
        <div>
          {visibleNotifications.filter(n => n.read === false).map((notification, index) => (
            <div key={index} className="border-b last:border-b-0 h-[82px] px-3 flex items-center">
              <div className="flex items-center w-full">
                <div className="p-2 bg-background rounded-full mr-2 flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex flex-grow flex-col">
                  <h3 className="font-bold text-card-fg capitalize text-lg">
                    {notification.type || "Notification"}
                  </h3>
                  <p className="text-card-muted text-md line-clamp-2">{notification.message}</p>
                </div>
                <Image onClick={() => updateNotification(notification)} src="/widget/widget-notification-off.png" alt="Close" width={16} height={16} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {notifications.length > visibleNotifications.length && (
      <div className="border-t h-8 flex items-center justify-center">
        <span className="text-md truncate px-2">{unReadNotifications(notifications).length - visibleNotifications.length} more notification(s) - expand to view</span>
      </div>
    )}
  </div>
  );
};
