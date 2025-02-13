import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto.js'; // Припускаємо, що DTO визначено
import { AdminService } from './admin.service.js';

@Injectable()
export class AdminAuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const admin = await this.adminService.validateAdmin(loginDto); // Використовуємо AdminService для валідації
        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return {
            access_token: this.jwtService.sign({ sub: admin.id, role: 'admin', username: admin.username }), // 'sub' для стандартного ідентифікатора користувача
        };
    }
}
