import { Request, Response } from "express";
import { FlightService } from "../services/flightService.js";
import logger from "../utils/logger.js"; // скоригуй шлях відповідно до структури проекту

export class FlightController {
  // Отримати всі рейси
  static async getFlights(req: Request, res: Response): Promise<void> {
    try {
      const { date } = req.query;
      logger.info(
        `Запит на отримання рейсів. Дата: ${date || "без фільтрації"}`,
      );
      const flights = await FlightService.getFlights(
        date ? (date as string) : undefined,
      );
      logger.info(`Отримано ${flights.length} рейсів`);
      res.json(flights);
    } catch (error: any) {
      logger.error(`Помилка отримання рейсів: ${error.message}`);
      res.status(500).json({ error: "Помилка отримання рейсів" });
    }
  }

  // Отримати рейс за ID
  static async getFlightById(req: Request, res: Response): Promise<void> {
    try {
      const flightId = parseInt(req.params.id);
      logger.info(`Запит на отримання рейсу з ID: ${flightId}`);
      const flight = await FlightService.getFlightById(flightId.toString());
      if (!flight) {
        logger.warn(`Рейс з ID ${flightId} не знайдено`);
        res.status(404).json({ error: "Рейс не знайдено" });
        return;
      }
      logger.info(`Рейс з ID ${flightId} отримано`);
      res.json(flight);
    } catch (error: any) {
      logger.error(`Помилка отримання рейсу: ${error.message}`);
      res.status(500).json({ error: "Помилка отримання рейсу" });
    }
  }

  // Створити новий рейс
  static async createFlight(req: Request, res: Response): Promise<void> {
    try {
      logger.info(
        `Запит на створення нового рейсу, дані: ${JSON.stringify(req.body)}`,
      );
      const flight = await FlightService.createFlight(req.body);
      logger.info(`Новий рейс створено, ID: ${flight.id}`);
      res.status(201).json(flight);
    } catch (error: any) {
      logger.error(`Помилка створення рейсу: ${error.message}`);
      res.status(500).json({ error: "Помилка створення рейсу" });
    }
  }

  // Оновити рейс
  static async updateFlight(req: Request, res: Response): Promise<void> {
    try {
      const flightId = parseInt(req.params.id);
      logger.info(
        `Запит на оновлення рейсу з ID: ${flightId}, дані: ${JSON.stringify(req.body)}`,
      );
      const flight = await FlightService.updateFlight(
        flightId.toString(),
        req.body,
      );
      logger.info(`Рейс з ID ${flightId} оновлено`);
      res.json(flight);
    } catch (error: any) {
      logger.error(`Помилка оновлення рейсу: ${error.message}`);
      res.status(500).json({ error: "Помилка оновлення рейсу" });
    }
  }

  // Видалити рейс
  static async deleteFlight(req: Request, res: Response): Promise<void> {
    try {
      const flightId = parseInt(req.params.id);
      logger.info(`Запит на видалення рейсу з ID: ${flightId}`);
      await FlightService.deleteFlight(flightId.toString());
      logger.info(`Рейс з ID ${flightId} видалено`);
      res.status(204).send();
    } catch (error: any) {
      logger.error(`Помилка видалення рейсу: ${error.message}`);
      res.status(500).json({ error: "Помилка видалення рейсу" });
    }
  }
}

// Експортуємо статичні методи класу як функції, щоб роутер міг їх використовувати:
export const getFlights = FlightController.getFlights;
export const createFlight = FlightController.createFlight;
export const updateFlight = FlightController.updateFlight;
export const deleteFlight = FlightController.deleteFlight;
