import express from 'express';
import WidgetController from '../controllers/widgetController.js';

const router = express.Router();
const widgetController = new WidgetController();

router.get('/widget/getNotifications', (req, res) => widgetController.getNotifications(req, res));
router.post('/widget/addNotification', (req, res) => widgetController.addNotification(req, res));
router.delete('/widget/removeNotification', (req, res) => widgetController.removeNotification(req, res));

export default router;