import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ForbiddenException,
} from "@nestjs/common";
import { UserService } from "../services/userService";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":telegramId")
  async getUser(@Param("telegramId") telegramId: string) {
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
}
