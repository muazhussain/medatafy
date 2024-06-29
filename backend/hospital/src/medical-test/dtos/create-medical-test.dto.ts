import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { MedicalTestType } from "../entities/medical-test.entity";

export class CreateTestDto {
    @IsString()
    @IsNotEmpty()
    testName: string;

    @IsString()
    @IsNotEmpty()
    testType: MedicalTestType;

    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @IsUUID()
    hospital: string;
}