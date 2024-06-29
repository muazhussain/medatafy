import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { MedicalTestType } from "../entities/medical-test.entity";

export class UpdateMedicalTestDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    testName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    testType: MedicalTestType;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    cost: number;
}