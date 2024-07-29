import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UpdateDoctorDto {
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Name of the doctor',
        example: 'Dr. John Doe',
        default: 'Dr. John Doe',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'BMDC registration number of the doctor',
        example: '1234567890',
        default: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    bmdcRegNo?: string;

    @ApiProperty({
        type: 'enum',
        enum: Gender,
        required: false,
        nullable: true,
        description: 'Gender of doctor',
        example: 'male',
        default: 'male',
    })
    @IsEnum(Gender, { message: 'Invalid gender' })
    @IsOptional()
    gender?: Gender;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Phone number of the doctor',
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
        description: 'Date of birth of the doctor',
        example: '01-01-2000',
        default: '01-01-2000',
        format: 'DD-MM-YYYY',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    dateOfBirth?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Image of the doctor',
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
        description: 'Speciality of the doctor',
        example: 'Cardiologist',
        default: 'Cardiologist',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    speciality?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Address of the doctor',
        example: 'Dhaka, Bangladesh',
        default: 'Dhaka, Bangladesh',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Office hours of the doctor',
        example: '14:00 - 18:00',
        default: '14:00 - 18:00',
        format: 'HH:mm - HH:mm',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    officeHours?: string;
}