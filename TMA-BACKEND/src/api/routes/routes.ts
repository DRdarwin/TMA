import { Router } from 'express';

import { RouteController } from '../../controllers/routeController.js';
import asyncHandler from 'express-async-handler';

const router = Router();
const controller = new RouteController();

router.post('/routes', asyncHandler(async (req, res) => { await controller.createRoute(req, res); }));
router.get('/routes', asyncHandler(async (req, res) => await controller.getRoutes(req, res)));
router.get('/routes/:id', asyncHandler(async (req, res) => await controller.getRouteById(req, res)));
router.put('/routes/:id', asyncHandler(async (req, res) => await controller.updateRoute(req, res)));
router.delete('/routes/:id', asyncHandler(async (req, res) => await controller.deleteRoute(req, res)));

export default router;
