var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../api/db.js";
// Перелік можливих мов інтерфейсу
export var Language;
(function (Language) {
    Language["Ukrainian"] = "uk-UA";
    Language["English"] = "en-US";
    Language["Russian"] = "ru-RU";
})(Language || (Language = {}));
// Перелік можливих тем інтерфейсу
export var Theme;
(function (Theme) {
    Theme["Light"] = "light";
    Theme["Dark"] = "dark";
})(Theme || (Theme = {}));
// Отримати (або створити) налаштування користувача
export const getUserSettings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const settings = (_a = (yield prisma.userSettings.findUnique({
        where: { userId: userId.toString() },
    }))) !== null && _a !== void 0 ? _a : (yield prisma.userSettings.create({
        data: {
            userId: userId.toString(),
            notificationsEnabled: true,
            theme: Theme.Light,
        },
    }));
    return {
        userId: Number(settings.userId),
        language: settings.language,
        notificationsEnabled: settings.notificationsEnabled,
        theme: settings.theme,
    };
});
// Оновити або створити налаштування користувача
export const updateUserSettings = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const settingsData = Object.assign(Object.assign({}, update), { userId: userId.toString() });
    const settings = yield prisma.userSettings.upsert({
        where: { userId: userId.toString() },
        update: settingsData,
        create: settingsData,
    });
    return {
        userId: Number(settings.userId),
        language: settings.language,
        notificationsEnabled: settings.notificationsEnabled,
        theme: settings.theme,
    };
});
