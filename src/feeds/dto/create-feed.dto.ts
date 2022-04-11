import { IsString } from "class-validator";

export class CreateFeedDto {
    @IsString()
    title: string;

    @IsString()
    desc: string;
}
