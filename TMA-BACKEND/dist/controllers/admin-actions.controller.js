var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
import { Controller, Get, Post, Param, UseGuards, ParseUUIDPipe, NotFoundException, Body, ValidationPipe } from '@nestjs/common';
import { AdminService } from '../services/admin.service.js';
import { AdminGuard } from '../guards/admin.guard.js';
import { UserUpdateDto } from '../dto/user-update.dto.js'; // Імпорт UserUpdateDto
let AdminActionsController = class AdminActionsController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.getAllUsers();
        });
    }
    banUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminService.banUser(id);
            }
            catch (error) {
                if (error instanceof NotFoundException) {
                    throw new NotFoundException(`User with ID '${id}' not found`);
                }
                throw error; // Обробка інших помилок, наприклад, помилок бази даних
            }
        });
    }
    unbanUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminService.unbanUser(id);
            }
            catch (error) {
                if (error instanceof NotFoundException) {
                    throw new NotFoundException(`User with ID '${id}' not found`);
                }
                throw error; // Обробка інших помилок
            }
        });
    }
    getWallets() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.getWallets();
        });
    }
    updateWallet(id, updateData // Валідація тіла запиту за допомогою ValidationPipe та UserUpdateDto
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminService.updateWallet(id, updateData); // Передача id та валідованих даних в сервіс
            }
            catch (error) {
                if (error instanceof NotFoundException) {
                    throw new NotFoundException(`User with ID '${id}' not found`);
                }
                throw error; // Обробка інших помилок
            }
        });
    }
};
__decorate([
    Get('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminActionsController.prototype, "getAllUsers", null);
__decorate([
    Post('user/:id/ban'),
    __param(0, Param('id', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminActionsController.prototype, "banUser", null);
__decorate([
    Post('user/:id/unban'),
    __param(0, Param('id', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminActionsController.prototype, "unbanUser", null);
__decorate([
    Get('wallets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminActionsController.prototype, "getWallets", null);
__decorate([
    Post('user/:id/wallet') // Доданий новий ендпоінт для оновлення гаманця користувача
    ,
    __param(0, Param('id', new ParseUUIDPipe())),
    __param(1, Body(new ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UserUpdateDto // Валідація тіла запиту за допомогою ValidationPipe та UserUpdateDto
    ]),
    __metadata("design:returntype", Promise)
], AdminActionsController.prototype, "updateWallet", null);
AdminActionsController = __decorate([
    Controller('admin/actions'),
    UseGuards(AdminGuard) // Захист всіх ендпоінтів контролера за допомогою AdminGuard
    ,
    __metadata("design:paramtypes", [AdminService])
], AdminActionsController);
export { AdminActionsController };
