export interface Notification {
    id: string;
    type: string;
    message: string;
    userId: string;
    targetGroup: string;
    createdAt: Date;
    updatedAt: Date;
    read: boolean;
}

export function unReadNotifications(notifications : Notification[]) : Notification[] {
    return notifications.filter(notification => !notification.read);
}