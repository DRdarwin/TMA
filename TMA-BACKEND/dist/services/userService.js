var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findUserByTelegramId(telegramId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findUnique({ where: { telegramId } });
        });
    }
    createUser(telegramId, firstName, lastName, username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.upsert({
                where: { telegramId },
                update: {},
                create: { id: telegramId, telegramId, firstName, lastName, username },
            });
        });
    }
    isUserAllowed(telegramId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserByTelegramId(telegramId);
            return user !== null; // Пускаємо тільки зареєстрованих користувачів
        });
    }
};
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UserService);
export { UserService };
