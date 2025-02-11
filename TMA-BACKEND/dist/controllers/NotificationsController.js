var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import NotificationService from "../services/notifications.js";
class NotificationsController {
    /**
     * Обробляє POST-запит на надсилання сповіщення.
     */
    send(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, message } = req.body;
            if (!userId || !message) {
                res.status(400).json({ error: "Необхідні параметри: userId, message" });
                return;
            }
            const result = yield NotificationService.sendNotification(userId, message);
            if (result) {
                res.status(200).json({ success: true, message: "Сповіщення надіслано" });
            }
            else {
                res
                    .status(500)
                    .json({ success: false, message: "Помилка надсилання сповіщення" });
            }
        });
    }
}
export default new NotificationsController();
