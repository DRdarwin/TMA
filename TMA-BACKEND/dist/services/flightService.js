"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightService = void 0;
const db_1 = __importDefault(require("../api/db"));
class FlightService {
    // Отримати всі рейси з можливістю фільтрації за датою
    static getFlights(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const flights = yield db_1.default.flight.findMany({
                where: date ? { departure: new Date(date) } : {},
                orderBy: { departure: "asc" },
            });
            return flights.map((flight) => (Object.assign(Object.assign({}, flight), { date: flight.departure, departure: flight.departure.toISOString(), arrival: flight.arrival.toISOString() })));
        });
    }
    // Отримати рейс за ID
    static getFlightById(flightId) {
        return __awaiter(this, void 0, void 0, function* () {
            const flight = yield db_1.default.flight.findUnique({
                where: { id: flightId },
            });
            if (flight) {
                return Object.assign(Object.assign({}, flight), { date: flight.departure, departure: flight.departure.toISOString(), arrival: flight.arrival.toISOString() });
            }
            return null;
        });
    }
    // Створити новий рейс
    static createFlight(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const flightData = Object.assign(Object.assign({}, data), { date: data.departure });
            const createdFlight = yield db_1.default.flight.create({
                data: Object.assign({}, flightData),
            });
            return Object.assign(Object.assign({}, createdFlight), { date: createdFlight.departure, departure: createdFlight.departure.toISOString(), arrival: createdFlight.arrival.toISOString() });
        });
    }
    // Оновити існуючий рейс
    static updateFlight(flightId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedFlight = yield db_1.default.flight.update({
                where: { id: flightId },
                data,
            });
            return Object.assign(Object.assign({}, updatedFlight), { date: updatedFlight.departure, departure: updatedFlight.departure.toISOString(), arrival: updatedFlight.arrival.toISOString() });
        });
    }
    // Видалити рейс з обробкою випадку, коли запис не знайдено
    static deleteFlight(flightId) {
        return __awaiter(this, void 0, void 0, function* () {
            const flight = yield db_1.default.flight.findUnique({
                where: { id: flightId },
            });
            if (!flight) {
                throw new Error(`Рейс з ID ${flightId} не знайдено.`);
            }
            yield db_1.default.flight.delete({
                where: { id: flightId },
            });
        });
    }
}
exports.FlightService = FlightService;
