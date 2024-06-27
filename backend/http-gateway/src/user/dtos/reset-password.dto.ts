import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}