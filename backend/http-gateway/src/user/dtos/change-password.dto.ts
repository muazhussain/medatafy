import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    oldPassword: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    newPassword: string;
}