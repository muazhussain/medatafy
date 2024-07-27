import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

enum HospitalAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_HOSPITAL = 'cancelled_by_hospital',
}

export class UpdateHospitalAppointmentDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    date?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    time?: string;

    @IsEnum(HospitalAppointmentStatus, { message: 'Invalid status' })
    @IsOptional()
    status?: HospitalAppointmentStatus;

    @IsUUID()
    @IsOptional()
    patient?: string;

    @IsUUID()
    @IsOptional()
    hospital?: string;
}