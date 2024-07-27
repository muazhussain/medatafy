import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

enum HospitalAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_HOSPITAL = 'cancelled_by_hospital',
}

export class CreateHospitalAppointmentDto {
    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    time: string;

    @IsEnum(HospitalAppointmentStatus, { message: 'Invalid status' })
    @IsOptional()
    status?: HospitalAppointmentStatus;

    @IsUUID()
    patient: string;

    @IsUUID()
    hospital: string;
}