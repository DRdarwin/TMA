var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class RouteService {
    createRoute(name, description, waypoints) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.route.create({
                data: { name, description, waypoints },
            });
        });
    }
    getRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.route.findMany();
        });
    }
    getRouteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.route.findUniqueOrThrow({ where: { id } });
        });
    }
    updateRoute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.route.update({ where: { id }, data });
        });
    }
    deleteRoute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const route = yield prisma.route.findUnique({ where: { id } });
            if (!route) {
                throw new Error("Маршрут не знайдено");
            }
            return prisma.route.delete({ where: { id } });
        });
    }
}
