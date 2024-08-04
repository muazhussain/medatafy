import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

enum DoctorAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_DOCTOR = 'cancelled_by_doctor',
}

export class UpdateDoctorAppointmentDto {
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Appointment date',
        format: 'DD-MM-YYYY',
        example: '01-01-2022',
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
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    time?: string;

    @ApiProperty({
        type: 'enum',
        enum: DoctorAppointmentStatus,
        required: false,
        nullable: true,
        description: 'Appointment status',
        example: 'pending',
    })
    @IsEnum(DoctorAppointmentStatus, { message: 'Invalid status' })
    @IsOptional()
    status?: DoctorAppointmentStatus;

    @ApiProperty({
        format: 'uuid',
        required: false,
        nullable: true,
        description: 'Patient ID',
        example: '123e4567-e89b-12d3-a456-426655440000',
    })
    @IsUUID()
    @IsOptional()
    patient?: string;

    @ApiProperty({
        format: 'uuid',
        required: false,
        nullable: true,
        description: 'Doctor ID',
        example: '123e4567-e89b-12d3-a456-426655440000',
    })
    @IsUUID()
    @IsOptional()
    doctor?: string;
}