import prisma from "../api/db";
import { Flight } from "../types/flight";

export class FlightService {
  // Отримати всі рейси з можливістю фільтрації за датою
  static async getFlights(date?: string): Promise<Flight[]> {
    const flights = await prisma.flight.findMany({
      where: date ? { departure: new Date(date) } : {},
      orderBy: { departure: "asc" },
    });
    return flights.map((flight) => ({
      ...flight,
      date: flight.departure,
      departure: flight.departure.toISOString(),
      arrival: flight.arrival.toISOString(),
    }));
  }

  // Отримати рейс за ID
  static async getFlightById(flightId: string): Promise<Flight | null> {
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    });
    if (flight) {
      return {
        ...flight,
        date: flight.departure,
        departure: flight.departure.toISOString(),
        arrival: flight.arrival.toISOString(),
      };
    }
    return null;
  }

  // Створити новий рейс
  static async createFlight(data: Flight): Promise<Flight> {
    const flightData = {
      ...data,
      date: data.departure,
    };
    const createdFlight = await prisma.flight.create({
      data: {
        ...flightData,
      },
    });
    return {
      ...createdFlight,
      date: createdFlight.departure,
      departure: createdFlight.departure.toISOString(),
      arrival: createdFlight.arrival.toISOString(),
    };
  }

  // Оновити існуючий рейс
  static async updateFlight(
    flightId: string,
    data: Omit<Partial<Flight>, "id">,
  ): Promise<Flight> {
    const updatedFlight = await prisma.flight.update({
      where: { id: flightId },
      data,
    });
    return {
      ...updatedFlight,
      date: updatedFlight.departure,
      departure: updatedFlight.departure.toISOString(),
      arrival: updatedFlight.arrival.toISOString(),
    };
  }

  // Видалити рейс з обробкою випадку, коли запис не знайдено
  static async deleteFlight(flightId: string): Promise<void> {
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    });
    if (!flight) {
      throw new Error(`Рейс з ID ${flightId} не знайдено.`);
    }
    await prisma.flight.delete({
      where: { id: flightId },
    });
  }
}
