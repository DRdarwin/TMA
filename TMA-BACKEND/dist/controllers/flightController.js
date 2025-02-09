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
exports.deleteFlight = exports.updateFlight = exports.createFlight = exports.getFlights = void 0;
const flightService_1 = require("../services/flightService");
const getFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flights = yield (0, flightService_1.getAllFlights)();
        console.log("✅ Рейси з бази:", flights);
        res.json(flights);
    }
    catch (error) {
        console.error("❌ Помилка в `getFlights`:", error);
        res.status(500).json({ error: "Не вдалося отримати рейси" });
    }
});
exports.getFlights = getFlights;
// Створити новий рейс
const createFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flight = yield (0, flightService_1.addFlight)(req.body);
        res.status(201).json(flight);
    }
    catch (error) {
        res.status(500).json({ error: "Не вдалося створити рейс" });
    }
});
exports.createFlight = createFlight;
// Оновити рейс
const updateFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flight = yield modifyFlight(req.params.id, req.body);
        res.json(flight);
    }
    catch (error) {
        res.status(500).json({ error: "Не вдалося оновити рейс" });
    }
});
exports.updateFlight = updateFlight;
// Видалити рейс
const deleteFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield removeFlight(req.params.id);
        res.json({ message: "Рейс видалено" });
    }
    catch (error) {
        res.status(500).json({ error: "Не вдалося видалити рейс" });
    }
});
exports.deleteFlight = deleteFlight;
function modifyFlight(id, body) {
    throw new Error("Function not implemented.");
}
function removeFlight(id) {
    throw new Error("Function not implemented.");
}
