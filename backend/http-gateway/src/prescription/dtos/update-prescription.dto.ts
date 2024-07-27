import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({
        type: 'date',
        required: false,
        nullable: true,
        description: 'Date of prescription',
        example: '01-01-2024',
        format: 'dd-mm-yyyy',
        default: '01-01-2024',
    })
    @IsDate()
    @IsOptional()
    date?: Date;

    @ApiProperty({
        type: 'array',
        required: false,
        nullable: true,
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
        nullable: true,
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
        nullable: true,
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
        required: false,
        nullable: true,
        description: 'Doctor ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        default: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsOptional()
    doctor?: string;

    @ApiProperty({
        format: 'uuid',
        required: false,
        nullable: true,
        description: 'Patient ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        default: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsOptional()
    patient?: string;

    @ApiProperty({
        type: 'array',
        required: false,
        nullable: true,
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
        nullable: true,
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