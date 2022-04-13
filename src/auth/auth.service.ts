import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findUser(email);
        if (!user) {
            throw new BadRequestException(`${email} does not exist in database!`)
        }

        if (!await bcrypt.compare(pass, user.password)) {
            throw new BadRequestException("Invalid password!");
        }

        return user;
    }

    async login(user: User) {
        const payload = {
            sub: user.id, 
            email: user.email,
            name: user.name,
            address: user.address,
            roles: user.role
        }

        const token = {
            access_token: this.jwtService.sign(payload)
        }

        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 1);

        await this.prisma.authToken.create({
            data: {
                user_id: user.id,
                api_token: token.access_token,
                expiredAt: expiration,
            }
        });

        return token;
    }

    async register(registerUserDto: RegisterUserDto) {
        const hash = await bcrypt.hash(registerUserDto.password, 10);
        registerUserDto.password = hash;

        return this.usersService.register(registerUserDto);
    }
}
