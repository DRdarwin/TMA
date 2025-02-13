var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// --- Масив для імітації зберігання маршрутів (замість бази даних) ---
const mockRoutes = [
    { id: 1, name: "Початковий маршрут 1", description: "Опис початкового маршруту 1", waypoints: [], createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: "Початковий маршрут 2", description: "Опис початкового маршруту 2", waypoints: [], createdAt: new Date(), updatedAt: new Date() }
];
// @Injectable() // Розкоментуйте, якщо використовуєте NestJS Dependency Injection
export default class RoutesService {
    constructor() {
        // Конструктор класу - тут можна ініціалізувати залежності сервісу, наприклад, PrismaClient
        console.log("RoutesService ініціалізовано.");
    }
    // ✅ Виправлені назви методів на МНОЖИНУ (Routes) - для консистентності з контролером
    createRoutes(name, description, waypoints) {
        return __awaiter(this, void 0, void 0, function* () {
            // Логіка створення нового маршруту
            console.log("Сервіс RoutesService: createRoutes викликано з параметрами:", { name, description, waypoints });
            const newRoute = {
                id: mockRoutes.length > 0 ? Math.max(...mockRoutes.map(route => route.id)) + 1 : 1, // Генеруємо новий ID (приклад)
                name: name,
                description: description,
                waypoints: waypoints || [], // Якщо waypoints не передано, використовуємо порожній масив
                createdAt: new Date(),
                updatedAt: new Date()
            };
            mockRoutes.push(newRoute); // Імітація збереження в "базі даних" (масив mockRoutes)
            return newRoute; // Повертаємо створений маршрут
        });
    }
    // ✅ Виправлені назви методів на МНОЖИНУ (Routes)
    getRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            // Логіка отримання всіх маршрутів
            console.log("Сервіс RoutesService: getRoutes викликано");
            // Імітація отримання списку маршрутів з "бази даних" (масив mockRoutes)
            return mockRoutes;
        });
    }
    // ✅ Виправлені назви методів на МНОЖИНУ (Routes)
    getRoutesById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Логіка отримання маршруту за ID
            console.log("Сервіс RoutesService: getRoutesById викликано для ID:", id);
            // Імітація пошуку маршруту за ID в "базі даних" (масив mockRoutes)
            const route = mockRoutes.find(route => route.id === id);
            if (!route) {
                console.log(`Маршрут з ID ${id} не знайдено.`);
                // Можна викинути помилку NotFoundException, якщо ви використовуєте NestJS
                // throw new NotFoundException(`Маршрут з ID ${id} не знайдено`);
                return null; // Або повернути null, якщо NotFoundException не використовується
            }
            return route;
        });
    }
    // ✅ Виправлені назви методів на МНОЖИНУ (Routes)
    updateRoutes(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Логіка оновлення маршруту за ID
            console.log("Сервіс RoutesService: updateRoutes викликано для ID:", id, "з даними:", data);
            const routeIndex = mockRoutes.findIndex(route => route.id === id);
            if (routeIndex === -1) {
                console.log(`Маршрут з ID ${id} не знайдено для оновлення.`);
                // Можна викинути помилку NotFoundException, якщо ви використовуєте NestJS
                // throw new NotFoundException(`Маршрут з ID ${id} не знайдено`);
                return null; // Або повернути null, якщо NotFoundException не використовується
            }
            // Оновлюємо властивості маршруту, використовуючи дані з `data` та зберігаючи існуючі значення, якщо в `data` їх немає
            mockRoutes[routeIndex] = Object.assign(Object.assign(Object.assign({}, mockRoutes[routeIndex]), data), { updatedAt: new Date() // Оновлюємо час оновлення
             });
            return mockRoutes[routeIndex]; // Повертаємо оновлений маршрут
        });
    }
    // ✅ Виправлені назви методів на МНОЖИНУ (Routes)
    deleteRoutes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Логіка видалення маршруту за ID
            console.log("Сервіс RoutesService: deleteRoutes викликано для ID:", id);
            const routeIndex = mockRoutes.findIndex(route => route.id === id);
            if (routeIndex === -1) {
                console.log(`Маршрут з ID ${id} не знайдено для видалення.`);
                // Можна викинути помилку NotFoundException, якщо ви використовуєте NestJS
                // throw new NotFoundException(`Маршрут з ID ${id} не знайдено`);
                return false; // Повертаємо false, якщо маршрут не знайдено
            }
            mockRoutes.splice(routeIndex, 1); // Видаляємо маршрут з масиву
            return true; // Повертаємо true, якщо видалення успішне
        });
    }
}
