import AuthenticationService from "../services/authenticationServices.js";
import TodoService from "../services/todoServices.js";

class TodoController{
    constructor() {
        this.authenticationService = new AuthenticationService();
        this.todoService = new TodoService();
    }

    async getTodo(req, res) {
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

            const todos = await this.todoService.getTasks(user._id);
            
            return res.status(200).json({success: true, user: user, todos: todos});
        }
        catch (error) {
            console.error("GET widget/getTodos, Something Went Wrong:", error);
            return res.status(400).json({ error: true, message: error.message });
        }
    }

    async addTodo(req, res) {
    }

    async removeTodo(req, res) {
    }

    async updateTodo(req, res) {
    }
}

export default TodoController;