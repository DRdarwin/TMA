import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../../controllers/userController.js';
import { UserService } from '../../services/userService.js';
import { PrismaService } from '../../prisma/prisma.service.js';

const router = Router();
const userService = new UserService(new PrismaService());
const userController = new UserController(userService);

router.get('/:telegramId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { telegramId } = req.params;
        const user = await userController.getUser(req, res, telegramId); // ✅ Передаємо `req`, `res`, і `telegramId`
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { telegramId } = req.body;
        const newUser = await userController.registerUser(telegramId); // ✅ Передаємо тільки `telegramId`
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

router.post('/update', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedUser = await userController.updateUser(req.body); // ✅ Передаємо тільки `req.body`
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

export default router;
