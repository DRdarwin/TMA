import prisma from "../api/db";

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
  return await prisma.userTransaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
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
  if (!user || user.usdtBalance === undefined) {
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

  return await prisma.userTransaction.create({
    data: {
      userId,
      amount: type === "withdraw" ? -amount : amount,
      currency: "USDT",
      date: new Date(),
      description,
    },
  });
};
