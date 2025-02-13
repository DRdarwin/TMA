import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService }  from "../prisma/prisma.service.js";

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService) {}

    private async checkAdmin(adminId: string): Promise<void> {
        const admin = await this.prisma.admin.findUnique({ where: { id: adminId } });
        if (!admin) {
            throw new UnauthorizedException('Access denied: Admin privileges required');
        }
    }

    async getFlights(adminId: string) {
        await this.checkAdmin(adminId);
        return this.prisma.flight.findMany();
    }

    async createFlight(adminId: string, data: { departure: string; arrival: string; origin: string; destination: string; [key: string]: unknown }) {
        await this.checkAdmin(adminId);
        return this.prisma.flight.create({ data });
    }

    async updateFlight(adminId: string, id: string, data: Record<string, unknown>) {
        await this.checkAdmin(adminId);
        return this.prisma.flight.update({ where: { id }, data });
    }

    async deleteFlight(adminId: string, id: string) {
        await this.checkAdmin(adminId);
        return this.prisma.flight.delete({ where: { id } });
    }

    async getWallets(adminId: string) {
        await this.checkAdmin(adminId);
        return this.prisma.user.findMany({
            select: {
                id: true,
                telegramId: true,
                username: true,
                usdtBalance: true,
                walletAddress: true,
            },
        });
    }

    async updateWallet(adminId: string, id: string, data: Record<string, unknown>) {
        await this.checkAdmin(adminId);
        return this.prisma.user.update({ where: { id }, data });
    }

    async getAllUsers(adminId: string) {
        await this.checkAdmin(adminId);
        return this.prisma.user.findMany();
    }

    async banUser(adminId: string, id: string) {
        await this.checkAdmin(adminId);
        return this.prisma.user.update({ where: { id }, data: { banned: true } });
    }

    async unbanUser(adminId: string, id: string) {
        await this.checkAdmin(adminId);
        return this.prisma.user.update({ where: { id }, data: { banned: false } });
    }
}
