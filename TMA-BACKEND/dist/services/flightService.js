"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFlight = exports.getAllFlights = exports.verifyTelegramAuth = void 0;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = __importDefault(require("../api/db"));
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
// Функція перевірки авторизаційних даних Telegram
const verifyTelegramAuth = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { hash } = data, userData = __rest(data, ["hash"]);
    // 1️⃣ Створюємо перевірочний хеш
    const secretKey = crypto_1.default
        .createHmac("sha256", "WebAppData")
        .update(BOT_TOKEN)
        .digest();
    const checkString = Object.keys(userData)
        .sort()
        .map((key) => `${key}=${userData[key]}`)
        .join("\n");
    const expectedHash = crypto_1.default
        .createHmac("sha256", secretKey)
        .update(checkString)
        .digest("hex");
    // 2️⃣ Перевіряємо підпис
    if (expectedHash !== hash) {
        throw new Error("❌ Невірний підпис даних Telegram");
    }
    // 3️⃣ Перевіряємо, чи користувач вже є в базі
    let user = yield db_1.default.user.findUnique({
        where: { telegramId: userData.id.toString() },
    });
    if (!user) {
        // 4️⃣ Якщо користувача немає, створюємо його
        user = yield db_1.default.user.create({
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
});
exports.verifyTelegramAuth = verifyTelegramAuth;
// Ensure this file exports the getAllFlights function
const getAllFlights = () => __awaiter(void 0, void 0, void 0, function* () {
    // Implementation of getAllFlights
});
exports.getAllFlights = getAllFlights;
// Ensure this file exports the addFlight function
const addFlight = (flightData) => __awaiter(void 0, void 0, void 0, function* () {
    // Implementation of addFlight function
});
exports.addFlight = addFlight;
