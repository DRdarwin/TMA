// src/controllers/NotificationsController.ts
import { Request, Response } from "express";

import NotificationService from "../services/notifications.js";

class NotificationsController {
  /**
   * Обробляє POST-запит на надсилання сповіщення.
   */
  async send(req: Request, res: Response): Promise<void> {
    const { userId, message } = req.body;

    if (!userId || !message) {
      res.status(400).json({ error: "Необхідні параметри: userId, message" });
      return;
    }

    const result = await NotificationService.sendNotification(userId, message);
    if (result) {
      res.status(200).json({ success: true, message: "Сповіщення надіслано" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Помилка надсилання сповіщення" });
    }
  }
}

export default new NotificationsController();
