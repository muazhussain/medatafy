import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMedicalReportDto {
    @IsString()
    @IsNotEmpty()
    issueDate: string;

    @IsString()
    @IsOptional()
    deliveryDate?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    reportContent?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    summary?: string;

    @IsUUID()
    medicalTest: string;

    @IsUUID()
    patient: string;

    @IsUUID()
    @IsOptional()
    doctor?: string;

    @IsUUID()
    @IsOptional()
    hospital?: string;
}