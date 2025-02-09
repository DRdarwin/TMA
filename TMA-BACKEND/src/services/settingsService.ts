import prisma from "../api/db";

// Отримати налаштування користувача
export const getUserSettings = async (userId: number) => {
  const settings = await prisma.userSettings.findUnique({
    where: { userId },
  });
  if (!settings) {
    throw new Error("Налаштування користувача не знайдено");
  }
  return settings;
};

// Оновити налаштування користувача
export const updateUserSettings = async (userId: number, settingsData: any) => {
  return await prisma.userSettings.upsert({
    where: { userId },
    update: settingsData,
    create: { ...settingsData, userId },
  });
};
