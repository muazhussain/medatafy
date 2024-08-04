import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

enum HospitalAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_HOSPITAL = 'cancelled_by_hospital',
}

export class CreateHospitalAppointmentDto {
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Appointment date',
        format: 'DD-MM-YYYY',
        example: '01-01-2022',
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
    })
    @IsString()
    @IsNotEmpty()
    time: string;

    @ApiProperty({
        type: 'enum',
        enum: HospitalAppointmentStatus,
        required: false,
        nullable: true,
        description: 'Appointment status',
        example: 'pending',
    })
    @IsEnum(HospitalAppointmentStatus, { message: 'Invalid status' })
    @IsOptional()
    status?: HospitalAppointmentStatus;

    @ApiProperty({
        format: 'uuid',
        required: true,
        description: 'Patient ID',
        example: '123e4567-e89b-12d3-a456-426655440000',
    })
    @IsUUID()
    patient: string;

    @ApiProperty({
        format: 'uuid',
        required: true,
        description: 'Hospital ID',
        example: '123e4567-e89b-12d3-a456-426655440000',
    })
    @IsUUID()
    hospital: string;
}