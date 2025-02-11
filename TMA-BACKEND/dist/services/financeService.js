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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserTransaction = exports.getUserTransactionHistory = exports.getUserBalance = void 0;
exports.performTransaction = performTransaction;
const db_1 = __importDefault(require("../api/db"));
// Отримати баланс користувача
const getUserBalance = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({
        where: { id: userId },
        select: { usdtBalance: true },
    });
    if (!user) {
        throw new Error("Користувача не знайдено");
    }
    return user.usdtBalance;
});
exports.getUserBalance = getUserBalance;
// Отримати історію транзакцій користувача
const getUserTransactionHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.financialTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
});
exports.getUserTransactionHistory = getUserTransactionHistory;
// Виконати транзакцію (поповнення або списання коштів)
// Додаємо додаткове поле blockchainTxHash, якщо воно є
const makeUserTransaction = (userId, amount, type, description, blockchainTxHash) => __awaiter(void 0, void 0, void 0, function* () {
    if (amount <= 0) {
        throw new Error("Сума транзакції повинна бути більше нуля");
    }
    const user = yield db_1.default.user.findUnique({ where: { id: userId } });
    if (!user || user.usdtBalance === null || user.usdtBalance === undefined) {
        throw new Error("Користувача не знайдено або баланс не визначено");
    }
    if (type === "withdraw" && user.usdtBalance < amount) {
        throw new Error("Недостатньо коштів на балансі");
    }
    const newBalance = type === "deposit" ? user.usdtBalance + amount : user.usdtBalance - amount;
    yield db_1.default.user.update({
        where: { id: userId },
        data: { usdtBalance: newBalance },
    });
    const transactionType = type === "deposit" ? "DEPOSIT" : "WITHDRAWAL";
    return yield db_1.default.financialTransaction.create({
        data: {
            userId,
            type: transactionType,
            amount: type === "withdraw" ? -amount : amount,
            description,
            blockchainTxHash, // збережемо хеш транзакції, якщо є
            createdAt: new Date(),
        },
    });
});
exports.makeUserTransaction = makeUserTransaction;
// Функція performTransaction залишається прикладом (не використовується в продакшені)
function performTransaction() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.create({
                data: {
                    id: "some-unique-id",
                    usdtBalance: 0,
                    telegramId: "some-telegram-id",
                },
            });
            const transaction = yield prisma.financialTransaction.create({
                data: {
                    amount: 100,
                    userId: user.id,
                    type: "DEPOSIT",
                },
            });
            return { user, transaction };
        }));
        return result;
    });
}
