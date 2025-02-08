import crypto from "crypto";
import prisma from "../api/db";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";

// Функція перевірки авторизаційних даних Telegram
export const verifyTelegramAuth = async (data: any) => {
  const { hash, ...userData } = data;

  // 1️⃣ Створюємо перевірочний хеш
  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(BOT_TOKEN)
    .digest();
  const checkString = Object.keys(userData)
    .sort()
    .map((key) => `${key}=${userData[key]}`)
    .join("\n");
  const expectedHash = crypto
    .createHmac("sha256", secretKey)
    .update(checkString)
    .digest("hex");

  // 2️⃣ Перевіряємо підпис
  if (expectedHash !== hash) {
    throw new Error("❌ Невірний підпис даних Telegram");
  }

  // 3️⃣ Перевіряємо, чи користувач вже є в базі
  let user = await prisma.user.findUnique({
    where: { telegramId: userData.id.toString() },
  });

  if (!user) {
    // 4️⃣ Якщо користувача немає, створюємо його
    user = await prisma.user.create({
      data: {
        telegramId: userData.id.toString(),
        firstName: userData.first_name || null,
        lastName: userData.last_name || null, // ✅ Додано значення після lastName:
        username: userData.username || null, // ✅ Додано username
        createdAt: new Date(), // ✅ Додано дату створення
      },
    });
  }

  return user;
};

// Ensure this file exports the getAllFlights function

export const getAllFlights = async () => {
  // Implementation of getAllFlights
};

// Ensure this file exports the addFlight function

export const addFlight = async (flightData: any) => {
  // Implementation of addFlight function
};
