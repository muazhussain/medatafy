import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UpdatePatientDto {
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Name of the patient',
        example: 'John Doe',
        default: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @ApiProperty({
        type: 'enum',
        enum: Gender,
        required: false,
        nullable: true,
        description: 'Gender of the patient',
        example: 'male',
        default: 'male',
    })
    @IsEnum(Gender, { message: 'gender must be male or female' })
    @IsOptional()
    gender?: Gender;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Phone number of the patient',
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
        description: 'Date of birth of the patient',
        example: '1990-01-01',
        default: '1990-01-01',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    dateOfBirth?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Image of the patient',
        example: 'patient.jpg',
        default: 'patient.jpg',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    image?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Address of the patient',
        example: 'Dhaka, Bangladesh',
        default: 'Dhaka, Bangladesh',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?: string;
}