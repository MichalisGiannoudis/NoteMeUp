import User from "../models/user.js";
import ToDo from "../models/todo.js";

export default class TaskService {

    async getTodos(userId = null) {
        try {
            const query = {};
            const todos = await ToDo.find(query).sort({ createdAt: -1 }).limit(20).lean();
            return todos;
        }
        catch (error) {
            console.error("Error in getTodos:", error);
            throw new Error("Error fetching todos: " + error.message);
        }
    }

    async addTodo(todoData) {
    }

    async removeTodo(todoId) {
    }

    async updateTodo(todoId, todoData) {  
    }
}
