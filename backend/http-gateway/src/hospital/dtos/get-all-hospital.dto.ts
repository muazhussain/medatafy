import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetAllHospitalDto {
    @ApiProperty({
        type: 'number',
        required: true,
        description: 'Page number',
        example: 1,
        default: 1,
    })
    @IsNumber()
    page: number;

    @ApiProperty({
        type: 'number',
        required: true,
        description: 'Number of items per page',
        example: 10,
        default: 10,
    })
    @IsNumber()
    take: number;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Name of the hospital',
        example: 'Hospital Name',
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Address of the hospital',
        example: 'Hospital Address',
    })
    @IsString()
    @IsOptional()
    address?: string;
}