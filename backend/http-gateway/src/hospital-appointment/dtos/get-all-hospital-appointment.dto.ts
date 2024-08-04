import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested, isNumber } from "class-validator";

enum HospitalAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_HOSPITAL = 'cancelled_by_hospital',
}

export class GetAllHospitalAppointmentDto {
    @ApiProperty({
        type: 'number',
        required: true,
        description: 'Page number',
        example: 1,
        default: 1,
    })
    @IsNumber()
    page: number;

    @ApiProperty({
        type: 'number',
        required: true,
        description: 'Number of items per page',
        example: 10,
        default: 10,
    })
    @IsNumber()
    take: number;

    @ApiProperty({
        type: 'array',
        required: false,
        nullable: true,
        description: 'Dates',
        example: ['01-01-2022', '01-02-2022'],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    dates?: string[];

    @ApiProperty({
        type: 'array',
        required: false,
        nullable: true,
        description: 'Statuses',
        example: ['pending', 'completed'],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsEnum(HospitalAppointmentStatus, { each: true, message: 'Invalid status' })
    @IsOptional()
    status?: HospitalAppointmentStatus[];

    @ApiProperty({
        format: 'uuid',
        required: false,
        nullable: true,
        description: 'UUID of patients',
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    patients?: string[];

    @ApiProperty({
        format: 'uuid',
        required: false,
        nullable: true,
        description: 'UUID of hospitals',
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    hospitals?: string[];
}