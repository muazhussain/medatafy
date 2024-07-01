import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, isNumber } from "class-validator";
import { AppointmentStatus } from "../entities/appointment.entity";

export class GetAllAppointmentDto {
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
    status?: AppointmentStatus;

    @IsOptional()
    @IsUUID()
    patient?: string;

    @IsOptional()
    @IsUUID()
    doctor?: string;
}