import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class GetAllDoctorDto {
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
        type: 'enum',
        enum: Gender,
        required: false,
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
        description: 'Speciality of doctor',
        example: 'Cardiologist',
        default: 'Cardiologist',
    })
    @IsString()
    @IsOptional()
    speciality?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        description: 'Address of doctor',
        example: 'Dhaka, Bangladesh',
        default: 'Dhaka, Bangladesh',
    })
    @IsString()
    @IsOptional()
    address?: string;
}