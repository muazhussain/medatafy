import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

enum DoctorAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_DOCTOR = 'cancelled_by_doctor',
}

export class CreateDoctorAppointmentDto {
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Appointment date',
        format: 'DD-MM-YYYY',
        example: '01-01-2022',
        default: '01-01-2022',
    })
    @IsString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Appointment time',
        format: 'HH:mm',
        example: '14:00',
        default: '14:00',
    })
    @IsString()
    @IsNotEmpty()
    time: string;

    @ApiProperty({
        type: 'enum',
        enum: DoctorAppointmentStatus,
        required: false,
        nullable: true,
        description: 'Appointment status',
        example: 'pending',
        default: 'pending',
    })
    @IsEnum(DoctorAppointmentStatus, { message: 'Invalid status' })
    @IsOptional()
    status?: DoctorAppointmentStatus;

    @ApiProperty({
        format: 'uuid',
        required: true,
        description: 'Patient ID',
        example: '123e4567-e89b-12d3-a456-426655440000',
        default: '123e4567-e89b-12d3-a456-426655440000',
    })
    @IsUUID()
    patient: string;

    @ApiProperty({
        format: 'uuid',
        required: true,
        description: 'Doctor ID',
        example: '123e4567-e89b-12d3-a456-426655440000',
        default: '123e4567-e89b-12d3-a456-426655440000',
    })
    @IsUUID()
    doctor: string;
}