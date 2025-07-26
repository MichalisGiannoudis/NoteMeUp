import express from 'express';
import TeamController from '../controllers/teamController.js';

const router = express.Router();
const teamController = new TeamController();

router.post('/getteam', (req, res) => teamController.getTeam(req, res));
router.post('/createteam', (req, res) => teamController.createTeam(req, res));
router.get('/removeteam', (req, res) => teamController.removeTeam(req, res));
router.put('/updateteam', (req, res) => teamController.updateTeam(req, res));

export default router;