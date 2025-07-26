'use client'

import { useDashboardStore } from "@/store/dashboardStore";
import { Notification } from "@/types/notification";
import Image from 'next/image';

export const NotificationsPage = () => {

    const updateNotifications = useDashboardStore(state => state.updateNotifications);
    const notifications = useDashboardStore(state => state.notifications);
    const isLoading = useDashboardStore(state => state.isLoading);
    const error = useDashboardStore(state => state.error);

    const silenceNotification = (notification : Notification) => {
        updateNotifications(notification);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            {isLoading && notifications.length === 0 && (
                <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4 flex items-center justify-center">
                    <p className="text-card-muted">Loading notifications...</p>
                </div>
            )}
            {error && notifications.length === 0 && (
                <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4">
                    <p className="text-red-500">Error loading notifications: {error}</p>
                </div>
            )}
            {notifications.length === 0 && !isLoading && (
                <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4">
                    <p className="text-card-muted">No notifications available</p>
                </div>
            )}
            {notifications.filter(n => n.read === false).map(notification => (
                <div key={notification.id} className="bg-card-bg rounded-xl p-5 shadow-lg mb-4 border border-gray-200 flex items-start gap-4 transition hover:shadow-xl">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-lg">
                        {notification.type[0]}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-blue-700">{notification.type}</h2>
                        <p className="text-sm mt-1">{notification.message}</p>
                        <p className="text-xs mt-2">{new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                    <Image onClick={() => silenceNotification(notification)} src="/widget/widget-notification-off.png" alt="Close" width={24} height={24} className="hover:animate-ping"/>
                </div>
            ))}
        </div>
    );
}