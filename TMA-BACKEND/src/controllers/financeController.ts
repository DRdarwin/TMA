import { Request, Response } from 'express';

import {
    getUserBalance, getUserTransactionHistory, makeUserTransaction
} from '../services/financeService';

// Отримати баланс користувача
export const getBalance = async (req: Request, res: Response) => {
  try {
    // Тепер очікуємо, що userId передається як рядок, напр., через query параметр
    const userId = req.query.userId as string;
    const balance = await getUserBalance(userId);
    res.json({ balance });
  } catch (error) {
    console.error("❌ Помилка отримання балансу:", error);
    res.status(500).json({ error: "Не вдалося отримати баланс користувача." });
  }
};

// Отримати історію транзакцій користувача
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const transactions = await getUserTransactionHistory(userId);
    res.json({ transactions });
  } catch (error) {
    console.error("❌ Помилка отримання історії транзакцій:", error);
    res.status(500).json({ error: "Не вдалося отримати історію транзакцій." });
  }
};

// Виконати фінансову операцію (наприклад, поповнення або зняття коштів)
export const processTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, amount, type, description } = req.body;
    const transaction = await makeUserTransaction(
      userId,
      amount,
      type,
      description,
    );
    res.status(201).json(transaction);
  } catch (error) {
    console.error("❌ Помилка виконання транзакції:", error);
    res.status(500).json({ error: "Не вдалося виконати транзакцію." });
  }
};
