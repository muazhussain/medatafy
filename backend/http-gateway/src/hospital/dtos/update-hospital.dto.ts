import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateHospitalDto {
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Name of the hospital',
        example: 'Hospital Name',
        default: 'Hospital Name',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Address of the hospital',
        example: 'Hospital Address',
        default: 'Hospital Address',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Phone number of the hospital',
        example: '1234567890',
        default: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    phone?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Email of the hospital',
        example: 'XpQpU@example.com',
        default: 'XpQpU@example.com',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Image of the hospital',
        example: 'image.png',
        default: 'image.png',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    image?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Website of the hospital',
        example: 'www.hospital.com',
        default: 'www.hospital.com',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    website?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'BIN of the hospital',
        example: '1234567890',
        default: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    bin?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'TIN of the hospital',
        example: '1234567890',
        default: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    tin?: string;
}