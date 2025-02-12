import { PrismaClient } from '@prisma/client';

type Waypoint = {
  latitude: number;
  longitude: number;
  name?: string;
};

const prisma = new PrismaClient();

export class RouteService {
  async createRoute(name: string, description: string, waypoints: Waypoint[]) {
    return prisma.route.create({
      data: { name, description, waypoints },
    });
  }

  async getRoutes() {
    return prisma.route.findMany();
  }

  async getRouteById(id: string) {
    return prisma.route.findUniqueOrThrow({ where: { id } });
  }

  async updateRoute(id: string, data: Partial<{ name: string; description: string; waypoints: Waypoint[] }>) {
    return prisma.route.update({ where: { id }, data });
  }

  async deleteRoute(id: string) {
    const route = await prisma.route.findUnique({ where: { id } });
    if (!route) {
      throw new Error('Маршрут не знайдено');
    }
    return prisma.route.delete({ where: { id } });
  }
}
