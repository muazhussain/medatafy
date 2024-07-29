import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

enum MedicalTestType {
    LAB = 'lab',
    IMAGING = 'imaging',
    OTHER = 'other',
}

export class UpdateMedicalTestDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    testName?: string;

    @IsEnum(MedicalTestType, { message: 'Invalid test type' })
    @IsOptional()
    testType?: MedicalTestType;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    cost?: number;
}