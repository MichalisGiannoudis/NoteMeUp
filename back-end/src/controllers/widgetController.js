import NotificationService from "../services/notificationServices.js";
import AuthenticationService from "../services/authenticationServices.js";
import TaskService from "../services/taskServices.js";

class WidgetController{
    constructor() {
        this.notificationService = new NotificationService();
        this.authenticationService = new AuthenticationService();
        this.taskService = new TaskService();
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
    }

    async removeNotification(req, res) {
    }

    async getTasks(req, res) {
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

            const tasks = await this.tasksService.getTasks(user._id);
                
            return res.status(200).json({success: true, user: user, tasks: tasks});
        }
        catch (error) {
            console.error("GET widget/getTasks, Something Went Wrong:", error);
            return res.status(400).json({ error: true, message: error.message });
        }
    }

    async addTask(req, res) {
    }

    async removeTask(req, res) {
    }
}

export default WidgetController;