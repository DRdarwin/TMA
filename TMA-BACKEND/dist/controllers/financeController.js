var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getUserBalance, makeUserTransaction, getUserTransactionHistory } from "../services/financeService.js";
import logger from "../utils/logger.js";
export class FinanceController {
    // Отримати баланс користувача
    static getBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                logger.info(`API-запит на отримання балансу для userId: ${userId}`);
                const balance = yield getUserBalance(userId);
                res.json({ balance });
            }
            catch (error) {
                logger.error(`Помилка API отримання балансу: ${error.message}`);
                res.status(500).json({ error: "Не вдалося отримати баланс користувача." });
            }
        });
    }
    // Провести транзакцію
    static processTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, recipient, amount, type } = req.body;
                logger.info(`API-запит на проведення транзакції для userId: ${userId}`);
                const transaction = yield makeUserTransaction(userId, recipient, amount, type);
                res.json({ transactionId: transaction });
            }
            catch (error) {
                logger.error(`Помилка API виконання транзакції: ${error.message}`);
                res.status(500).json({ error: "Не вдалося виконати транзакцію." });
            }
        });
    }
    // Отримати історію транзакцій
    static getTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                logger.info(`API-запит на отримання історії транзакцій для userId: ${userId}`);
                const transactions = yield getUserTransactionHistory(userId);
                res.json({ transactions });
            }
            catch (error) {
                logger.error(`Помилка API отримання історії транзакцій: ${error.message}`);
                res.status(500).json({ error: "Не вдалося отримати історію транзакцій." });
            }
        });
    }
}
// Експортуємо методи класу для використання у роутерах
export const getBalance = FinanceController.getBalance;
export const processTransaction = FinanceController.processTransaction;
export const getTransactions = FinanceController.getTransactions;
