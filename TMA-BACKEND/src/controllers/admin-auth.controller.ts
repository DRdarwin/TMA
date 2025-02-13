import { Controller, Post, Body, Res, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from '../services/admin-auth.service.js';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto.js'; // Припускаємо, що DTO визначено

@Controller('admin/auth')
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        try {
            const token = await this.adminAuthService.login(loginDto);
            return res.status(HttpStatus.OK).json({ accessToken: token.access_token });
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
            }
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Login failed', error: errorMessage });
        }
    }
}
