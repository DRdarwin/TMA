"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/notifications.ts
const express_1 = require("express");
const NotificationsController_1 = __importDefault(require("../../controllers/NotificationsController"));
const router = (0, express_1.Router)();
// Маршрут для надсилання сповіщення
router.post("/notifications/send", (req, res) => NotificationsController_1.default.send(req, res));
exports.default = router;
