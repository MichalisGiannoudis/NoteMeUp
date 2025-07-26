import express from 'express';
import WidgetController from '../controllers/widgetController.js';

const router = express.Router();
const widgetController = new WidgetController();

router.get('/getNotifications', (req, res) => widgetController.getNotifications(req, res));
router.post('/updateNotification', (req, res) => widgetController.updateNotification(req, res));
router.post('/addNotification', (req, res) => widgetController.addNotification(req, res));
router.delete('/removeNotification', (req, res) => widgetController.removeNotification(req, res));

router.get('/getTasks', (req, res) => widgetController.getTasks(req, res));
router.post('/addTask', (req, res) => widgetController.addTask(req, res));
router.delete('/removeTask', (req, res) => widgetController.removeTask(req, res));

export default router;