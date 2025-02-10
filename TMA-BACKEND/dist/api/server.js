"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const flights_1 = __importDefault(require("./routes/flights")); // ✅ Імпортуємо маршрут після express
dotenv_1.default.config();
const app = (0, express_1.default)(); // ✅ Спочатку оголошуємо app
// Додаємо налаштування CORS для дозволу запитів з конкретних піддоменів
app.use((0, cors_1.default)({
    origin: [
        "https://tma.specialized-air.services", // Дозволяємо фронтенду з цього піддомену
        "https://www.tma.specialized-air.services", // Якщо є www
        "https://be.specialized-air.services", // Якщо потрібно додати ще піддомени
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Дозволяємо методи для запитів
    allowedHeaders: ["Content-Type", "Authorization"], // Дозволяємо певні заголовки
    credentials: true, // Дозволяємо передачу cookies, якщо потрібно
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // ✅ Додаємо підтримку URL-кодованих даних
app.use("/flights", flights_1.default); // ✅ Тепер використовуємо маршрути
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("TMA Backend is running!");
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
try {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
}
catch (error) {
    console.error("Error starting server:", error);
}
