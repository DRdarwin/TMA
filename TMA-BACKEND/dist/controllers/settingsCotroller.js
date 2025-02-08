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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const settingsService_1 = require("../services/settingsService");
// Отримати налаштування користувача
const getSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const settings = yield (0, settingsService_1.getUserSettings)(userId);
        res.json({ settings });
    }
    catch (error) {
        console.error("❌ Помилка отримання налаштувань:", error);
        res
            .status(500)
            .json({ error: "Не вдалося отримати налаштування користувача." });
    }
});
exports.getSettings = getSettings;
// Оновити налаштування користувача
const updateSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const settingsData = req.body;
        const updatedSettings = yield (0, settingsService_1.updateUserSettings)(userId, settingsData);
        res.json({ updatedSettings });
    }
    catch (error) {
        console.error("❌ Помилка оновлення налаштувань:", error);
        res
            .status(500)
            .json({ error: "Не вдалося оновити налаштування користувача." });
    }
});
exports.updateSettings = updateSettings;
