// src/controllers/admin-auth.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from 'nestjs/common';
import { AdminAuthService } from '../services/admin-auth.service';
import { Response } from 'express';
import { AdminGuard } from '../guards/admin.guard';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }, @Res() res: Response) {
    const token = await this.adminAuthService.validateAdmin(loginDto.username, loginDto.password);
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
    return res.status(HttpStatus.OK).json({ accessToken: token });
  }
}

// src/services/admin-auth.service.ts
import { Injectable } from 'nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(private jwtService: JwtService) {}

  private admins = [{ username: 'admin', password: '$2b$10$examplehash' }];

  async validateAdmin(username: string, password: string): Promise<string | null> {
    const admin = this.admins.find(user => user.username === username);
    if (admin && await bcrypt.compare(password, admin.password)) {
      return this.jwtService.sign({ username, role: 'admin' });
    }
    return null;
  }
}

// src/guards/admin.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from 'nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      if (decoded.role !== 'admin') {
        throw new UnauthorizedException('Access denied');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
