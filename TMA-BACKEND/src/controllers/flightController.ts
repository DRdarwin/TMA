import { Request, Response } from "express";
import { getAllFlights, addFlight } from "../services/flightService";

export const getFlights = async (req: Request, res: Response) => {
  try {
    const flights = await getAllFlights();
    console.log("✅ Рейси з бази:", flights);
    res.json(flights);
  } catch (error) {
    console.error("❌ Помилка в `getFlights`:", error);
    res.status(500).json({ error: "Не вдалося отримати рейси" });
  }
};

// Створити новий рейс
export const createFlight = async (req: Request, res: Response) => {
  try {
    const flight = await addFlight(req.body);
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося створити рейс" });
  }
};

// Оновити рейс
export const updateFlight = async (req: Request, res: Response) => {
  try {
    const flight = await modifyFlight(req.params.id, req.body);
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося оновити рейс" });
  }
};

// Видалити рейс
export const deleteFlight = async (req: Request, res: Response) => {
  try {
    await removeFlight(req.params.id);
    res.json({ message: "Рейс видалено" });
  } catch (error) {
    res.status(500).json({ error: "Не вдалося видалити рейс" });
  }
};
function modifyFlight(id: string, body: any) {
  throw new Error("Function not implemented.");
}

function removeFlight(id: string) {
  throw new Error("Function not implemented.");
}
