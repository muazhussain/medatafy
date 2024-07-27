import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

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

export class UpdatePrescriptionDto {
    @IsDate()
    @IsOptional()
    date?: Date;

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

    @IsDate()
    @IsOptional()
    followUp?: Date;

    @IsUUID()
    @IsOptional()
    doctor?: string;

    @IsUUID()
    @IsOptional()
    patient?: string;

    @ValidateNested({ each: true })
    @IsArray()
    @IsOptional()
    medicines?: MedicinePrescriptionDto[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsOptional()
    medicalTests?: MedicalTestPrescriptionDto[];
}