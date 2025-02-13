import { Request, Response } from "express";
import {
  getUserBalance,
  makeUserTransaction,
  getUserTransactionHistory,
} from "../services/financeService.js";
import logger from "../utils/logger.js"; // скоригуй шлях відповідно до структури проекту
export const getBalance = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    logger.info(`API-запит на отримання балансу для userId: ${userId}`);
    const balance = await getUserBalance(userId);
    res.json({ balance });
  } catch (error: any) {
    logger.error(`Помилка API отримання балансу: ${error.message}`);
    res.status(500).json({ error: "Не вдалося отримати баланс користувача." });
  }
};

export const processTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, recipient, amount, type } = req.body;
    logger.info(`API-запит на проведення транзакції для userId: ${userId}`);
    const transaction = await makeUserTransaction(
      userId,
      recipient,
      amount,
      type,
    );
    res.json({ transactionId: transaction });
  } catch (error: any) {
    logger.error(`Помилка API виконання транзакції: ${error.message}`);
    res.status(500).json({ error: "Не вдалося виконати транзакцію." });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    logger.info(
      `API-запит на отримання історії транзакцій для userId: ${userId}`,
    );
    const transactions = await getUserTransactionHistory(userId);
    res.json({ transactions });
  } catch (error: any) {
    logger.error(`Помилка API отримання історії транзакцій: ${error.message}`);
    res.status(500).json({ error: "Не вдалося отримати історію транзакцій." });
  }
};
