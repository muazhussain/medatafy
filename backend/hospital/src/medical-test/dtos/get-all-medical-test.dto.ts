import { IsNumber, IsUUID } from "class-validator";

export class GetAllTestDto {
    @IsNumber()
    take: number;

    @IsNumber()
    page: number;

    @IsUUID()
    hospital: string;
}