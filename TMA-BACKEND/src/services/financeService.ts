import prisma from "../api/db";
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Отримати баланс користувача
export const getUserBalance = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { usdtBalance: true },
  });
  if (!user) {
    throw new Error("Користувача не знайдено");
  }
  return user.usdtBalance;
};

// Отримати історію транзакцій користувача
export const getUserTransactionHistory = async (userId: string) => {
  return await prisma.financialTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

// Виконати транзакцію (поповнення або списання коштів)
export const makeUserTransaction = async (
  userId: string,
  amount: number,
  type: "deposit" | "withdraw",
  description?: string,
) => {
  if (amount <= 0) {
    throw new Error("Сума транзакції повинна бути більше нуля");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.usdtBalance) {
    throw new Error("Користувача не знайдено або баланс не визначено");
  }

  if (type === "withdraw" && user.usdtBalance < amount) {
    throw new Error("Недостатньо коштів на балансі");
  }

  const newBalance =
    type === "deposit" ? user.usdtBalance + amount : user.usdtBalance - amount;

  await prisma.user.update({
    where: { id: userId },
    data: { usdtBalance: newBalance },
  });

  const transactionType = type === "deposit" ? "DEPOSIT" : "WITHDRAWAL";

  return await prisma.financialTransaction.create({
    data: {
      userId,
      type: transactionType, // обов’язкове поле
      amount: type === "withdraw" ? -amount : amount,
      description,
      createdAt: new Date(),
    },
  });
};

async function performTransaction() {
  const result = await prismaClient.$transaction(async (prisma) => {
    // Ваши операции внутри транзакции
    const user = await prisma.user.create({
      data: {
        id: 'some-unique-id', // Provide a unique ID or let Prisma auto-generate it
        usdtBalance: 0, // Set initial balance or any other required fields
        telegramId: 'some-telegram-id', // Provide a valid telegramId
        // Add other required fields here
      },
    });

    const transaction = await prisma.financialTransaction.create({
      data: {
        amount: 100,
        userId: user.id,
        type: "DEPOSIT", // обов’язкове поле
      },
    });

    return { user, transaction };
  });

  return result;
}

export { performTransaction };
