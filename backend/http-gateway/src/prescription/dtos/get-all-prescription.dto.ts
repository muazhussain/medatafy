import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

export class GetAllPrescriptionDto {
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
        type: 'number',
        required: true,
        description: 'Number of items per page',
        example: 10,
        default: 10,
    })
    @IsNumber()
    take: number;

    @ApiProperty({
        type: 'array',
        required: false,
        description: 'Dates',
        example: ['2022-01-01', '2022-01-02'],
        default: ['2022-01-01', '2022-01-02'],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    dates?: string[];

    @ApiProperty({
        type: 'array',
        format: 'uuid',
        required: false,
        description: 'Doctor ids',
        example: ['a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'],
        default: ['a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    doctors?: string[];

    @ApiProperty({
        type: 'array',
        format: 'uuid',
        required: false,
        description: 'Patient ids',
        example: ['a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'],
        default: ['a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'],
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    patients?: string[];
}