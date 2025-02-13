import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
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
        if (!token) {
            throw new UnauthorizedException('Invalid token format'); // Додано перевірку на наявність токена після split
        }

        try {
            const decoded = this.jwtService.verify(token);
            if (decoded.role !== 'admin') {
                throw new UnauthorizedException('Access denied: Insufficient role');
            }
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token or expired token'); // Більш чітке повідомлення про помилку токена
        }
    }
}
