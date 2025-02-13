import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log("✅ Prisma підключено");
    } catch (error) {
      console.error("❌ Помилка підключення Prisma:", error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log("✅ Prisma відключено");
    } catch (error) {
      console.error("❌ Помилка відключення Prisma:", error);
    }
  }
}
