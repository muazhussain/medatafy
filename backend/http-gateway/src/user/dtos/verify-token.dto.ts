import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VerifyTokenDto {
    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    type: string;
}