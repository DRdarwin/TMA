import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import flights from "./routes/flights";

import flightRoutes from "./routes/flights"; // ✅ Імпортуємо маршрути

dotenv.config();

const app = express(); // ✅ Створюємо express app

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

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/flights", flightRoutes); // ✅ Виправлено! Тепер маршрут `/api/flights` буде працювати

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
