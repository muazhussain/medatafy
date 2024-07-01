import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class GetAllMedicalReportDto {
    @IsNumber()
    page: number;

    @IsNumber()
    take: number;

    @IsOptional()
    @IsUUID()
    medicalTest?: string;

    @IsOptional()
    @IsUUID()
    patient?: string;

    @IsOptional()
    @IsUUID()
    doctor?: string;

    @IsOptional()
    @IsUUID()
    hospital?: string;
}