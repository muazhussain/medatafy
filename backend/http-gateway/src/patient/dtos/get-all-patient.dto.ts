import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional } from "class-validator";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}
 
export class GetAllPatientDto {
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
        enum: Gender,
        required: false,
        description: 'Gender of the patient',
        example: 'male',
    })
    @IsEnum(Gender, { message: 'Gender must be either male or female' })
    @IsOptional()
    gender?: Gender;
}