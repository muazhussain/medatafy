import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

enum DoctorAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_DOCTOR = 'cancelled_by_doctor',
}

export class UpdateDoctorAppointmentDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    date?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    time?: string;

    @IsEnum(DoctorAppointmentStatus, { message: 'Invalid status' })
    @IsOptional()
    status?: DoctorAppointmentStatus;

    @IsUUID()
    @IsOptional()
    patient?: string;

    @IsUUID()
    @IsOptional()
    doctor?: string;
}