import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { Public } from './decorators/public.decorator';
import { Response } from 'express';

export class SigninDto {
    // @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    passwordHash: string;
  }

  export class SignupDto {
    // @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    passwordHash: string;
  }
  
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async register(@Body() body: SignupDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @Public()
  async login(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  @Post('logout')
  @Public()
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Get('me')
  async me() {
    return this.authService.me();
  }
}
