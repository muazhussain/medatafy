import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UpdatePatientDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsEnum(Gender, { message: 'gender must be male or female' })
    @IsOptional()
    gender?: Gender;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    dateOfBirth?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    image?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?: string;
}