import express from 'express';
import WidgetController from '../controllers/widgetController.js';

const router = express.Router();
const widgetController = new WidgetController();

router.get('/widget/getNotifications', (req, res) => widgetController.getNotifications(req, res));
router.post('/widget/addNotification', (req, res) => widgetController.addNotification(req, res));
router.delete('/widget/removeNotification', (req, res) => widgetController.removeNotification(req, res));

router.get('/widget/getTasks', (req, res) => widgetController.getTasks(req, res));
router.post('/widget/addTask', (req, res) => widgetController.addTask(req, res));
router.delete('/widget/removeTask', (req, res) => widgetController.removeTask(req, res));

export default router;