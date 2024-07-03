import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { DoctorAppointmentStatus } from "../entities/doctor-appointment.entity";

export class UpdateDoctorAppointmentDto {
    @IsOptional()
    @IsDate()
    appointmentTime?: Date;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    status?: DoctorAppointmentStatus;

    @IsOptional()
    @IsUUID()
    patient?: string;

    @IsOptional()
    @IsUUID()
    doctor?: string;
}