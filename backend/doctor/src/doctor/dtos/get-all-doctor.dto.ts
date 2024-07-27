import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class GetAllDoctorDto {
    @IsNumber()
    page: number;

    @IsNumber()
    take: number;

    @IsEnum(Gender, { message: 'Invalid gender' })
    @IsOptional()
    gender?: Gender;

    @IsString()
    @IsOptional()
    speciality?: string;

    @IsString()
    @IsOptional()
    address?: string;
}