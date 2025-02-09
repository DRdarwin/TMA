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
const express_1 = __importDefault(require("express"));
const settingsService_1 = require("../../services/settingsService");
const router = express_1.default.Router();
router.get("/settings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.query.userId);
    const settings = yield (0, settingsService_1.getUserSettings)(userId);
    res.json(settings);
}));
router.put("/settings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, theme, language, notificationsEnabled } = req.body;
    const updatedSettings = yield (0, settingsService_1.updateUserSettings)(userId, {
        theme,
        language,
        notificationsEnabled,
    });
    res.json(updatedSettings);
}));
exports.default = router;
