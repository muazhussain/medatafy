import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { AppointmentStatus } from "../entities/appointment.entity";

export class UpdateAppointmentDto {
    @IsOptional()
    @IsDate()
    appointmentTime?: Date;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    status?: AppointmentStatus;

    @IsOptional()
    @IsUUID()
    patient?: string;

    @IsOptional()
    @IsUUID()
    doctor?: string;
}