var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FlightService } from "../services/flightService.js";
import logger from "../utils/logger.js"; // скоригуй шлях відповідно до структури проекту
export class FlightController {
    // Отримати всі рейси
    static getFlights(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date } = req.query;
                logger.info(`Запит на отримання рейсів. Дата: ${date || "без фільтрації"}`);
                const flights = yield FlightService.getFlights(date ? date : undefined);
                logger.info(`Отримано ${flights.length} рейсів`);
                res.json(flights);
            }
            catch (error) {
                logger.error(`Помилка отримання рейсів: ${error.message}`);
                res.status(500).json({ error: "Помилка отримання рейсів" });
            }
        });
    }
    // Отримати рейс за ID
    static getFlightById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flightId = parseInt(req.params.id);
                logger.info(`Запит на отримання рейсу з ID: ${flightId}`);
                const flight = yield FlightService.getFlightById(flightId.toString());
                if (!flight) {
                    logger.warn(`Рейс з ID ${flightId} не знайдено`);
                    res.status(404).json({ error: "Рейс не знайдено" });
                    return;
                }
                logger.info(`Рейс з ID ${flightId} отримано`);
                res.json(flight);
            }
            catch (error) {
                logger.error(`Помилка отримання рейсу: ${error.message}`);
                res.status(500).json({ error: "Помилка отримання рейсу" });
            }
        });
    }
    // Створити новий рейс
    static createFlight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info(`Запит на створення нового рейсу, дані: ${JSON.stringify(req.body)}`);
                const flight = yield FlightService.createFlight(req.body);
                logger.info(`Новий рейс створено, ID: ${flight.id}`);
                res.status(201).json(flight);
            }
            catch (error) {
                logger.error(`Помилка створення рейсу: ${error.message}`);
                res.status(500).json({ error: "Помилка створення рейсу" });
            }
        });
    }
    // Оновити рейс
    static updateFlight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flightId = parseInt(req.params.id);
                logger.info(`Запит на оновлення рейсу з ID: ${flightId}, дані: ${JSON.stringify(req.body)}`);
                const flight = yield FlightService.updateFlight(flightId.toString(), req.body);
                logger.info(`Рейс з ID ${flightId} оновлено`);
                res.json(flight);
            }
            catch (error) {
                logger.error(`Помилка оновлення рейсу: ${error.message}`);
                res.status(500).json({ error: "Помилка оновлення рейсу" });
            }
        });
    }
    // Видалити рейс
    static deleteFlight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flightId = parseInt(req.params.id);
                logger.info(`Запит на видалення рейсу з ID: ${flightId}`);
                yield FlightService.deleteFlight(flightId.toString());
                logger.info(`Рейс з ID ${flightId} видалено`);
                res.status(204).send();
            }
            catch (error) {
                logger.error(`Помилка видалення рейсу: ${error.message}`);
                res.status(500).json({ error: "Помилка видалення рейсу" });
            }
        });
    }
}
// Експортуємо статичні методи класу як функції, щоб роутер міг їх використовувати:
export const getFlights = FlightController.getFlights;
export const createFlight = FlightController.createFlight;
export const updateFlight = FlightController.updateFlight;
export const deleteFlight = FlightController.deleteFlight;
