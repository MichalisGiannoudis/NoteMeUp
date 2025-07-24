export interface Notification {
    type: string;
    message: string;
    userId: string;
    targetGroup: string;
    createdAt: Date;
    updatedAt: Date;
    read: boolean;
}