import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

enum MedicalTestType {
    LAB = 'lab',
    IMAGING = 'imaging',
    OTHER = 'other',
}

export class CreateMedicalTestDto {
    @IsString()
    @IsNotEmpty()
    testName: string;

    @IsEnum(MedicalTestType, { message: 'Invalid test type' })
    testType: MedicalTestType;

    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @IsUUID()
    hospital: string;
}