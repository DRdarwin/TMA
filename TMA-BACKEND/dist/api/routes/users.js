var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { UserController } from '../../controllers/userController.js';
import { UserService } from '../../services/userService.js';
import { PrismaService } from '../../prisma/prisma.service.js';
const router = Router();
const userService = new UserService(new PrismaService());
const userController = new UserController(userService);
router.get('/:telegramId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { telegramId } = req.params;
        const user = yield userController.getUser(req, res, telegramId); // ✅ Передаємо `req`, `res`, і `telegramId`
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { telegramId } = req.body;
        const newUser = yield userController.registerUser(telegramId); // ✅ Передаємо тільки `telegramId`
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/update', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userController.updateUser(req.body); // ✅ Передаємо тільки `req.body`
        res.json(updatedUser);
    }
    catch (error) {
        next(error);
    }
}));
export default router;
