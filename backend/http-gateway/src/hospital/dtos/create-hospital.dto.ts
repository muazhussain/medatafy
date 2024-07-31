import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateHospitalDto {
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Name of the hospital',
        example: 'Hospital Name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Address of the hospital',
        example: 'Hospital Address',
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Phone number of the hospital',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Email',
        example: 'hospital@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Description of the hospital',
        example: 'Description of the hospital',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Image of the hospital',
        example: 'image.png',
    })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Website of the hospital',
        example: 'www.hospital.com',
    })
    @IsString()
    @IsNotEmpty()
    website: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'BIN of the hospital',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    bin: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'TIN of the hospital',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    tin: string;
}