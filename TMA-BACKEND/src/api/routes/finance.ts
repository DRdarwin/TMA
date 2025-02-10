import express from 'express';

import { getTransactions, processTransaction } from '../../controllers/financeController';

const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    const userId = parseInt(req.query.userId as string);
    const transactions = await getTransactions(req, res);
    res.json(transactions);
  } catch (error) {
    console.error("❌ Помилка отримання транзакцій:", error);
    res.status(500).json({ error: "Не вдалося отримати транзакції." });
  }
});

router.post("/transactions", async (req, res) => {
  try {
    await processTransaction(req, res);
  } catch (error) {
    console.error("❌ Помилка створення транзакції:", error);
    res.status(500).json({ error: "Не вдалося створити транзакцію." });
  }
});

export default router;
