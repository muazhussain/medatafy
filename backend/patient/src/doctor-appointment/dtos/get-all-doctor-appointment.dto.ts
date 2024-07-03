import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, isNumber } from "class-validator";
import { DoctorAppointmentStatus } from "../entities/doctor-appointment.entity";

export class GetAllDoctorAppointmentDto {
    @IsNumber()
    take: number;

    @IsNumber()
    page: number;

    @IsOptional()
    @IsDate()
    date?: Date;

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