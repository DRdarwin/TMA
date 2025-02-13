import { Request, Response } from 'express';
import { RouteService } from '../services/routeService.js';

const routeService = new RouteService();

export class RoutesController {
  async createRoute(req: Request, res: Response) {
    try {
      const { name, description, waypoints } = req.body;
      const route = await routeService.createRoute(name, description, waypoints);
      res.status(201).json(route);
    } catch {
      res.status(500).json({ message: 'Не вдалося створити маршрут' });
    }
  }

  async getRoutes(req: Request, res: Response) {
    try {
      const routes = await routeService.getRoutes();
      res.json(routes);
    } catch {
      res.status(500).json({ message: 'Помилка отримання маршрутів' });
    }
  }

  async getRouteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const route = await routeService.getRouteById(id);
      if (!route) {
        return res.status(404).json({ message: 'Маршрут не знайдено' });
      }
      res.json(route);
    } catch {
      res.status(500).json({ message: 'Помилка отримання маршруту' });
    }
  }

  async updateRoute(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const route = await routeService.updateRoute(id, data);
      res.json(route);
    } catch {
      res.status(500).json({ message: 'Не вдалося оновити маршрут' });
    }
  }

  async deleteRoute(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await routeService.deleteRoute(id);
      res.json({ message: 'Маршрут видалено' });
    } catch {
      res.status(500).json({ message: 'Не вдалося видалити маршрут' });
    }
  }
}
