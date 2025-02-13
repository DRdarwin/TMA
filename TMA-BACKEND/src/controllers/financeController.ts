import { Request, Response } from "express";
import {
  getUserBalance,
  makeUserTransaction,
  getUserTransactionHistory,
} from "../services/financeService.js";
import logger from "../utils/logger.js";

export const getBalance = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    logger.info(`API-запит на отримання балансу для userId: ${userId}`);
    const balance = await getUserBalance(userId);
    res.json({ balance });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Помилка API отримання балансу: ${error.message}`);
    } else {
      logger.error("Помилка API отримання балансу: невідома помилка");
    }
    res.status(500).json({ error: "Не вдалося отримати баланс користувача." });
  }
};

export const processTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, recipient, amount, type } = req.body;
    logger.info(`API-запит на проведення транзакції для userId: ${userId}`);
    const transaction = await makeUserTransaction(userId, recipient, amount, type);
    res.json({ transaction });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Помилка API виконання транзакції: ${error.message}`);
    } else {
      logger.error("Помилка API виконання транзакції: невідома помилка");
    }
    res.status(500).json({ error: "Не вдалося виконати транзакцію." });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    logger.info(`API-запит на отримання історії транзакцій для userId: ${userId}`);
    const transactions = await getUserTransactionHistory(userId);
    res.json({ transactions });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Помилка API отримання історії транзакцій: ${error.message}`);
    } else {
      logger.error("Помилка API отримання історії транзакцій: невідома помилка");
    }
    res.status(500).json({ error: "Не вдалося отримати історію транзакцій." });
  }
};
