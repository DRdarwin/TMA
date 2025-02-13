import { Router } from 'express';
import { RouteController } from '../../controllers/routeController.ts';
import asyncHandler from 'express-async-handler';

const router = Router();
const controller = new RouteController();

router.post('/routes', asyncHandler((req, res) => controller.createRoute(req, res)));
router.get('/routes', asyncHandler((req, res) => controller.getRoutes(req, res)));
router.get('/routes/:id', asyncHandler((req, res) => controller.getRouteById(req, res)));
router.put('/routes/:id', asyncHandler((req, res) => controller.updateRoute(req, res)));
router.delete('/routes/:id', asyncHandler((req, res) => controller.deleteRoute(req, res)));

export default router;
