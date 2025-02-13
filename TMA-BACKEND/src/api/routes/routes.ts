import { Router, Request, Response } from 'express';
import { RoutesController } from '../../controllers/routesController.js';
import asyncHandler from 'express-async-handler';

const router = Router();
const controller = new RoutesController();

router.post('/routes', asyncHandler(async (req: Request, res: Response) => {
    await controller.createRoutes(req, res); // ✅ Виклик createRoutes (МНОЖИНА)
}));

router.get('/routes', asyncHandler(async (req: Request, res: Response) => {
    await controller.getRoutes(req, res); // ✅ Виклик getRoutes (МНОЖИНА)
}));

router.get('/routes/:id', asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await controller.getRoutesById(req,res); // ✅ Виклик getRoutesById (МНОЖИНА)
}));

router.put('/routes/:id', asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await controller.updateRoutes(req,res); // ✅ Виклик updateRoutes (МНОЖИНА)
}));

router.delete('/routes/:id', asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await controller.deleteRoutes(req,res); // ✅ Виклик deleteRoutes (МНОЖИНА)
}));

export default router;
