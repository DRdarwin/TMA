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
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    validateAdmin(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.prisma.admin.findUnique({
                where: { username: loginDto.username },
            });
            if (!admin) {
                return null;
            }
            const passwordMatch = yield bcrypt.compare(loginDto.password, admin.password);
            if (!passwordMatch) {
                return null;
            }
            return admin; // Повертаємо об'єкт admin, який тепер має тип Admin
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.findMany();
            }
            catch (error) { // Вказуємо тип error як unknown
                console.error('Error fetching all users:', error);
                throw new Error('Failed to fetch all users');
            }
        });
    }
    banUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({ where: { id } });
            if (!user) {
                throw new NotFoundException(`User with ID '${id}' not found`);
            }
            try {
                return yield this.prisma.user.update({
                    where: { id: id },
                    data: { banned: true }, // Явно вказуємо тип boolean для 'banned'
                });
            }
            catch (error) { // Вказуємо тип error як unknown
                console.error(`Error banning user with id ${id}:`, error);
                throw new Error(`Failed to ban user with id ${id}`);
            }
        });
    }
    unbanUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({ where: { id } });
            if (!user) {
                throw new NotFoundException(`User with ID '${id}' not found`);
            }
            try {
                return yield this.prisma.user.update({
                    where: { id: id },
                    data: { banned: false }, // Явно вказуємо тип boolean для 'banned'
                });
            }
            catch (error) { // Вказуємо тип error як unknown
                console.error(`Error unbanning user with id ${id}:`, error);
                throw new Error(`Failed to unban user with id ${id}`);
            }
        });
    }
    getWallets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.findMany({
                    select: {
                        id: true,
                        telegramId: true,
                        username: true,
                        usdtBalance: true,
                        walletAddress: true,
                    },
                });
            }
            catch (error) { // Вказуємо тип error як unknown
                console.error('Error fetching wallets:', error);
                throw new Error('Failed to fetch wallets');
            }
        });
    }
    updateWallet(id, _updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementation of the updateWallet method
        });
    }
};
AdminService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AdminService);
export { AdminService };
