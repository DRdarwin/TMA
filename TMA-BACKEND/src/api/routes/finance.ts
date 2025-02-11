import express from 'express';
import { getTransactions, processTransaction, getBalance } from '../../controllers/financeController';

const router = express.Router();

// Отримати баланс користувача (новий endpoint, якщо потрібно)
router.get("/balance", async (req, res) => {
  try {
    // Передбачаємо, що userId передається як рядок
    await getBalance(req, res);
  } catch (error) {
    console.error("❌ Помилка отримання балансу:", error);
    res.status(500).json({ error: "Не вдалося отримати баланс." });
  }
});

// Отримати історію транзакцій користувача
router.get("/transactions", async (req, res) => {
  try {
    // Викликаємо контролер, який сам обробляє відповідь
    await getTransactions(req, res);
  } catch (error) {
    console.error("❌ Помилка отримання транзакцій:", error);
    res.status(500).json({ error: "Не вдалося отримати транзакції." });
  }
});

// Обробка транзакції
router.post("/transactions", async (req, res) => {
  try {
    await processTransaction(req, res);
  } catch (error) {
    console.error("❌ Помилка створення транзакції:", error);
    res.status(500).json({ error: "Не вдалося створити транзакцію." });
  }
});

export default router;
