'use client'

import { useDashboardStore } from "@/store/dashboardStore";

export const NotificationsPage = () => {

    const notifications = useDashboardStore(state => state.notifications);
    const isLoading = useDashboardStore(state => state.isLoading);
    const error = useDashboardStore(state => state.error);
    const fetchNotifications = useDashboardStore(state => state.fetchNotifications);

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
            {notifications.map(notification => (
                <div key={notification.id} className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-xl p-5 shadow-lg mb-4 border border-gray-200 flex items-start gap-4 transition hover:shadow-xl">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-lg">
                        {notification.type[0]}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-blue-700">{notification.type}</h2>
                        <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}