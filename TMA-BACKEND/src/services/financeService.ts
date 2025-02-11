import prisma from '../api/db';

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
// Додаємо додаткове поле blockchainTxHash, якщо воно є
export const makeUserTransaction = async (
  userId: string,
  amount: number,
  type: "deposit" | "withdraw",
  description?: string,
  blockchainTxHash?: string, // нове поле для збереження on-chain даних
) => {
  if (amount <= 0) {
    throw new Error("Сума транзакції повинна бути більше нуля");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.usdtBalance === null || user.usdtBalance === undefined) {
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
      type: transactionType,
      amount: type === "withdraw" ? -amount : amount,
      description,
      blockchainTxHash, // збережемо хеш транзакції, якщо є
      createdAt: new Date(),
    },
  });
};

// Функція performTransaction залишається прикладом (не використовується в продакшені)
export async function performTransaction() {
  const result = await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.create({
      data: {
        id: 'some-unique-id', 
        usdtBalance: 0,
        telegramId: 'some-telegram-id',
      },
    });

    const transaction = await prisma.financialTransaction.create({
      data: {
        amount: 100,
        userId: user.id,
        type: "DEPOSIT",
      },
    });

    return { user, transaction };
  });

  return result;
}
