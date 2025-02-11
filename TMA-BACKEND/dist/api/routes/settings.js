var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { getUserSettings, updateUserSettings, } from "../../services/settingsService.js";
const router = express.Router();
router.get("/settings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.query.userId);
    const settings = yield getUserSettings(userId);
    res.json(settings);
}));
router.put("/settings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, theme, language, notificationsEnabled } = req.body;
    const updatedSettings = yield updateUserSettings(userId, {
        theme,
        language,
        notificationsEnabled,
    });
    res.json(updatedSettings);
}));
export default router;
