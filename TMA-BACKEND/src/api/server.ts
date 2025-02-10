import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import flightRoutes from "./routes/flights"; // ✅ Імпортуємо маршрут після express

dotenv.config();

const app = express(); // ✅ Спочатку оголошуємо app

// Додаємо налаштування CORS для дозволу запитів з конкретних піддоменів
const corsOptions = {
  origin: [
    "https://tma.specialized-air.services", // Дозволяємо фронтенду з цього піддомену
    "https://www.tma.specialized-air.services", // Якщо є www
    "https://be.specialized-air.services", // Якщо потрібно додати ще піддомени
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Дозволяємо методи для запитів
  allowedHeaders: ["Content-Type", "Authorization"], // Дозволяємо певні заголовки
  credentials: true, // Дозволяємо передачу cookies, якщо потрібно
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Додаємо підтримку URL-кодованих даних

app.use("/flights", flightRoutes); // ✅ Тепер використовуємо маршрути

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("TMA Backend is running!");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // Логування та можливе сповіщення адміністратора
  // Наприклад, можна інтегрувати з системою моніторингу
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Додаткове логування та можливе сповіщення адміністратора
  // Можна інтегрувати з системою моніторингу або логування
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
