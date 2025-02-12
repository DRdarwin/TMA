import { Request, Response } from 'express';

import { RouteService } from '../services/routeService.js';

const routeService = new RouteService();

export class RouteController {
    async createRoute(req: Request, res: Response) {
        const { name, description, waypoints } = req.body;
        if (!name || !Array.isArray(waypoints) || waypoints.length === 0) {
            return res.status(400).json({ message: 'Некоректні вхідні дані: необхідна назва маршруту та список точок' });
        }
        const route = await routeService.createRoute(name, description, waypoints);
        res.json(route);
    }

    async getRoutes(req: Request, res: Response) {
        const routes = await routeService.getRoutes();
        res.json(routes);
    }

    async getRouteById(req: Request, res: Response) {
        const { id } = req.params;
        const route = await routeService.getRouteById(id);
        res.json(route);
    }

    async updateRoute(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const route = await routeService.updateRoute(id, data);
        res.json(route);
    }

    async deleteRoute(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await routeService.deleteRoute(id);
            res.json({ message: 'Маршрут видалено' });
        } catch (error) {
            res.status(404).json({ message: error instanceof Error ? error.message : 'Unknown error occurred' });
        }
    }
}