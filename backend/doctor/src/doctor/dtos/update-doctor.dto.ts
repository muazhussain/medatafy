import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UpdateDoctorDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    bmdcRegNo?: string;

    @IsEnum(Gender, { message: 'Invalid gender' })
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
    speciality?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    officeHours?: string;
}