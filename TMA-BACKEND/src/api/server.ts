import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import dotenv from 'dotenv';
import express, { Request } from 'express';

import logger from '../utils/logger.js';
import flightRoutes from './routes/flights.js';
import routeRoutes from './routes/routes.js'; // скоригуй шлях

logger.info("Сервер запущено!");
dotenv.config();

const app = express();
const ROUTE_PREFIX = '/api/routes';
const allowedOrigins = [
  "https://tma.specialized-air.services",
  "https://www.tma.specialized-air.services",
  "https://be.specialized-air.services",
];

// Використовуємо тип CorsOptionsDelegate без явної типізації параметрів
const corsOptionsDelegate: CorsOptionsDelegate = (req, callback) => {
  let corsOptions: CorsOptions;

  // Щоб використати метод header, приводимо req до типу Express.Request
  const expressReq = req as Request;
  const origin = expressReq.header("Origin") || "";

  if (allowedOrigins.indexOf(origin) !== -1) {
    corsOptions = { origin: true, credentials: true };
  } else {
    corsOptions = { origin: false };
  }

  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/flights", flightRoutes);
app.use(ROUTE_PREFIX, routeRoutes);

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
