import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

enum HospitalAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_HOSPITAL = 'cancelled_by_hospital',
}

export class UpdateHospitalAppointmentDto {
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Appointment date',
        format: 'DD-MM-YYYY',
        example: '01-01-2022',
        default: '01-01-2022',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    date?: string;

    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Appointment time',
        format: 'HH:mm',
        example: '14:00',
        default: '14:00',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    time?: string;

    @ApiProperty({
        type: 'enum',
        enum: HospitalAppointmentStatus,
        required: false,
        nullable: true,
        description: 'Appointment status',
        example: 'pending',
        default: 'pending',
    })
    @IsEnum(HospitalAppointmentStatus, { message: 'Invalid status' })
    @IsOptional()
    status?: HospitalAppointmentStatus;

    @ApiProperty({
        format: 'uuid',
        required: false,
        nullable: true,
        description: 'Patient ID',
        example: '123e4567-e89b-12d3-a456-426655440000',
        default: '123e4567-e89b-12d3-a456-426655440000',
    })
    @IsUUID()
    @IsOptional()
    patient?: string;

    @ApiProperty({
        format: 'uuid',
        required: false,
        nullable: true,
        description: 'Hospital ID',
        example: '123e4567-e89b-12d3-a456-426655440000',
        default: '123e4567-e89b-12d3-a456-426655440000',
    })
    @IsUUID()
    @IsOptional()
    hospital?: string;
}