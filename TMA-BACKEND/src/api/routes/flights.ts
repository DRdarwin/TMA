import express from "express";
import {
  getFlights,
  createFlight,
  updateFlight,
  deleteFlight,
} from "../../controllers/flightController";

const router = express.Router();

router.get("/", getFlights); // Отримати всі рейси
router.post("/", createFlight); // Створити новий рейс
router.put("/:id", updateFlight); // Оновити рейс
router.delete("/:id", deleteFlight); // Видалити рейс

export default router;
