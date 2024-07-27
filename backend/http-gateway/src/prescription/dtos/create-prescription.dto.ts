import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({
        type: 'date',
        required: true,
        description: 'Date of prescription',
        example: '01-01-2024',
        format: 'dd-mm-yyyy',
        default: '01-01-2024',
    })
    @IsString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({
        type: 'array',
        required: false,
        description: 'Chief Complaints',
        example: ['Headache', 'Fever'],
        default: [],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    chiefComplaints?: string[];

    @ApiProperty({
        type: 'array',
        required: false,
        description: 'Advice',
        example: ['Take aspirin', 'Drink water'],
        default: [],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    advice?: string[];

    @ApiProperty({
        type: 'date',
        required: false,
        description: 'Follow up date',
        example: '01-01-2024',
        format: 'dd-mm-yyyy',
        default: '01-01-2024',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    followUp?: string;

    @ApiProperty({
        format: 'uuid',
        required: true,
        description: 'Doctor ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        default: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    doctor: string;

    @ApiProperty({
        format: 'uuid',
        required: true,
        description: 'Patient ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        default: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    patient: string;

    @ApiProperty({
        type: 'array',
        required: false,
        description: 'Medicines',
        example: MedicinePrescriptionDto,
        default: [
            {
                medicine: '123e4567-e89b-12d3-a456-426614174000',
                instruction: 'Take aspirin',
            }, {
                medicine: '123e4567-e89b-12d3-a456-426614174001',
                instruction: 'Drink water',
            },
        ]
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsOptional()
    medicines?: MedicinePrescriptionDto[];

    @ApiProperty({
        type: 'array',
        required: false,
        description: 'Medical Tests',
        example: MedicalTestPrescriptionDto,
        default: [
            {
                medicalTest: '123e4567-e89b-12d3-a456-426614174000',
                instruction: 'Take aspirin',
            }, {
                medicalTest: '123e4567-e89b-12d3-a456-426614174001',
                instruction: 'Drink water',
            },
        ]
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsOptional()
    medicalTests?: MedicalTestPrescriptionDto[];
}