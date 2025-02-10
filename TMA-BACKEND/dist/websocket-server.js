"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
    console.log("📡 Нове підключення WebSocket");
    ws.send(JSON.stringify({ message: "🔗 З’єднання встановлено" }));
    ws.on("message", (data) => {
        console.log("📩 Отримано від клієнта:", data);
    });
    ws.on("close", () => {
        console.log("❌ Клієнт відключився");
    });
});
console.log("🚀 WebSocket-сервер запущено на ws://localhost:8080");
