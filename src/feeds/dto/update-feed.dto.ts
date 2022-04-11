import { IsOptional, IsString } from "class-validator";

export class UpdateFeedDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    desc: string;

    @IsOptional()
    @IsString()
    image: string;

}
