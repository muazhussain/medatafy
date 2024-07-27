import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

export class GetAllPrescriptionDto {
    @IsNumber()
    page: number;

    @IsNumber()
    take: number;

    @ValidateNested({ each: true })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    dates?: string[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    doctors?: string[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    patients?: string[];
}