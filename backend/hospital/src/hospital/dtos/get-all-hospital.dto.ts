import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetAllHospitalDto {
    @IsNumber()
    take: number;

    @IsNumber()
    page: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    address?: string;
}