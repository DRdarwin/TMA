import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Створюємо 5 користувачів
  const [user1, user2, user3, user4, user5] = await Promise.all([
    prisma.user.create({
      data: {
        id: "1",
        telegramId: "100001",
        firstName: "Олег",
        lastName: "Бойко",
        username: "oleg_boyko",
      },
    }),
    prisma.user.create({
      data: {
        id: "2",
        telegramId: "100002",
        firstName: "Марія",
        lastName: "Коваль",
        username: "maria_koval",
      },
    }),
    prisma.user.create({
      data: {
        id: "3",
        telegramId: "100003",
        firstName: "Сергій",
        lastName: "Дорошенко",
        username: "serg_dor",
      },
    }),
    prisma.user.create({
      data: {
        id: "4",
        telegramId: "100004",
        firstName: "Анна",
        lastName: "Степанова",
        username: "anna_step",
      },
    }),
    prisma.user.create({
      data: {
        id: "5",
        telegramId: "100005",
        firstName: "Дмитро",
        lastName: "Лисенко",
        username: "dima_lys",
      },
    }),
  ]);

  // Створюємо 20 рейсів (10 у минулому, 10 у майбутньому)
  await prisma.flight.createMany({
    data: [
      // Минулі дати
      {
        departure: new Date("2023-01-10T07:00:00Z"),
        arrival: new Date("2023-01-10T10:00:00Z"),
        origin: "Kyiv",
        destination: "Vienna",
        passengers: 120,
      },
      {
        departure: new Date("2023-03-22T09:30:00Z"),
        arrival: new Date("2023-03-22T12:50:00Z"),
        origin: "London",
        destination: "Paris",
        passengers: 150,
      },
      {
        departure: new Date("2024-02-10T10:00:00Z"),
        arrival: new Date("2024-02-10T14:00:00Z"),
        origin: "Berlin",
        destination: "Rome",
        passengers: 95,
      },
      {
        departure: new Date("2024-01-05T06:15:00Z"),
        arrival: new Date("2024-01-05T09:20:00Z"),
        origin: "Warsaw",
        destination: "Amsterdam",
        passengers: 80,
      },
      {
        departure: new Date("2023-11-12T12:00:00Z"),
        arrival: new Date("2023-11-12T16:20:00Z"),
        origin: "Kyiv",
        destination: "Madrid",
        passengers: 130,
      },
      {
        departure: new Date("2024-08-01T10:00:00Z"),
        arrival: new Date("2024-08-01T14:30:00Z"),
        origin: "Prague",
        destination: "Berlin",
        passengers: 77,
      },
      {
        departure: new Date("2023-09-14T18:00:00Z"),
        arrival: new Date("2023-09-14T20:40:00Z"),
        origin: "Bucharest",
        destination: "Vienna",
        passengers: 65,
      },
      {
        departure: new Date("2024-03-11T05:30:00Z"),
        arrival: new Date("2024-03-11T08:45:00Z"),
        origin: "Paris",
        destination: "London",
        passengers: 110,
      },
      {
        departure: new Date("2024-05-10T09:00:00Z"),
        arrival: new Date("2024-05-10T11:55:00Z"),
        origin: "Rome",
        destination: "Athens",
        passengers: 98,
      },
      {
        departure: new Date("2023-04-02T15:15:00Z"),
        arrival: new Date("2023-04-02T18:25:00Z"),
        origin: "Munich",
        destination: "Kyiv",
        passengers: 104,
      },

      // Майбутні дати
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
      {
        departure: new Date("2025-05-18T07:10:00Z"),
        arrival: new Date("2025-05-18T10:40:00Z"),
        origin: "Paris",
        destination: "Berlin",
        passengers: 140,
      },
      {
        departure: new Date("2025-06-20T11:25:00Z"),
        arrival: new Date("2025-06-20T14:55:00Z"),
        origin: "Athens",
        destination: "Bucharest",
        passengers: 75,
      },
      {
        departure: new Date("2025-07-07T13:45:00Z"),
        arrival: new Date("2025-07-07T17:15:00Z"),
        origin: "Madrid",
        destination: "Lisbon",
        passengers: 190,
      },
      {
        departure: new Date("2025-08-30T06:00:00Z"),
        arrival: new Date("2025-08-30T09:15:00Z"),
        origin: "Vienna",
        destination: "Prague",
        passengers: 66,
      },
      {
        departure: new Date("2025-10-01T12:00:00Z"),
        arrival: new Date("2025-10-01T16:30:00Z"),
        origin: "Amsterdam",
        destination: "Warsaw",
        passengers: 88,
      },
      {
        departure: new Date("2026-01-11T07:00:00Z"),
        arrival: new Date("2026-01-11T10:00:00Z"),
        origin: "Kyiv",
        destination: "Budapest",
        passengers: 120,
      },
      {
        departure: new Date("2026-03-25T17:20:00Z"),
        arrival: new Date("2026-03-25T20:30:00Z"),
        origin: "Rome",
        destination: "Munich",
        passengers: 111,
      },
    ],
  });

  // Створюємо 30 фінансових транзакцій для 5 користувачів
  // Розподілимо їх приблизно рівномірно (по 6 транзакцій на кожного)
  await prisma.financialTransaction.createMany({
    data: [
      // user1
      {
        userId: user1.id,
        type: "DEPOSIT",
        amount: 500,
        description: "Initial deposit",
        createdAt: new Date("2025-02-05T10:00:00Z"),
      },
      {
        userId: user1.id,
        type: "WITHDRAWAL",
        amount: 120.5,
        description: "ATM withdrawal",
        createdAt: new Date("2023-12-20T15:30:00Z"),
      },
      {
        userId: user1.id,
        type: "PAYMENT",
        amount: 75.5,
        description: "Grocery shopping",
        createdAt: new Date("2024-03-10T14:45:00Z"),
      },
      {
        userId: user1.id,
        type: "TRANSFER",
        amount: 220.0,
        description: "Friend repayment",
        createdAt: new Date("2023-11-08T09:00:00Z"),
      },
      {
        userId: user1.id,
        type: "DEPOSIT",
        amount: 300.0,
        description: "Salary deposit",
        createdAt: new Date("2023-10-10T08:00:00Z"),
      },
      {
        userId: user1.id,
        type: "WITHDRAWAL",
        amount: 50.0,
        description: "Coffee and snacks",
        createdAt: new Date("2024-01-22T12:20:00Z"),
      },

      // user2
      {
        userId: user2.id,
        type: "DEPOSIT",
        amount: 800.0,
        description: "Initial deposit",
        createdAt: new Date("2025-02-06T10:00:00Z"),
      },
      {
        userId: user2.id,
        type: "PAYMENT",
        amount: 120.75,
        description: "Utility bills",
        createdAt: new Date("2023-11-15T07:40:00Z"),
      },
      {
        userId: user2.id,
        type: "TRANSFER",
        amount: 350.0,
        description: "House rent",
        createdAt: new Date("2024-02-28T09:00:00Z"),
      },
      {
        userId: user2.id,
        type: "WITHDRAWAL",
        amount: 60.0,
        description: "Taxi fare",
        createdAt: new Date("2023-09-20T21:00:00Z"),
      },
      {
        userId: user2.id,
        type: "PAYMENT",
        amount: 45.5,
        description: "Online subscription",
        createdAt: new Date("2024-04-12T18:30:00Z"),
      },
      {
        userId: user2.id,
        type: "DEPOSIT",
        amount: 200.0,
        description: "Freelance income",
        createdAt: new Date("2025-01-19T10:00:00Z"),
      },

      // user3
      {
        userId: user3.id,
        type: "TRANSFER",
        amount: 1500.0,
        description: "Rent payment",
        createdAt: new Date("2025-02-08T09:00:00Z"),
      },
      {
        userId: user3.id,
        type: "DEPOSIT",
        amount: 400.0,
        description: "Salary deposit",
        createdAt: new Date("2023-11-30T08:00:00Z"),
      },
      {
        userId: user3.id,
        type: "WITHDRAWAL",
        amount: 200.0,
        description: "ATM withdrawal",
        createdAt: new Date("2024-05-20T12:30:00Z"),
      },
      {
        userId: user3.id,
        type: "PAYMENT",
        amount: 99.9,
        description: "Electronics purchase",
        createdAt: new Date("2023-06-25T14:45:00Z"),
      },
      {
        userId: user3.id,
        type: "TRANSFER",
        amount: 300.0,
        description: "Money to parents",
        createdAt: new Date("2024-07-01T09:00:00Z"),
      },
      {
        userId: user3.id,
        type: "DEPOSIT",
        amount: 250.0,
        description: "Bonus deposit",
        createdAt: new Date("2023-08-15T10:00:00Z"),
      },

      // user4
      {
        userId: user4.id,
        type: "DEPOSIT",
        amount: 600.0,
        description: "Initial deposit",
        createdAt: new Date("2025-02-05T10:10:00Z"),
      },
      {
        userId: user4.id,
        type: "WITHDRAWAL",
        amount: 180.0,
        description: "Clothing store",
        createdAt: new Date("2023-12-01T13:50:00Z"),
      },
      {
        userId: user4.id,
        type: "TRANSFER",
        amount: 500.0,
        description: "Gift to a friend",
        createdAt: new Date("2024-09-01T11:00:00Z"),
      },
      {
        userId: user4.id,
        type: "PAYMENT",
        amount: 70.0,
        description: "Cinema tickets",
        createdAt: new Date("2023-05-10T17:20:00Z"),
      },
      {
        userId: user4.id,
        type: "DEPOSIT",
        amount: 200.0,
        description: "Small deposit",
        createdAt: new Date("2024-10-22T08:00:00Z"),
      },
      {
        userId: user4.id,
        type: "WITHDRAWAL",
        amount: 30.0,
        description: "Fast food",
        createdAt: new Date("2024-11-05T22:00:00Z"),
      },

      // user5
      {
        userId: user5.id,
        type: "DEPOSIT",
        amount: 1000.0,
        description: "Initial deposit",
        createdAt: new Date("2025-02-06T10:40:00Z"),
      },
      {
        userId: user5.id,
        type: "WITHDRAWAL",
        amount: 250.0,
        description: "New headphones",
        createdAt: new Date("2024-02-14T16:00:00Z"),
      },
      {
        userId: user5.id,
        type: "PAYMENT",
        amount: 95.0,
        description: "Groceries",
        createdAt: new Date("2023-10-01T07:45:00Z"),
      },
      {
        userId: user5.id,
        type: "TRANSFER",
        amount: 400.0,
        description: "Send money to sibling",
        createdAt: new Date("2025-01-10T11:00:00Z"),
      },
      {
        userId: user5.id,
        type: "WITHDRAWAL",
        amount: 40.0,
        description: "Coffee shop",
        createdAt: new Date("2023-07-20T08:15:00Z"),
      },
      {
        userId: user5.id,
        type: "PAYMENT",
        amount: 135.0,
        description: "Utility bills",
        createdAt: new Date("2024-06-05T20:30:00Z"),
      },
    ],
  });

  console.log("✅ Створено 5 користувачів, 20 рейсів та 30 транзакцій!");
}

main()
  .catch((error) => {
    console.error("❌ Помилка заповнення бази даних:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
