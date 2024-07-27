import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateHospitalDto {
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Name of the hospital',
        example: 'Hospital Name',
        default: 'Hospital Name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Address of the hospital',
        example: 'Hospital Address',
        default: 'Hospital Address',
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Phone number of the hospital',
        example: '1234567890',
        default: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Email',
        example: 'pTqZm@example.com',
        default: 'pTqZm@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Description of the hospital',
        example: 'Description of the hospital',
        default: 'Description of the hospital',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Image of the hospital',
        example: 'image.png',
        default: 'image.png',
    })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Website of the hospital',
        example: 'www.hospital.com',
        default: 'www.hospital.com',
    })
    @IsString()
    @IsNotEmpty()
    website: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'BIN of the hospital',
        example: '1234567890',
        default: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    bin: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'TIN of the hospital',
        example: '1234567890',
        default: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    tin: string;
}