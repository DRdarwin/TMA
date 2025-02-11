"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const flights_1 = __importDefault(require("./routes/flights")); // ✅ Імпортуємо маршрути
dotenv_1.default.config();
const app = (0, express_1.default)(); // ✅ Створюємо express app
// Додаємо CORS для дозволу запитів з конкретних піддоменів
const corsOptions = {
    origin: [
        "https://tma.specialized-air.services",
        "https://www.tma.specialized-air.services",
        "https://be.specialized-air.services",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/flights", flights_1.default); // ✅ Виправлено! Тепер маршрут `/api/flights` буде працювати
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("TMA Backend is running!");
});
// Обробка помилок
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
