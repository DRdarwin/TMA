import { Router, Request, Response } from 'express';
class AdminController {
	getAllUsers(req: Request, res: Response) {
		res.send('Get all users');
	}

	banUser(req: Request, res: Response) {
		res.send('Ban user');
	}

	unbanUser(req: Request, res: Response) {
		res.send('Unban user');
	}
}

const router = Router();
const adminController = new AdminController();

router.get('/users', (req, res) => adminController.getAllUsers(req, res));
router.post('/user/:telegramId/ban', (req, res) => adminController.banUser(req, res));
router.post('/user/:telegramId/unban', (req, res) => adminController.unbanUser(req, res));

export default router;
