var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Controller, Post, Body, Res, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from '../services/admin-auth.service.js';
import { LoginDto } from '../dto/login.dto.js'; // Припускаємо, що DTO визначено
let AdminAuthController = class AdminAuthController {
    constructor(adminAuthService) {
        this.adminAuthService = adminAuthService;
    }
    login(loginDto, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.adminAuthService.login(loginDto);
                return res.status(HttpStatus.OK).json({ accessToken: token.access_token });
            }
            catch (error) {
                if (error instanceof UnauthorizedException) {
                    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
                }
                const errorMessage = error instanceof Error ? error.message : String(error);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Login failed', error: errorMessage });
            }
        });
    }
};
__decorate([
    Post('login'),
    __param(0, Body()),
    __param(1, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "login", null);
AdminAuthController = __decorate([
    Controller('admin/auth'),
    __metadata("design:paramtypes", [AdminAuthService])
], AdminAuthController);
export { AdminAuthController };
