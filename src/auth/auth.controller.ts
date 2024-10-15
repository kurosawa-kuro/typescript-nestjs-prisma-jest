import { Controller, Post, Get, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { User } from './decorators/user.decorator';
import { Response } from 'express';
import { SigninDto, SignupDto, UserInfo } from '../types/auth.types';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @Public()
  async register(@Body() signupDto: SignupDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.register(signupDto);
    this.authService.setTokenCookie(res, token);
    return { message: 'Registration successful' };
  }

  @Post('login')
  @Public()
  async login(@Body() signinDto: SigninDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.signin(signinDto);
    this.authService.setTokenCookie(res, token);
    return { message: 'Login successful' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.clearTokenCookie(res);
    return { message: 'Logout successful' };
  }

  @Get('me')
  async me(@User() user: UserInfo) {
    return user;
  }
}
