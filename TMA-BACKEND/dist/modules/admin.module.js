var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import { Module } from '@nestjs/common';
import { AdminAuthController } from '../controllers/admin-auth.controller.js';
import { AdminActionsController } from '../controllers/admin-actions.controller.js';
import { AdminAuthService } from '../services/admin-auth.service.js';
import { AdminService } from '../services/admin.service.js';
import { AdminGuard } from '../guards/admin.guard.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js'; // Шлях до вашого PrismaService
import { ConfigModule, ConfigService } from '@nestjs/config';
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    Module({
        imports: [
            JwtModule.registerAsync({
                imports: [ConfigModule],
                useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        secret: configService.get('JWT_SECRET'), // Отримання секретного ключа з конфігурації
                        signOptions: { expiresIn: '1h' }, // Налаштування опцій підпису, наприклад, термін дії
                    });
                }),
                inject: [ConfigService],
            }),
            ConfigModule, // Додавання ConfigModule для конфігурації
        ],
        controllers: [AdminAuthController, AdminActionsController],
        providers: [AdminAuthService, AdminService, AdminGuard, PrismaService], // Включення всіх сервісів та Guard
    })
], AdminModule);
export { AdminModule };
