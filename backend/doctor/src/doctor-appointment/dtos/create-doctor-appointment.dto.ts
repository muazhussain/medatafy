import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

enum DoctorAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_DOCTOR = 'cancelled_by_doctor',
}

export class CreateDoctorAppointmentDto {
    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    time: string;

    @IsEnum(DoctorAppointmentStatus, { message: 'Invalid status' })
    @IsOptional()
    status?: DoctorAppointmentStatus;

    @IsUUID()
    patient: string;

    @IsUUID()
    doctor: string;
}