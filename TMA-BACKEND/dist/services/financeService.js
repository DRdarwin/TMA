var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../api/db.js";
import logger from "../utils/logger.js";
import TronWeb from "tronweb";
// Створюємо екземпляр TronWeb із використанням API-ключа з оточення
const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io",
    headers: { "TRON-PRO-API-KEY": process.env.TRON_API_KEY || "" },
});
export const getUserBalance = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger.info(`Отримання балансу для userId: ${userId}`);
        // Переконайся, що в моделі User у Prisma є поле walletAddress (тип String)
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            select: { walletAddress: true }, // Якщо цього поля немає, додай його до Prisma-схеми або змінити цей select
        });
        if (!user)
            throw new Error("Користувача не знайдено");
        const usdtContract = yield tronWeb
            .contract()
            .at(process.env.USDT_CONTRACT_ADDRESS);
        const balanceRaw = yield usdtContract.balanceOf(user.walletAddress).call();
        const balance = parseFloat(balanceRaw) / 1e6;
        logger.info(`Баланс для userId ${userId}: ${balance} USDT`);
        return balance;
    }
    catch (error) {
        logger.error(`Помилка отримання балансу: ${error.message}`);
        throw error;
    }
});
export const makeUserTransaction = (userId, recipient, amount, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger.info(`Обробка транзакції для userId: ${userId}, тип: ${type}, сума: ${amount} USDT`);
        if (amount <= 0)
            throw new Error("Сума транзакції повинна бути більше нуля");
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            select: { walletAddress: true },
        });
        if (!user)
            throw new Error("Користувача не знайдено");
        const usdtContract = yield tronWeb
            .contract()
            .at(process.env.USDT_CONTRACT_ADDRESS);
        const amountInSun = amount * 1e6;
        const transaction = yield usdtContract
            .transfer(recipient, amountInSun)
            .send();
        // Використовуємо значення типу відповідно до нашого TransactionType
        yield prisma.financialTransaction.create({
            data: {
                userId,
                type: type, // type має бути "DEPOSIT" або "WITHDRAWAL" відповідно до Prisma enum
                amount: type === "WITHDRAWAL" ? -amount : amount,
                blockchainTxHash: transaction,
                createdAt: new Date(),
            },
        });
        logger.info(`Транзакція виконана успішно: ${transaction}`);
        return transaction;
    }
    catch (error) {
        logger.error(`Помилка виконання транзакції: ${error.message}`);
        throw error;
    }
});
export const getUserTransactionHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger.info(`Отримання історії транзакцій для userId: ${userId}`);
        const transactions = yield prisma.financialTransaction.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        logger.info(`Отримано ${transactions.length} транзакцій`);
        return transactions;
    }
    catch (error) {
        logger.error(`Помилка отримання історії транзакцій: ${error.message}`);
        throw error;
    }
});
