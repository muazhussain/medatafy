import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ForgotPasswordDto {
    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsEmail()
    email: string;
}