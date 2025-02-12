import { Router } from 'express';
import * as AdminController from '../../controllers/adminController.js';
const router = Router();
// User management routes
router.get('/users', AdminController.getAllUsers);
router.post('/user/:telegramId/ban', AdminController.banUser);
router.post('/user/:telegramId/unban', AdminController.unbanUser);
// Flight management routes
router.get('/flights', AdminController.getFlights);
router.post('/flights', AdminController.createFlight);
router.put('/flights/:id', AdminController.updateFlight);
router.delete('/flights/:id', AdminController.deleteFlight);
// Wallet management routes
router.get('/wallets', AdminController.getWallets);
router.put('/wallets/:id', AdminController.updateWallet);
export default router;
