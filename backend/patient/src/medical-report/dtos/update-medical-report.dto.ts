import { IsDate, IsOptional, IsString, IsNotEmpty, IsUUID } from "class-validator";

export class UpdateMedicalReportDto {
    @IsDate()
    @IsOptional()
    issueDate?: Date;

    @IsDate()
    @IsOptional()
    deliveryDate?: Date;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    reportContent?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    summary?: string;

    @IsUUID()
    @IsOptional()
    medicalTest?: string;

    @IsUUID()
    @IsOptional()
    doctor?: string;

    @IsUUID()
    @IsOptional()
    hospital?: string;
}