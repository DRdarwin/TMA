"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTransaction = exports.getTransactions = exports.getBalance = void 0;
const financeService_1 = require("../services/financeService");
// Отримати баланс користувача
const getBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Тепер очікуємо, що userId передається як рядок, напр., через query параметр
        const userId = req.query.userId;
        const balance = yield (0, financeService_1.getUserBalance)(userId);
        res.json({ balance });
    }
    catch (error) {
        console.error("❌ Помилка отримання балансу:", error);
        res.status(500).json({ error: "Не вдалося отримати баланс користувача." });
    }
});
exports.getBalance = getBalance;
// Отримати історію транзакцій користувача
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        const transactions = yield (0, financeService_1.getUserTransactionHistory)(userId);
        res.json({ transactions });
    }
    catch (error) {
        console.error("❌ Помилка отримання історії транзакцій:", error);
        res.status(500).json({ error: "Не вдалося отримати історію транзакцій." });
    }
});
exports.getTransactions = getTransactions;
// Виконати фінансову операцію (наприклад, поповнення або зняття коштів)
const processTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, amount, type, description } = req.body;
        const transaction = yield (0, financeService_1.makeUserTransaction)(userId, amount, type, description);
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error("❌ Помилка виконання транзакції:", error);
        res.status(500).json({ error: "Не вдалося виконати транзакцію." });
    }
});
exports.processTransaction = processTransaction;
