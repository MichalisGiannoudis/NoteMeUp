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

    async addNotification(notificationData) {
    }

    async removeNotification(notificationId) {
    }
}
