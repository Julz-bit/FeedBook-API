import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findUser(email: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { email }
        })
    }

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const username = await this.findUser(registerUserDto.email);

        if (username) {
            throw new BadRequestException(`${registerUserDto.email} is already taken`);
        }

        return await this.prisma.user.create({
            data: registerUserDto
        })
    }
}
