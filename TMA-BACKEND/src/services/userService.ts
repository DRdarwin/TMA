import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByTelegramId(telegramId: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { telegramId } });
  }

  async createUser(
    telegramId: string,
    firstName?: string,
    lastName?: string,
    username?: string,
  ): Promise<User> {
    const existingUser = await this.findUserByTelegramId(telegramId);
    if (existingUser) {
      return existingUser;
    }
    return this.prisma.user.create({
      data: { telegramId, firstName, lastName, username, walletAddress: '' },
    });
  }

  async isUserAllowed(telegramId: string): Promise<boolean> {
    const user = await this.findUserByTelegramId(telegramId);
    return user !== null; // Пускаємо тільки зареєстрованих користувачів
  }

  async updateUserWalletAddress(telegramId: string, walletAddress: string): Promise<User> {
    const user = await this.findUserByTelegramId(telegramId);
    if (!user) {
      throw new Error("User not found");
    }
    return this.prisma.user.update({
      where: { id: user.id },
      data: { walletAddress },
    });
  }

  async updateUser(telegramId: string, firstName?: string, lastName?: string, username?: string): Promise<User> {
    const user = await this.findUserByTelegramId(telegramId);
    if (!user) {
      throw new Error("User not found");
    }
    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.username = username ?? user.username;
    return this.saveUser(user);
  }

  private async saveUser(user: User): Promise<User> {
    return this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }
}
