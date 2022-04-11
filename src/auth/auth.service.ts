import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
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

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(registerUserDto: RegisterUserDto) {
        const hash = await bcrypt.hash(registerUserDto.password, 10);
        registerUserDto.password = hash;

        return this.usersService.register(registerUserDto);
    }
}
