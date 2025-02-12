var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as adminService from '../services/adminService.js';
export const getFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flights = yield adminService.getFlights();
        res.json(flights);
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка отримання рейсів' });
    }
});
export const createFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flight = yield adminService.createFlight(req.body);
        res.status(201).json(flight);
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка створення рейсу' });
    }
});
export const updateFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flight = yield adminService.updateFlight(req.params.id, req.body);
        res.json(flight);
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка оновлення рейсу' });
    }
});
export const deleteFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield adminService.deleteFlight(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка видалення рейсу' });
    }
});
export const getWallets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wallets = yield adminService.getWallets();
        res.json(wallets);
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка отримання гаманців' });
    }
});
export const updateWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wallet = yield adminService.updateWallet(req.params.id, req.body);
        res.json(wallet);
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка оновлення гаманця' });
    }
});
export const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield adminService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка отримання користувачів' });
    }
});
export const banUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield adminService.banUser(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка блокування користувача' });
    }
});
export const unbanUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield adminService.unbanUser(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Помилка розблокування користувача' });
    }
});
