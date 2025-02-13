import { Router } from 'express';
import { RoutesController } from '../controllers/routesController.js';
import asyncHandler from 'express-async-handler';

const router = Router();
const controller = new RoutesController();

router.post('/routes', asyncHandler((req, res) => controller.createRoute(req, res)));
router.get('/routes', asyncHandler((req, res) => controller.getRoutes(req, res)));
router.get('/routes/:id', asyncHandler((req, res) => controller.getRouteById(req, res)));
router.put('/routes/:id', asyncHandler((req, res) => controller.updateRoute(req, res)));
router.delete('/routes/:id', asyncHandler((req, res) => controller.deleteRoute(req, res)));

export default router;
