'use client'

import { useNotifications } from '@/hooks/widgets/useNotifications.hook';
import React, { useState, useEffect} from 'react';
import { Notification } from '@/types/notification';

export const NotificationCard = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const { isLoading, error, getNotifications } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const fetchedNotifications = await getNotifications();
    if (fetchedNotifications && fetchedNotifications.length > 0) {
      setNotifications(fetchedNotifications);
      setCurrentNotification(fetchedNotifications[0]);
    }
  };

  if ((!currentNotification && !error) || (isLoading && notifications.length === 0)) {
    return (
      <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4 flex items-center justify-center">
        <p className="text-card-muted">Loading notifications...</p>
      </div>
    );
  }

  if (error && notifications.length === 0) {
    return (
      <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4">
        <p className="text-red-500">Error loading notifications: {error}</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4">
        <p className="text-card-muted">No notifications available</p>
      </div>
    );
  }

  // Function to determine icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'warning':
      case 'alert':
        return (
          <svg className="h-6 w-6 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4">
      <div className="flex items-start">
        <div className="p-2 bg-background rounded-full mr-3">
          {currentNotification && getNotificationIcon(currentNotification.type)}
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-card-fg capitalize">
            {currentNotification?.type || "Notification"}
          </h3>
          <p className="text-card-muted">
            {currentNotification?.message || "No message available"}
          </p>
          {currentNotification?.targetGroup && (
            <span className="text-xs text-card-muted mt-1 block">
              Group: {currentNotification.targetGroup}
            </span>
          )}
        </div>
        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
          View Detail
        </button>
      </div>
      {notifications.length > 1 && (
        <div className="mt-2 text-right">
          <span className="text-xs text-card-muted">
            {notifications.length - 1} more notification{notifications.length > 2 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
};
