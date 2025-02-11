"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notifications_1 = __importDefault(require("../services/notifications"));
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
            const result = yield notifications_1.default.sendNotification(userId, message);
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
exports.default = new NotificationsController();
