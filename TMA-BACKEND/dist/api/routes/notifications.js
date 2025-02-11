// src/routes/notifications.ts
import { Router } from "express";
import NotificationsController from "../../controllers/NotificationsController.js";
const router = Router();
// Маршрут для надсилання сповіщення
router.post("/notifications/send", (req, res) => NotificationsController.send(req, res));
export default router;
