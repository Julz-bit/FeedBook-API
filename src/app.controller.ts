import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RegisterUserDto } from './users/dto/register-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/check')
  async check(@Request() req: any) {
    return req.user;
  }
}
