import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateHospitalDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    image?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    website?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    bin?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    tin?: string;
}