import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, IsNotEmpty, IsUUID } from "class-validator";

export class UpdateMedicalReportDto {
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Issue date of medical report',
        example: '01-01-2022',
        format: 'DD-MM-YYYY',
    })
    @IsDate()
    @IsOptional()
    issueDate?: Date;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Delivery date of medical report',
        example: '01-01-2022',
        format: 'DD-MM-YYYY',
    })
    @IsDate()
    @IsOptional()
    deliveryDate?: Date;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Report content of medical report',
        example: 'Report content',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    reportContent?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Summary of medical report',
        example: 'Summary',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    summary?: string;

    @ApiProperty({
        format: 'uuid',
        required: false,
        nullable: true,
        description: 'Medical test id',
        example: '11111111-1111-1111-1111-111111111111',
    })
    @IsUUID()
    @IsOptional()
    medicalTest?: string;

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