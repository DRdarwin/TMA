var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RoutesService } from '../services/routesService.js'; // ✅ Виправлено імпорт: RoutesService (з великої літери)
// import { routesService } from '../services/routesService.js'; // ❌ Видалено неправильний імпорт
const routesServiceInstance = new RoutesService(); // ✅ Змінено ім'я змінної на routesServiceInstance, використовуємо правильний клас
export class RoutesController {
    createRoutes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, waypoints } = req.body;
                const routes = yield routesServiceInstance.createRoutes(name, description, waypoints); // ✅ Виправлено виклик методу сервісу на createRoutes та використання routesServiceInstance
                res.status(201).json(routes);
            }
            catch (error) {
                console.error('Помилка створення маршруту:', error);
                res.status(500).json({ message: 'Не вдалося створити маршрут' });
            }
        });
    }
    getRoutes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routes = yield routesServiceInstance.getRoutes(); // ✅ Виправлено виклик методу сервісу на getRoutes та використання routesServiceInstance
                res.json(routes);
            }
            catch (error) {
                console.error('Помилка отримання маршрутів:', error);
                res.status(500).json({ message: 'Помилка отримання маршрутів' });
            }
        });
    }
    getRoutesById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({ message: 'Некоректний ID маршруту' });
                }
                const routes = yield routesServiceInstance.getRoutesById(id); // ✅ Виправлено виклик методу сервісу на getRoutesById та використання routesServiceInstance
                if (!routes) {
                    return res.status(404).json({ message: 'Маршрут не знайдено' });
                }
                res.json(routes);
            }
            catch (error) {
                console.error('Помилка отримання маршруту:', error);
                res.status(500).json({ message: 'Помилка отримання маршруту' });
            }
        });
    }
    updateRoutes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({ message: 'Некоректний ID маршруту' });
                }
                const data = req.body;
                const routes = yield routesServiceInstance.updateRoutes(id, data); // ✅ Виправлено виклик методу сервісу на updateRoutes та використання routesServiceInstance
                res.json(routes);
            }
            catch (error) {
                console.error('Помилка оновлення маршруту:', error);
                res.status(500).json({ message: 'Не вдалося оновити маршрут' });
            }
        });
    }
    deleteRoutes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({ message: 'Некоректний ID маршруту' });
                }
                yield routesServiceInstance.deleteRoutes(id); // ✅ Виправлено виклик методу сервісу на deleteRoutes та використання routesServiceInstance
                res.status(204).send();
            }
            catch (error) {
                console.error('Помилка видалення маршруту:', error);
                res.status(500).json({ message: 'Не вдалося видалити маршрут' });
            }
        });
    }
}
