import { Controller, Get, Post, Param, UseGuards, ParseUUIDPipe, NotFoundException, Body, ValidationPipe } from '@nestjs/common';
import { AdminService } from '../services/admin.service.js';
import { AdminGuard } from '../guards/admin.guard.js';
import { UserUpdateDto } from '../dto/user-update.dto.js'; // Імпорт UserUpdateDto

@Controller('admin/actions')
@UseGuards(AdminGuard) // Захист всіх ендпоінтів контролера за допомогою AdminGuard
export class AdminActionsController {
    constructor(private readonly adminService: AdminService) {}

    @Get('users')
    async getAllUsers() {
        return this.adminService.getAllUsers();
    }

    @Post('user/:id/ban')
    async banUser(@Param('id', new ParseUUIDPipe()) id: string) {
        try {
            return await this.adminService.banUser(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`User with ID '${id}' not found`);
            }
            throw error; // Обробка інших помилок, наприклад, помилок бази даних
        }
    }

    @Post('user/:id/unban')
    async unbanUser(@Param('id', new ParseUUIDPipe()) id: string) {
        try {
            return await this.adminService.unbanUser(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`User with ID '${id}' not found`);
            }
            throw error; // Обробка інших помилок
        }
    }

    @Get('wallets')
    async getWallets() {
        return this.adminService.getWallets();
    }

    @Post('user/:id/wallet') // Доданий новий ендпоінт для оновлення гаманця користувача
    async updateWallet(
        @Param('id', new ParseUUIDPipe()) id: string, // Валідація id як UUID
        @Body(new ValidationPipe()) updateData: UserUpdateDto // Валідація тіла запиту за допомогою ValidationPipe та UserUpdateDto
    ) {
        try {
            return await this.adminService.updateWallet(id, updateData); // Передача id та валідованих даних в сервіс
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`User with ID '${id}' not found`);
            }
            throw error; // Обробка інших помилок
        }
    }

    // Інші адміністративні дії можна додати сюди
}