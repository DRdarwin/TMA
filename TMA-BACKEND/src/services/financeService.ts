import prisma from "../api/db.js";
import logger from "../utils/logger.js";
import TronWeb from "tronweb";

// Оновлено тип транзакції: тепер лише верхній регістр
type TransactionType = "DEPOSIT" | "WITHDRAWAL";

// Створюємо екземпляр TronWeb із використанням API-ключа з оточення
const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
  headers: { "TRON-PRO-API-KEY": process.env.TRON_API_KEY || "" },
});

export const getUserBalance = async (userId: string) => {
  try {
    logger.info(`Отримання балансу для userId: ${userId}`);
    // Переконайся, що в моделі User у Prisma є поле walletAddress (тип String)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletAddress: true }, // Якщо цього поля немає, додай його до Prisma-схеми або змінити цей select
    });
    if (!user) throw new Error("Користувача не знайдено");

    const usdtContract = await tronWeb
      .contract()
      .at(process.env.USDT_CONTRACT_ADDRESS!);
    const balanceRaw = await usdtContract.balanceOf(user.walletAddress).call();
    const balance = parseFloat(balanceRaw) / 1e6;
    logger.info(`Баланс для userId ${userId}: ${balance} USDT`);
    return balance;
  } catch (error: any) {
    logger.error(`Помилка отримання балансу: ${error.message}`);
    throw error;
  }
};

export const makeUserTransaction = async (
  userId: string,
  recipient: string,
  amount: number,
  type: TransactionType,
) => {
  try {
    logger.info(
      `Обробка транзакції для userId: ${userId}, тип: ${type}, сума: ${amount} USDT`,
    );
    if (amount <= 0)
      throw new Error("Сума транзакції повинна бути більше нуля");

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletAddress: true },
    });
    if (!user) throw new Error("Користувача не знайдено");

    const usdtContract = await tronWeb
      .contract()
      .at(process.env.USDT_CONTRACT_ADDRESS!);
    const amountInSun = amount * 1e6;
    const transaction = await usdtContract
      .transfer(recipient, amountInSun)
      .send();

    // Використовуємо значення типу відповідно до нашого TransactionType
    await prisma.financialTransaction.create({
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
  } catch (error: any) {
    logger.error(`Помилка виконання транзакції: ${error.message}`);
    throw error;
  }
};

export const getUserTransactionHistory = async (userId: string) => {
  try {
    logger.info(`Отримання історії транзакцій для userId: ${userId}`);
    const transactions = await prisma.financialTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    logger.info(`Отримано ${transactions.length} транзакцій`);
    return transactions;
  } catch (error: any) {
    logger.error(`Помилка отримання історії транзакцій: ${error.message}`);
    throw error;
  }
};
