// src/controllers/adminController.ts
import { Request, Response } from 'express';
import * as adminService from '../services/adminService.js';

export const getFlights = async (req: Request, res: Response) => {
    try {
        const flights = await adminService.getFlights();
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання рейсів' });
    }
};

export const createFlight = async (req: Request, res: Response) => {
    try {
        const flight = await adminService.createFlight(req.body);
        res.status(201).json(flight);
    } catch (error) {
        res.status(500).json({ message: 'Помилка створення рейсу' });
    }
};

export const updateFlight = async (req: Request, res: Response) => {
    try {
        const flight = await adminService.updateFlight(req.params.id, req.body);
        res.json(flight);
    } catch (error) {
        res.status(500).json({ message: 'Помилка оновлення рейсу' });
    }
};

export const deleteFlight = async (req: Request, res: Response) => {
    try {
        await adminService.deleteFlight(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Помилка видалення рейсу' });
    }
};

export const getWallets = async (req: Request, res: Response) => {
    try {
        const wallets = await adminService.getWallets();
        res.json(wallets);
    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання гаманців' });
    }
};

export const updateWallet = async (req: Request, res: Response) => {
    try {
        const wallet = await adminService.updateWallet(req.params.id, req.body);
        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Помилка оновлення гаманця' });
    }
};
