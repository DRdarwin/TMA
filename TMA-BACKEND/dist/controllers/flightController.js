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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlight = exports.updateFlight = exports.createFlight = exports.getFlights = exports.FlightController = void 0;
const flightService_1 = require("../services/flightService");
class FlightController {
    // Отримати всі рейси
    static getFlights(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date } = req.query;
                const flights = yield flightService_1.FlightService.getFlights(date ? date : undefined);
                res.json(flights);
            }
            catch (error) {
                res.status(500).json({ error: "Помилка отримання рейсів" });
            }
        });
    }
    // Отримати рейс за ID
    static getFlightById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flightId = parseInt(req.params.id);
                const flight = yield flightService_1.FlightService.getFlightById(flightId.toString());
                if (!flight) {
                    res.status(404).json({ error: "Рейс не знайдено" });
                    return;
                }
                res.json(flight);
            }
            catch (error) {
                res.status(500).json({ error: "Помилка отримання рейсу" });
            }
        });
    }
    // Створити новий рейс
    static createFlight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flight = yield flightService_1.FlightService.createFlight(req.body);
                res.status(201).json(flight);
            }
            catch (error) {
                res.status(500).json({ error: "Помилка створення рейсу" });
            }
        });
    }
    // Оновити рейс
    static updateFlight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flightId = parseInt(req.params.id);
                const flight = yield flightService_1.FlightService.updateFlight(flightId.toString(), req.body);
                res.json(flight);
            }
            catch (error) {
                res.status(500).json({ error: "Помилка оновлення рейсу" });
            }
        });
    }
    // Видалити рейс
    static deleteFlight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flightId = parseInt(req.params.id);
                yield flightService_1.FlightService.deleteFlight(flightId.toString());
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: "Помилка видалення рейсу" });
            }
        });
    }
}
exports.FlightController = FlightController;
const getFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // implementation
});
exports.getFlights = getFlights;
const createFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // implementation
});
exports.createFlight = createFlight;
const updateFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // implementation
});
exports.updateFlight = updateFlight;
const deleteFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // implementation
});
exports.deleteFlight = deleteFlight;
