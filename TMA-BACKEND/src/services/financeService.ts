import TronWeb from 'tronweb';

import prisma from '../api/db.js';
import logger from '../utils/logger.js';

type TransactionType = "DEPOSIT" | "WITHDRAWAL";

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
  headers: { "TRON-PRO-API-KEY": process.env.TRON_API_KEY || "" },
});

export class FinanceService {
  // Отримати баланс користувача
  static async getUserBalance(userId: string): Promise<number> {
    try {
      logger.info(`Отримання балансу для userId: ${userId}`);
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { walletAddress: true },
      });
      if (!user) throw new Error("Користувача не знайдено");

      const usdtContract = await tronWeb.contract().at(process.env.USDT_CONTRACT_ADDRESS!);
      const balanceRaw = await usdtContract.balanceOf(user.walletAddress).call();
      const balance = parseFloat(balanceRaw) / 1e6;
      logger.info(`Баланс для userId ${userId}: ${balance} USDT`);
      return balance;
    } catch (error: any) {
      logger.error(`Помилка отримання балансу: ${error.message}`);
      throw error;
    }
  }

  // Провести транзакцію
  static async makeUserTransaction(
    userId: string,
    recipient: string,
    amount: number,
    type: TransactionType
  ): Promise<string> {
    try {
      logger.info(`Обробка транзакції: userId=${userId}, тип=${type}, сума=${amount} USDT`);
      if (amount <= 0) throw new Error("Сума транзакції повинна бути більше нуля");

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { walletAddress: true },
      });
      if (!user) throw new Error("Користувача не знайдено");

      const usdtContract = await tronWeb.contract().at(process.env.USDT_CONTRACT_ADDRESS!);
      const amountInSun = amount * 1e6;
      const transaction = await usdtContract.transfer(recipient, amountInSun).send();

      await prisma.financialTransaction.create({
        data: {
          userId,
          type,
          amount: type === "WITHDRAWAL" ? -amount : amount,
          blockchainTxHash: transaction,
          createdAt: new Date(),
        },
      });

      logger.info(`Транзакція успішна: ${transaction}`);
      return transaction;
    } catch (error: any) {
      logger.error(`Помилка виконання транзакції: ${error.message}`);
      throw error;
    }
  }

  // Отримати історію транзакцій користувача
  static async getUserTransactionHistory(userId: string) {
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
  }
}

// Експортуємо методи для використання в контролерах
export const getUserBalance = FinanceService.getUserBalance;
export const makeUserTransaction = FinanceService.makeUserTransaction;
export const getUserTransactionHistory = FinanceService.getUserTransactionHistory;
