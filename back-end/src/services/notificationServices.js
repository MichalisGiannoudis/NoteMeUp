import User from "../models/user.js";
import Notification from "../models/notification.js";

export default class NotificationService {

    async getNotifications(userId = null) {
        try {
            // Use a more lenient query for testing
            // const query = userId ? { userId } : {};  UNCOMMENT THIS LINE IF YOU WANT TO FILTER BY USER ID, Later on
            const query = {};
            const notifications = await Notification.find(query).sort({ createdAt: -1 }).limit(10).lean(); 
            return notifications;
        }
        catch (error) {
            console.error("Error in getNotifications:", error);
            throw new Error("Error fetching notifications: " + error.message);
        }
    }

    async updateNotification(userId = null, notificationId, notificationRead) {
        try {
            const notification = await Notification.findOneAndUpdate(
                { id: parseInt(notificationId) },
                { $set: { read: notificationRead } },
                { new: true }
            );
            if (!notification) {
                throw new Error("Notification not found or does not belong to the user");
            }
            return notification;
        }
        catch (error) {
            console.error("Error in updateNotification:", error);
            throw new Error("Error updating notification: " + error.message);
        }
    }

    async addNotification(notificationData) {
    }

    async removeNotification(notificationId) {
    }
}
