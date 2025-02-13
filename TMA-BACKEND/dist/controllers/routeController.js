var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RouteService } from "../services/routeService.js.js";
const routeService = new RouteService();
export class RouteController {
    createRoute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, waypoints } = req.body;
            if (!name || !Array.isArray(waypoints) || waypoints.length === 0) {
                return res.status(400).json({
                    message: "Некоректні вхідні дані: необхідна назва маршруту та список точок",
                });
            }
            const route = yield routeService.createRoute(name, description, waypoints);
            res.json(route);
        });
    }
    getRoutes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const routes = yield routeService.getRoutes();
            res.json(routes);
        });
    }
    getRouteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const route = yield routeService.getRouteById(id);
            res.json(route);
        });
    }
    updateRoute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const route = yield routeService.updateRoute(id, data);
            res.json(route);
        });
    }
    deleteRoute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield routeService.deleteRoute(id);
                res.json({ message: "Маршрут видалено" });
            }
            catch (error) {
                res.status(404).json({
                    message: error instanceof Error ? error.message : "Unknown error occurred",
                });
            }
        });
    }
}
