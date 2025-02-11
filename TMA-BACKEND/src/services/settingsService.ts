import prisma from "../api/db.js";

// Перелік можливих мов інтерфейсу
export enum Language {
  Ukrainian = "uk-UA",
  English = "en-US",
  Russian = "ru-RU",
}

// Перелік можливих тем інтерфейсу
export enum Theme {
  Light = "light",
  Dark = "dark",
}

// Тип для налаштувань користувача
export interface UserSettings {
  userId: number;
  language?: Language;
  notificationsEnabled?: boolean;
  theme?: Theme;
}

// Отримати (або створити) налаштування користувача
export const getUserSettings = async (
  userId: number,
): Promise<UserSettings> => {
  const settings =
    (await prisma.userSettings.findUnique({
      where: { userId: userId.toString() },
    })) ??
    (await prisma.userSettings.create({
      data: {
        userId: userId.toString(),
        notificationsEnabled: true,
        theme: Theme.Light,
      },
    }));

  return {
    userId: Number(settings.userId),
    language: settings.language as Language,
    notificationsEnabled: settings.notificationsEnabled,
    theme: settings.theme as Theme,
  };
};

// Оновити або створити налаштування користувача
export const updateUserSettings = async (
  userId: number,
  update: Omit<UserSettings, "userId">,
): Promise<UserSettings> => {
  const settingsData = {
    ...update,
    userId: userId.toString(),
  };

  const settings = await prisma.userSettings.upsert({
    where: { userId: userId.toString() },
    update: settingsData,
    create: settingsData,
  });

  return {
    userId: Number(settings.userId),
    language: settings.language as Language,
    notificationsEnabled: settings.notificationsEnabled,
    theme: settings.theme as Theme,
  };
};
