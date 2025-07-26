import express from 'express';
import TodoController from '../controllers/todoController.js';

const router = express.Router();
const todoController = new TodoController();

router.get('/getTodos', (req, res) => todoController.getTodos(req, res));
router.post('/addTodo', (req, res) => todoController.addTodo(req, res));
router.delete('/removeTodo', (req, res) => todoController.removeTodo(req, res));
router.put('/updateTodo', (req, res) => todoController.updateTodo(req, res));

export default router;