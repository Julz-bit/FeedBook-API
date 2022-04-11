import { IsString, IsEmail } from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    email: string

    @IsString()
    name: string

    @IsString()
    address: string

    @IsString()
    password: string
}