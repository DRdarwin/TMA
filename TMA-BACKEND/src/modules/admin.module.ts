import { Module } from '@nestjs/common';
import { AdminAuthController } from '../controllers/admin-auth.controller.js';
import { AdminActionsController } from '../controllers/admin-actions.controller.js';
import { AdminAuthService } from '../services/admin-auth.service.js';
import { AdminService } from '../services/admin.service.js';
import { AdminGuard } from '../guards/admin.guard.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js'; // Шлях до вашого PrismaService
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({ // Реєстрація JwtModule асинхронно для використання ConfigService
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // Отримання секретного ключа з конфігурації
                signOptions: { expiresIn: '1h' }, // Налаштування опцій підпису, наприклад, термін дії
            }),
            inject: [ConfigService],
        }),
        ConfigModule, // Додавання ConfigModule для конфігурації
    ],
    controllers: [AdminAuthController, AdminActionsController],
    providers: [AdminAuthService, AdminService, AdminGuard, PrismaService], // Включення всіх сервісів та Guard
})
export class AdminModule {}
