import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { AppointmentStatus } from "../entities/appointment.entity";

export class CreateAppointmentDto {
    @IsDate()
    appointmentTime: Date;

    @IsString()
    @IsNotEmpty()
    status: AppointmentStatus;

    @IsUUID()
    patient: string;

    @IsUUID()
    doctor: string;
}