import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

class MedicinePrescriptionDto {
    @IsUUID()
    medicine: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    instruction?: string;
}

class MedicalTestPrescriptionDto {
    @IsUUID()
    medicalTest: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    instruction?: string;
}

export class CreatePrescriptionDto {
    @IsString()
    @IsNotEmpty()
    date: string;

    @ValidateNested({ each: true })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    chiefComplaints?: string[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    advice?: string[];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    followUp?: string;

    @IsUUID()
    doctor: string;

    @IsUUID()
    patient: string;

    @ValidateNested({ each: true })
    @IsArray()
    @IsOptional()
    medicines?: MedicinePrescriptionDto[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsOptional()
    medicalTests?: MedicalTestPrescriptionDto[];
}