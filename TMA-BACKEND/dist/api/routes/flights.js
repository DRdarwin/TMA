import express from "express";
import { createFlight, deleteFlight, getFlights, updateFlight, } from "../../controllers/flightController.js";
import logger from "../../utils/logger.js"; // Скоригуй шлях, якщо потрібно
const router = express.Router();
// Middleware для логування кожного запиту до цього роутера
router.use((req, res, next) => {
    logger.info(`Роутер /api/flights отримав запит: ${req.method} ${req.originalUrl}`);
    next();
});
router.get("/", getFlights); // Отримати всі рейси
router.post("/", createFlight); // Створити новий рейс
router.put("/:id", updateFlight); // Оновити рейс
router.delete("/:id", deleteFlight); // Видалити рейс
export default router;
