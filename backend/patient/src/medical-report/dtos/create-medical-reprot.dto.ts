import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMedicalReportDto {
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