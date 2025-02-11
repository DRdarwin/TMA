import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByTelegramId(telegramId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { telegramId } });
  }

  async createUser(
    telegramId: string,
    firstName?: string,
    lastName?: string,
    username?: string,
  ): Promise<User> {
    return this.prisma.user.upsert({
      where: { telegramId },
      update: {},
      create: { id: telegramId, telegramId, firstName, lastName, username },
    });
  }

  async isUserAllowed(telegramId: string): Promise<boolean> {
    const user = await this.findUserByTelegramId(telegramId);
    return user !== null; // Пускаємо тільки зареєстрованих користувачів
  }
}
