import { IsArray, IsEnum, IsNumber, IsOptional, IsUUID, ValidateNested } from "class-validator";

enum MedicalTestType {
    LAB = 'lab',
    IMAGING = 'imaging',
    OTHER = 'other',
}
export class GetAllMedicalTestDto {
    @IsNumber()
    take: number;

    @IsNumber()
    page: number;

    @ValidateNested({ each: true })
    @IsArray()
    @IsEnum(MedicalTestType, { each: true })
    @IsOptional()
    testTypes?: MedicalTestType[];

    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    hospitals?: string[];
}