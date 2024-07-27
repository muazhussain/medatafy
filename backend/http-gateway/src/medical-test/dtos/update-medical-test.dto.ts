import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

enum MedicalTestType {
    LAB = 'lab',
    IMAGING = 'imaging',
    OTHER = 'other',
}

export class UpdateMedicalTestDto {
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Test name',
        example: 'Blood test',
        default: 'Blood test',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    testName?: string;

    @ApiProperty({
        type: 'enum',
        enum: MedicalTestType,
        required: false,
        nullable: true,
        description: 'Test type',
        example: 'lab',
        default: 'lab',
    })
    @IsEnum(MedicalTestType, { message: 'Invalid test type' })
    @IsOptional()
    testType?: MedicalTestType;

    @ApiProperty({
        type: 'number',
        required: false,
        nullable: true,
        description: 'Test cost',
        example: 100,
        default: 100,
    })
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    cost?: number;
}