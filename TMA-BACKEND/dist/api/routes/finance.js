import express from "express";
import { getBalance, processTransaction, getTransactions, } from "../../controllers/financeController.js";
import logger from "../../utils/logger.js"; // Скоригуй шлях, якщо потрібно
const router = express.Router();
// Middleware логування запитів для фінансових маршрутів
router.use((req, res, next) => {
    logger.info(`Запит: ${req.method} ${req.originalUrl}`);
    next();
});
router.get("/balance", getBalance);
router.get("/transactions", getTransactions);
router.post("/transactions", processTransaction);
export default router;
