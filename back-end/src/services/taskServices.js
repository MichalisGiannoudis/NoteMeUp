import User from "../models/user.js";
import Task from "../models/task.js";

export default class TaskService {

    async getTasks(userId = null) {
        try {
            // Use a more lenient query for testing
            // const query = userId ? { userId } : {};  UNCOMMENT THIS LINE IF YOU WANT TO FILTER BY USER ID, Later on
            const query = {};
            const tasks = await Task.find(query).sort({ createdAt: -1 }).limit(20).lean();
            return tasks;
        }
        catch (error) {
            console.error("Error in getTasks:", error);
            throw new Error("Error fetching tasks: " + error.message);
        }
    }

    async addTask(taskData) {
    }

    async removeNotification(taskId) {
    }
}
