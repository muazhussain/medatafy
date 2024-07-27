import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested, isNumber } from "class-validator";

enum HospitalAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_HOSPITAL = 'cancelled_by_hospital',
}

export class GetAllHospitalAppointmentDto {
    @IsNumber()
    take: number;

    @IsNumber()
    page: number;

    @ValidateNested({ each: true })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    dates?: string[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsEnum(HospitalAppointmentStatus, { each: true, message: 'Invalid status' })
    @IsOptional()
    status?: HospitalAppointmentStatus[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    patients?: string[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    hospitals?: string[];
}