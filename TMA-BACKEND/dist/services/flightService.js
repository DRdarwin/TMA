var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../api/db.js";
import logger from "../utils/logger.js"; // Скоригуй шлях, якщо потрібно
export class FlightService {
    // Отримати всі рейси з можливістю фільтрації за датою
    static getFlights(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info(`FlightService.getFlights викликано з параметром date: ${date || "не вказано"}`);
                const flights = yield prisma.flight.findMany({
                    where: date ? { departure: new Date(date) } : {},
                    orderBy: { departure: "asc" },
                });
                logger.info(`FlightService.getFlights повертає ${flights.length} рейсів`);
                return flights.map((flight) => (Object.assign(Object.assign({}, flight), { date: flight.departure, departure: flight.departure.toISOString(), arrival: flight.arrival.toISOString() })));
            }
            catch (error) {
                logger.error(`FlightService.getFlights помилка: ${error instanceof Error ? error.message : String(error)}`);
                throw error;
            }
        });
    }
    // Отримати рейс за ID
    static getFlightById(flightId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info(`FlightService.getFlightById викликано для flightId: ${flightId}`);
                const flight = yield prisma.flight.findUnique({
                    where: { id: flightId },
                });
                if (flight) {
                    logger.info(`FlightService.getFlightById: рейс з ID ${flightId} знайдено`);
                    return Object.assign(Object.assign({}, flight), { date: flight.departure, departure: flight.departure.toISOString(), arrival: flight.arrival.toISOString() });
                }
                logger.warn(`FlightService.getFlightById: рейс з ID ${flightId} не знайдено`);
                return null;
            }
            catch (error) {
                logger.error(`FlightService.getFlightById помилка: ${error instanceof Error ? error.message : String(error)}`);
                throw error;
            }
        });
    }
    // Створити новий рейс
    static createFlight(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info(`FlightService.createFlight викликано з даними: ${JSON.stringify(data)}`);
                const flightData = Object.assign(Object.assign({}, data), { date: data.departure });
                const createdFlight = yield prisma.flight.create({
                    data: Object.assign({}, flightData),
                });
                logger.info(`FlightService.createFlight: створено рейс з ID: ${createdFlight.id}`);
                return Object.assign(Object.assign({}, createdFlight), { date: createdFlight.departure, departure: createdFlight.departure.toISOString(), arrival: createdFlight.arrival.toISOString() });
            }
            catch (error) {
                logger.error(`FlightService.createFlight помилка: ${error instanceof Error ? error.message : String(error)}`);
                throw error;
            }
        });
    }
    // Оновити існуючий рейс
    static updateFlight(flightId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info(`FlightService.updateFlight викликано для flightId: ${flightId} з даними: ${JSON.stringify(data)}`);
                const updatedFlight = yield prisma.flight.update({
                    where: { id: flightId },
                    data,
                });
                logger.info(`FlightService.updateFlight: рейс з ID ${flightId} оновлено`);
                return Object.assign(Object.assign({}, updatedFlight), { date: updatedFlight.departure, departure: updatedFlight.departure.toISOString(), arrival: updatedFlight.arrival.toISOString() });
            }
            catch (error) {
                logger.error(`FlightService.updateFlight помилка: ${error instanceof Error ? error.message : String(error)}`);
                throw error;
            }
        });
    }
    // Видалити рейс з обробкою випадку, коли запис не знайдено
    static deleteFlight(flightId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info(`FlightService.deleteFlight викликано для flightId: ${flightId}`);
                const flight = yield prisma.flight.findUnique({
                    where: { id: flightId },
                });
                if (!flight) {
                    logger.warn(`FlightService.deleteFlight: рейс з ID ${flightId} не знайдено`);
                    throw new Error(`Рейс з ID ${flightId} не знайдено.`);
                }
                yield prisma.flight.delete({
                    where: { id: flightId },
                });
                logger.info(`FlightService.deleteFlight: рейс з ID ${flightId} видалено`);
            }
            catch (error) {
                logger.error(`FlightService.deleteFlight помилка: ${error instanceof Error ? error.message : String(error)}`);
                throw error;
            }
        });
    }
}
