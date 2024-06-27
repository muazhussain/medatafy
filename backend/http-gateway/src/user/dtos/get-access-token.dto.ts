import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetAccessTokenDto {
    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}