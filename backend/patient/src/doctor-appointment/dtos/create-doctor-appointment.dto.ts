import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { DoctorAppointmentStatus } from "../entities/doctor-appointment.entity";

export class CreateDoctorAppointmentDto {
    @IsDate()
    appointmentTime: Date;

    @IsString()
    @IsNotEmpty()
    status: DoctorAppointmentStatus;

    @IsUUID()
    patient: string;

    @IsUUID()
    doctor: string;
}