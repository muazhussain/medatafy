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
        example: '01-01-2000',
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
        description: 'Image of the patient',
        example: 'patient.jpg',
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
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?: string;
}