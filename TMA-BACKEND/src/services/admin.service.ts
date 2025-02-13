/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto.js';
import { Admin, User } from '@prisma/client'; // Імпортуємо типи Admin та User з prisma client
import { UserUpdateDto } from '../dto/user-update.dto.js';

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService) {}

    async validateAdmin(loginDto: LoginDto): Promise<Admin | null> { // Вказуємо тип повернення Promise<Admin | null>
        const admin = await this.prisma.admin.findUnique({
            where: { username: loginDto.username },
        });

        if (!admin) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(loginDto.password, admin.password);
        if (!passwordMatch) {
            return null;
        }

        return admin; // Повертаємо об'єкт admin, який тепер має тип Admin
    }

    async getAllUsers(): Promise<User[]> { // Вказуємо тип повернення Promise<User[]>
        try {
            return await this.prisma.user.findMany();
        } catch (error: unknown) { // Вказуємо тип error як unknown
            console.error('Error fetching all users:', error);
            throw new Error('Failed to fetch all users');
        }
    }

    async banUser(id: string): Promise<User> { // Вказуємо тип повернення Promise<User>
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }
        try {
            return await this.prisma.user.update({
                where: { id: id },
                data: { banned: true as boolean }, // Явно вказуємо тип boolean для 'banned'
            });
        } catch (error: unknown) { // Вказуємо тип error як unknown
            console.error(`Error banning user with id ${id}:`, error);
            throw new Error(`Failed to ban user with id ${id}`);
        }
    }

    async unbanUser(id: string): Promise<User> { // Вказуємо тип повернення Promise<User>
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }
        try {
            return await this.prisma.user.update({
                where: { id: id },
                data: { banned: false as boolean }, // Явно вказуємо тип boolean для 'banned'
            });
        } catch (error: unknown) { // Вказуємо тип error як unknown
            console.error(`Error unbanning user with id ${id}:`, error);
            throw new Error(`Failed to unban user with id ${id}`);
        }
    }


    async getWallets() {
        try {
            return await this.prisma.user.findMany({
                select: {
                    id: true,
                    telegramId: true,
                    username: true,
                    usdtBalance: true,
                    walletAddress: true,
                },
            });
        } catch (error: unknown) { // Вказуємо тип error як unknown
            console.error('Error fetching wallets:', error);
            throw new Error('Failed to fetch wallets');
        }
    }

    async updateWallet(id: string, _updateData: UserUpdateDto): Promise<any> {
        // Implementation of the updateWallet method
    }

    // Інші адміністративні сервісні функції можна додати сюди
}