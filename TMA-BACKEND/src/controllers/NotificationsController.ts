import { Request, Response } from "express";
import NotificationService from "../services/notifications";

class NotificationsController {
  send(req: Request, res: Response): void {
    const { userId, message } = req.body;

    if (!userId || !message) {
      res.status(400).json({ error: "Необхідні параметри: userId, message" });
      return;
    }

    NotificationService.sendNotification(userId, message);
    res.status(200).json({ success: true, message: "Сповіщення надіслано" });
  }
}

export default new NotificationsController();
