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
const financeController_1 = require("../../controllers/financeController");
const router = express_1.default.Router();
router.get("/transactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.query.userId);
        const transactions = yield (0, financeController_1.getTransactions)(req, res);
        res.json(transactions);
    }
    catch (error) {
        console.error("❌ Помилка отримання транзакцій:", error);
        res.status(500).json({ error: "Не вдалося отримати транзакції." });
    }
}));
router.post("/transactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, financeController_1.processTransaction)(req, res);
    }
    catch (error) {
        console.error("❌ Помилка створення транзакції:", error);
        res.status(500).json({ error: "Не вдалося створити транзакцію." });
    }
}));
exports.default = router;
