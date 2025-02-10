import { Request, Response } from 'express';

import { FlightService } from '../services/flightService';

export class FlightController {
  // Отримати всі рейси
  static async getFlights(req: Request, res: Response): Promise<void> {
    try {
      const { date } = req.query;
      const flights = await FlightService.getFlights(
        date ? (date as string) : undefined,
      );
      res.json(flights);
    } catch (error) {
      res.status(500).json({ error: "Помилка отримання рейсів" });
    }
  }

  // Отримати рейс за ID
  static async getFlightById(req: Request, res: Response): Promise<void> {
    try {
      const flightId = parseInt(req.params.id);
      const flight = await FlightService.getFlightById(flightId.toString());
      if (!flight) {
        res.status(404).json({ error: "Рейс не знайдено" });
        return;
      }
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: "Помилка отримання рейсу" });
    }
  }

  // Створити новий рейс
  static async createFlight(req: Request, res: Response): Promise<void> {
    try {
      const flight = await FlightService.createFlight(req.body);
      res.status(201).json(flight);
    } catch (error) {
      res.status(500).json({ error: "Помилка створення рейсу" });
    }
  }

  // Оновити рейс
  static async updateFlight(req: Request, res: Response): Promise<void> {
    try {
      const flightId = parseInt(req.params.id);
      const flight = await FlightService.updateFlight(
        flightId.toString(),
        req.body,
      );
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: "Помилка оновлення рейсу" });
    }
  }

  // Видалити рейс
  static async deleteFlight(req: Request, res: Response): Promise<void> {
    try {
      const flightId = parseInt(req.params.id);
      await FlightService.deleteFlight(flightId.toString());
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Помилка видалення рейсу" });
    }
  }
}

export const getFlights = async (req: Request, res: Response) => {
  // implementation
};

export const createFlight = async (req: Request, res: Response) => {
  // implementation
};

export const updateFlight = async (req: Request, res: Response) => {
  // implementation
};

export const deleteFlight = async (req: Request, res: Response) => {
  // implementation
};
