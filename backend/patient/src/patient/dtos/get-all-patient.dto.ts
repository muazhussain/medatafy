import { IsEnum, IsNumber, IsOptional } from "class-validator";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class GetAllPatientDto {
    @IsNumber()
    page: number;

    @IsNumber()
    take: number;

    @IsEnum(Gender, { message: 'gender must be male or female' })
    @IsOptional()
    gender?: Gender;
}