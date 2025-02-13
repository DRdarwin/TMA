import { Router } from 'express';
import { RoutesController } from '../../controllers/routesController.js';

const routes = Router();
const controller = new RoutesController();

routes.post('/', (req, res) => controller.createRoute(req, res));
routes.get('/', (req, res) => controller.getRoutes(req, res));
routes.get('/:id', (req, res) => controller.getRouteById(req, res));
routes.put('/:id', (req, res) => controller.updateRoute(req, res));
routes.delete('/:id', (req, res) => controller.deleteRoute(req, res));

export default routes;
