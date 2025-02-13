// src/dto/user-update.dto.ts
import { IsOptional, IsNumber, IsString, IsBoolean } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsNumber()
  usdtBalance?: number;

  @IsOptional()
  @IsString()
  walletAddress?: string;

  @IsOptional()
  @IsBoolean()
  banned?: boolean;

  // Ви можете додати інші поля, які потрібно оновлювати через адмін-панель,
  // та відповідні валідатори.

  // Наприклад, якщо ви захочете дозволити адміністраторам оновлювати ім'я користувача:
  // @IsOptional()
  // @IsString()
  // username?: string;
}