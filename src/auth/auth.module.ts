import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev'
    }),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PrismaService
  ],
  exports: [AuthService]
})
export class AuthModule { }
