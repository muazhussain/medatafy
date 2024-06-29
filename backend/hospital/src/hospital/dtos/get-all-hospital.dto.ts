import { IsNumber } from "class-validator";

export class GetAllHospitalDto {
    @IsNumber()
    take: number;

    @IsNumber()
    page: number;
}