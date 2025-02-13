import { Router } from 'express';
import { UserController } from '../../controllers/userController.js';
import { UserService } from '../../services/userService.js';
import { PrismaService } from '../../services/prismaService';
import router from './flights.js';
const userController = new UserController(new UserService(new PrismaService()));
const userController = new UserController(new UserService());
router.get('/:telegramId', (req, res) => userController.getUser(req, res, req.params.telegramId));
router.post('/', (req, res) => userController.registerUser(req, res, req.body.telegramId));
router.post('/update', (req, res) => userController.updateUser(req, res, req.body));
router.post('/update', (req: string, res: string | undefined) => userController.updateUser(req, res));

export default router;
