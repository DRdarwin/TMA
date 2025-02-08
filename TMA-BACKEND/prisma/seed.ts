import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed для користувачів
  const user1 = await prisma.user.create({
    data: {
      telegramId: "123456",
      firstName: "Іван",
      lastName: "Іванов",
      username: "ivan_ivanov",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      telegramId: "654321",
      firstName: "Петро",
      lastName: "Петров",
      username: "petro_petrov",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      telegramId: "111222",
      firstName: "Олексій",
      lastName: "Олексійов",
      username: "oleksii",
    },
  });

  // Seed для рейсів
  await prisma.flight.createMany({
    data: [
      {
        departure: new Date("2025-02-10T10:00:00Z"),
        arrival: new Date("2025-02-10T14:00:00Z"),
        origin: "Kyiv",
        destination: "London",
        passengers: 150,
      },
      {
        departure: new Date("2025-02-12T08:30:00Z"),
        arrival: new Date("2025-02-12T12:45:00Z"),
        origin: "Berlin",
        destination: "Paris",
        passengers: 120,
      },
      {
        departure: new Date("2025-02-15T16:20:00Z"),
        arrival: new Date("2025-02-15T18:30:00Z"),
        origin: "Warsaw",
        destination: "Rome",
        passengers: 100,
      },
    ],
  });

  // Seed для фінансових транзакцій
  await prisma.financialTransaction.createMany({
    data: [
      {
        userId: user1.id,
        type: "DEPOSIT",
        amount: 500.0,
        description: "Initial deposit",
        createdAt: new Date("2025-02-05T10:00:00Z"),
      },
      {
        userId: user1.id,
        type: "WITHDRAWAL",
        amount: 200.0,
        description: "ATM withdrawal",
        createdAt: new Date("2025-02-06T12:30:00Z"),
      },
      {
        userId: user2.id,
        type: "PAYMENT",
        amount: 75.5,
        description: "Grocery shopping",
        createdAt: new Date("2025-02-07T14:45:00Z"),
      },
      {
        userId: user3.id,
        type: "TRANSFER",
        amount: 1200.0,
        description: "Rent payment",
        createdAt: new Date("2025-02-08T09:00:00Z"),
      },
      {
        userId: user1.id,
        type: "DEPOSIT",
        amount: 300.0,
        description: "Salary deposit",
        createdAt: new Date("2025-02-10T08:00:00Z"),
      },
    ],
  });

  console.log("✅ Рейси, користувачі та фінансові транзакції додані!");
}

main()
  .catch((error) => {
    console.error("❌ Помилка заповнення бази даних:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
