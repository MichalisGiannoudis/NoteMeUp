import User from "../models/user.js";

export default class NotificationService {

    async getNotifications(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            return user.notifications || [];
        }
        catch (error) {
            throw new Error("Error fetching notifications: " + error.message);
        }
    }

    async addNotification(notificationData) {
        try {
            const { id, type, message, targetGroup } = notificationData;
            if (!id || !type || !message) {
                throw new Error("Missing required fields");
            }

            const notification = { id, type, message, targetGroup };
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }

            user.notifications = user.notifications || [];
            user.notifications.push(notification);
            await user.save();
            return notification;
        }
        catch (error) {
            throw new Error("Error adding notification: " + error.message);
        }
    }

    async removeNotification(notificationId) {
        try {
            const user = await User.findOne({ "notifications.id": notificationId });
            if (!user) {
                throw new Error("Notification not found");
            }

            user.notifications = user.notifications.filter(n => n.id !== notificationId);
            await user.save();
            return { message: "Notification removed successfully" };
        }
        catch (error) {
            throw new Error("Error removing notification: " + error.message);
        }
    }
}
