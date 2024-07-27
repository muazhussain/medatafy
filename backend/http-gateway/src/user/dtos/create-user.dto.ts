import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { UserType } from "../entities/user.entity";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

class DoctorDto {
    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    bmdcRegNo: string;

    @ApiProperty({
        required: true,
        type: 'enum',
        example: Gender,
    })
    @IsEnum(Gender, { message: 'Invalid gender' })
    gender: Gender;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    dateOfBirth: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    speciality: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        required: false,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    officeHours?: string;
}

class HospitalDto {
    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    website: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    bin: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    tin: string;
}

class PatientDto {
    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: true,
        type: 'enum',
        example: Gender,
    })
    @IsEnum(Gender, { message: 'Invalid gender' })
    gender: Gender;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    dateOfBirth: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        required: true,
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    address: string;
}

export class CreateUserDto {
    @ApiProperty({
        required: true,
        type: 'string',
        example: 'jDQ0t@example.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
        type: 'string',
        example: '12345678'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @ApiProperty({
        required: true,
        type: 'enum',
        example: UserType,
    })
    @IsEnum(UserType, { message: 'Invalid user type' })
    userType: UserType;

    @ApiProperty({
        required: false,
        type: HospitalDto,
        example: HospitalDto,
    })
    @ValidateNested()
    @IsOptional()
    hospital?: HospitalDto;

    @ApiProperty({
        required: false,
        type: DoctorDto,
        example: DoctorDto,
    })
    @ValidateNested()
    @IsOptional()
    doctor?: DoctorDto;

    @ApiProperty({
        required: false,
        type: PatientDto,
        example: PatientDto,
    })
    @ValidateNested()
    @IsOptional()
    patient?: PatientDto;
}