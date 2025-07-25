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