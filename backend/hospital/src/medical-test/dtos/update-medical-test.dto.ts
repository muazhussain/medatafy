import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { MedicalTestType } from "../entities/medical-test.entity";

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