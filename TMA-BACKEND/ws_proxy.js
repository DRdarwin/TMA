import express from "express";
import axios from "axios";
import WebSocket from "ws";

const app = express();
const PORT = process.env.PORT || 5001;

// Підключення до WebSocket сервера
const ws = new WebSocket("wss://landscape.specialized-air.services:8443");
// Слухаємо WebSocket і зберігаємо останнє повідомлення
let lastUpdate = null;
ws.on("message", (data) => {
    try {
        lastUpdate = JSON.parse(data);
    } catch (error) {
        console.error("Помилка парсингу WebSocket:", error);
    }
});

// API для отримання останнього оновлення
app.get("/listen", (req, res) => {
    if (lastUpdate) {
        res.json(lastUpdate);
    } else {
        res.json({ message: "Немає нових оновлень" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ WebSocket-проксі працює на порту ${PORT}`);
});
