import { Router } from 'express';
import { AdminController } from '../../controllers/adminController.js';

const router = Router();
const adminController = new AdminController();

router.get('/users', (req, res) => adminController.getAllUsers(req, res));
router.post('/user/:telegramId/ban', (req, res) => adminController.banUser(req, res));
router.post('/user/:telegramId/unban', (req, res) => adminController.unbanUser(req, res));

export default router;
