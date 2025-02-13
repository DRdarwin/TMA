var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
let AdminGuard = class AdminGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
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
        }
        catch (error) {
            throw new UnauthorizedException('Invalid token or expired token'); // Більш чітке повідомлення про помилку токена
        }
    }
};
AdminGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService])
], AdminGuard);
export { AdminGuard };
