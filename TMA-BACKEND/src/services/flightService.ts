import prisma from "../api/db.js";
import { Flight } from "../types/flight.js";
import logger from "../utils/logger.js"; // Скоригуй шлях, якщо потрібно

export class FlightService {
  // Отримати всі рейси з можливістю фільтрації за датою
  static async getFlights(date?: string): Promise<Flight[]> {
    try {
      logger.info(
        `FlightService.getFlights викликано з параметром date: ${date || "не вказано"}`,
      );
      const flights = await prisma.flight.findMany({
        where: date ? { departure: new Date(date) } : {},
        orderBy: { departure: "asc" },
      });
      logger.info(`FlightService.getFlights повертає ${flights.length} рейсів`);
      return flights.map((flight) => ({
        ...flight,
        date: flight.departure,
        departure: flight.departure.toISOString(),
        arrival: flight.arrival.toISOString(),
      }));
    } catch (error: any) {
      logger.error(`FlightService.getFlights помилка: ${error.message}`);
      throw error;
    }
  }

  // Отримати рейс за ID
  static async getFlightById(flightId: string): Promise<Flight | null> {
    try {
      logger.info(
        `FlightService.getFlightById викликано для flightId: ${flightId}`,
      );
      const flight = await prisma.flight.findUnique({
        where: { id: flightId },
      });
      if (flight) {
        logger.info(
          `FlightService.getFlightById: рейс з ID ${flightId} знайдено`,
        );
        return {
          ...flight,
          date: flight.departure,
          departure: flight.departure.toISOString(),
          arrival: flight.arrival.toISOString(),
        };
      }
      logger.warn(
        `FlightService.getFlightById: рейс з ID ${flightId} не знайдено`,
      );
      return null;
    } catch (error: any) {
      logger.error(`FlightService.getFlightById помилка: ${error.message}`);
      throw error;
    }
  }

  // Створити новий рейс
  static async createFlight(data: Flight): Promise<Flight> {
    try {
      logger.info(
        `FlightService.createFlight викликано з даними: ${JSON.stringify(data)}`,
      );
      const flightData = {
        ...data,
        date: data.departure,
      };
      const createdFlight = await prisma.flight.create({
        data: {
          ...flightData,
        },
      });
      logger.info(
        `FlightService.createFlight: створено рейс з ID: ${createdFlight.id}`,
      );
      return {
        ...createdFlight,
        date: createdFlight.departure,
        departure: createdFlight.departure.toISOString(),
        arrival: createdFlight.arrival.toISOString(),
      };
    } catch (error: any) {
      logger.error(`FlightService.createFlight помилка: ${error.message}`);
      throw error;
    }
  }

  // Оновити існуючий рейс
  static async updateFlight(
    flightId: string,
    data: Omit<Partial<Flight>, "id">,
  ): Promise<Flight> {
    try {
      logger.info(
        `FlightService.updateFlight викликано для flightId: ${flightId} з даними: ${JSON.stringify(data)}`,
      );
      const updatedFlight = await prisma.flight.update({
        where: { id: flightId },
        data,
      });
      logger.info(`FlightService.updateFlight: рейс з ID ${flightId} оновлено`);
      return {
        ...updatedFlight,
        date: updatedFlight.departure,
        departure: updatedFlight.departure.toISOString(),
        arrival: updatedFlight.arrival.toISOString(),
      };
    } catch (error: any) {
      logger.error(`FlightService.updateFlight помилка: ${error.message}`);
      throw error;
    }
  }

  // Видалити рейс з обробкою випадку, коли запис не знайдено
  static async deleteFlight(flightId: string): Promise<void> {
    try {
      logger.info(
        `FlightService.deleteFlight викликано для flightId: ${flightId}`,
      );
      const flight = await prisma.flight.findUnique({
        where: { id: flightId },
      });
      if (!flight) {
        logger.warn(
          `FlightService.deleteFlight: рейс з ID ${flightId} не знайдено`,
        );
        throw new Error(`Рейс з ID ${flightId} не знайдено.`);
      }
      await prisma.flight.delete({
        where: { id: flightId },
      });
      logger.info(`FlightService.deleteFlight: рейс з ID ${flightId} видалено`);
    } catch (error: any) {
      logger.error(`FlightService.deleteFlight помилка: ${error.message}`);
      throw error;
    }
  }
}
