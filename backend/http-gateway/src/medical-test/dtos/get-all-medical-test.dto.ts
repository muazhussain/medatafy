import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNumber, IsOptional, IsUUID, ValidateNested } from "class-validator";

enum MedicalTestType {
    LAB = 'lab',
    IMAGING = 'imaging',
    OTHER = 'other',
}

export class GetAllMedicalTestDto {
    @ApiProperty({
        type: 'number',
        required: true,
        description: 'The number of items to take',
        example: 10,
        default: 10,
    })
    @IsNumber()
    take: number;

    @ApiProperty({
        type: 'number',
        required: true,
        description: 'Page number',
        example: 1,
        default: 1,
    })
    @IsNumber()
    page: number;

    @ApiProperty({
        type: 'array',
        required: false,
        description: 'Search by test types',
        example: ['lab', 'imaging'],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsEnum(MedicalTestType, { each: true })
    @IsOptional()
    testTypes?: MedicalTestType[];

    @ApiProperty({
        type: 'array',
        format: 'uuid',
        required: false,
        description: 'Hospitals ids',
        example: ['a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    hospitals?: string[];
}