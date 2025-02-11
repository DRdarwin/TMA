import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
} from "@nestjs/common";

import { UserService } from "../services/userService.js";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":telegramId")
  async getUser(req: unknown, res: unknown, @Param("telegramId")
telegramId: string) {
    const user = await this.userService.findUserByTelegramId(telegramId);
    if (!user) {
      throw new ForbiddenException("User not allowed");
    }
    return user;
  }

  @Post()
  async registerUser(
    @Body("telegramId") telegramId: string,
    @Body("firstName") firstName?: string,
    @Body("lastName") lastName?: string,
    @Body("username") username?: string,
  ) {
    return this.userService.createUser(
      telegramId,
      firstName,
      lastName,
      username,
    );
  }

  @Post("update")
  async updateUser(
    @Body("telegramId") telegramId: string,
    @Body("firstName") firstName?: string,
    @Body("lastName") lastName?: string,
    @Body("username") username?: string,
  ) {
    return this.userService.updateUser(
      telegramId,
      firstName,
      lastName,
      username,
    );
  }
}
