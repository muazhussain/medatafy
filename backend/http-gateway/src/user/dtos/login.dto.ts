import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class LoginDto {
    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsEmail()
    username: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    password: string;
}