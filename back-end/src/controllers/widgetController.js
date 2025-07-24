import NotificationService from "../services/notificationServices.js";
import AuthenticationService from "../services/authenticationServices.js";

class WidgetController{
    constructor() {
        this.notificationService = new NotificationService();
        this.authenticationService = new AuthenticationService();
    }

    async getNotifications(req, res) {
        try {
            const authHeader = req.headers.authorization; 
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ error: true, message: "Unauthorized" });  
            }

            const token = authHeader.replace("Bearer ", "");
            const user = await this.authenticationService.getCurrentUser(token);
            if (!user) {
                return res.status(401).json({ error: true, message: "Unauthorized" });
            }

            const notifications = await this.notificationService.getNotifications(user._id);
                
            return res.status(200).json({success: true, user: user, notifications: notifications});
        }
        catch (error) {
            console.error("GET widget/getNotifications, Something Went Wrong:", error);
            return res.status(400).json({ error: true, message: error.message });
        }
    }

    async addNotification(req, res) {
        try {
            const { id, type, message, targetGroup } = req.body;

            if (!id || !type || !message) {
                return res.status(400).json({ error: true, message: "Missing required fields" });
            }

            const notificationData = { id, type, message, targetGroup };
            const notification = await this.notificationService.addNotification(notificationData);
            res.status(201).json(notification);
        } catch (err) {
            console.error("POST widget/addNotification, Something Went Wrong:", err);
            res.status(400).send({ error: true, message: err.message });
        }
    }

    async removeNotification(req, res) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ error: true, message: "Missing required fields" });
            }

            await this.notificationService.removeNotification(id);
            res.status(204).send();
            
        } catch (err) {
            console.error("DELETE widget/removeNotification, Something Went Wrong:", err);
            res.status(400).send({ error: true, message: err.message });
        }
    }
}

export default WidgetController;