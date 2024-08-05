import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMedicalReportDto {
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Issue date of medical report',
        example: '01-01-2022',
        format: 'DD-MM-YYYY',
    })
    @IsString()
    @IsNotEmpty()
    issueDate: string;

    @ApiProperty({
        type: 'string',
        required: false,
        description: 'Delivery date of medical report',
        example: '01-01-2022',
        format: 'DD-MM-YYYY',
    })
    @IsString()
    @IsOptional()
    deliveryDate?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Medical report content',
        example: 'Some medical report content',
    })
    @IsString()
    @IsOptional()
    reportContent?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Medical report summary',
        example: 'Some medical report summary',
    })
    @IsString()
    @IsOptional()
    summary?: string;

    @ApiProperty({
        format: 'uuid',
        required: true,
        description: 'Medical test id',
        example: '11111111-1111-1111-1111-111111111111',
    })
    @IsUUID()
    medicalTest: string;

    @ApiProperty({
        format: 'uuid',
        required: true,
        description: 'Patient id',
        example: '11111111-1111-1111-1111-111111111111',
    })
    @IsUUID()
    patient: string;

    @ApiProperty({
        format: 'uuid',
        required: false,
        nullable: true,
        description: 'Doctor id',
        example: '11111111-1111-1111-1111-111111111111',
    })
    @IsUUID()
    @IsOptional()
    doctor?: string;

    @ApiProperty({
        format: 'uuid',
        required: false,
        nullable: true,
        description: 'Hospital id',
        example: '11111111-1111-1111-1111-111111111111',
    })
    @IsUUID()
    @IsOptional()
    hospital?: string;
}