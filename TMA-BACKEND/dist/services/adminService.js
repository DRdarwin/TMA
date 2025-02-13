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
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service.js";
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    checkAdmin(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.prisma.admin.findUnique({ where: { id: adminId } });
            if (!admin) {
                throw new UnauthorizedException('Access denied: Admin privileges required');
            }
        });
    }
    getFlights(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAdmin(adminId);
            return this.prisma.flight.findMany();
        });
    }
    createFlight(adminId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAdmin(adminId);
            return this.prisma.flight.create({ data });
        });
    }
    updateFlight(adminId, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAdmin(adminId);
            return this.prisma.flight.update({ where: { id }, data });
        });
    }
    deleteFlight(adminId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAdmin(adminId);
            return this.prisma.flight.delete({ where: { id } });
        });
    }
    getWallets(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAdmin(adminId);
            return this.prisma.user.findMany({
                select: {
                    id: true,
                    telegramId: true,
                    username: true,
                    usdtBalance: true,
                    walletAddress: true,
                },
            });
        });
    }
    updateWallet(adminId, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAdmin(adminId);
            return this.prisma.user.update({ where: { id }, data });
        });
    }
    getAllUsers(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAdmin(adminId);
            return this.prisma.user.findMany();
        });
    }
    banUser(adminId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAdmin(adminId);
            return this.prisma.user.update({ where: { id }, data: { banned: true } });
        });
    }
    unbanUser(adminId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAdmin(adminId);
            return this.prisma.user.update({ where: { id }, data: { banned: false } });
        });
    }
};
AdminService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AdminService);
export { AdminService };
