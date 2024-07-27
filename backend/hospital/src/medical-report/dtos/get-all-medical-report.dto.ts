import { IsArray, IsNumber, IsOptional, IsUUID, ValidateNested } from "class-validator";

export class GetAllMedicalReportDto {
    @IsNumber()
    page: number;

    @IsNumber()
    take: number;

    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    medicalTests?: string[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    patients?: string[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    doctors?: string[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    hospitals?: string[];
}