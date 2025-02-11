import { Request, Response } from "express";

import {
  getUserSettings,
  updateUserSettings,
} from "../services/settingsService";

// Отримати налаштування користувача
export const getSettings = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const settings = await getUserSettings(userId);
    res.json({ settings });
  } catch (error) {
    console.error("❌ Помилка отримання налаштувань:", error);
    res
      .status(500)
      .json({ error: "Не вдалося отримати налаштування користувача." });
  }
};

// Оновити налаштування користувача
export const updateSettings = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const settingsData = req.body;
    const updatedSettings = await updateUserSettings(userId, settingsData);
    res.json({ updatedSettings });
  } catch (error) {
    console.error("❌ Помилка оновлення налаштувань:", error);
    res
      .status(500)
      .json({ error: "Не вдалося оновити налаштування користувача." });
  }
};
