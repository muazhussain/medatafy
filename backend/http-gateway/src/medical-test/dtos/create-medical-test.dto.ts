import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

enum MedicalTestType {
    LAB = 'lab',
    IMAGING = 'imaging',
    OTHER = 'other',
}

export class CreateMedicalTestDto {
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Test name',
        example: 'Blood test',
    })
    @IsString()
    @IsNotEmpty()
    testName: string;

    @ApiProperty({
        type: 'enum',
        enum: MedicalTestType,
        required: true,
        description: 'Test type',
        example: 'lab',
        default: 'lab',
    })
    @IsEnum(MedicalTestType, { message: 'Invalid test type' })
    testType: MedicalTestType;

    @ApiProperty({
        type: 'number',
        required: true,
        description: 'Test cost',
        example: 1000,
    })
    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @ApiProperty({
        format: 'uuid',
        required: true,
        description: 'Hospital ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    hospital: string;
}