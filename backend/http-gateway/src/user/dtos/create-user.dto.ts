import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { UserType } from "../entities/user.entity";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

class DoctorDto {
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Name of the doctor',
        example: 'Dr. John Doe',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'BMDC registration number of the doctor',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    bmdcRegNo: string;

    @ApiProperty({
        type: 'enum',
        enum: Gender,
        required: true,
        description: 'Gender of doctor',
        example: 'male',
    })
    @IsEnum(Gender, { message: 'Invalid gender' })
    gender: Gender;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Phone number of the doctor',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Date of birth of the doctor',
        example: '01-01-2000',
        format: 'DD-MM-YYYY',
    })
    @IsString()
    @IsNotEmpty()
    dateOfBirth: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Image of the doctor',
        example: 'image.png',
    })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Speciality of the doctor',
        example: 'Cardiologist',
    })
    @IsString()
    @IsNotEmpty()
    speciality: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Address of the doctor',
        example: 'Dhaka, Bangladesh',
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Office hours of the doctor',
        example: '14:00 - 18:00',
        format: 'HH:mm - HH:mm',
    })
    @IsString()
    @IsNotEmpty()
    officeHours?: string;
}

class HospitalDto {
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Name of the hospital',
        example: 'Hospital Name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Address of the hospital',
        example: 'Hospital Address',
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Phone number of the hospital',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Description of the hospital',
        example: 'Description of the hospital',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Image of the hospital',
        example: 'image.png',
    })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Website of the hospital',
        example: 'www.hospital.com',
    })
    @IsString()
    @IsNotEmpty()
    website: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'BIN of the hospital',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    bin: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'TIN of the hospital',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    tin: string;
}

class PatientDto {
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Name of the patient',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: 'enum',
        enum: Gender,
        required: true,
        description: 'Gender of the patient',
        example: 'male',
    })
    @IsEnum(Gender, { message: 'Invalid gender' })
    gender: Gender;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Phone number of the patient',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Date of birth of the patient',
        example: '01-01-2000',
        default: '01-01-2000',
        format: 'DD-MM-YYYY',
    })
    @IsString()
    @IsNotEmpty()
    dateOfBirth: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Image of the patient',
        example: 'patient.jpg',
    })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Address of the patient',
        example: 'Dhaka, Bangladesh',
    })
    @IsString()
    @IsNotEmpty()
    address: string;
}

export class CreateUserDto {
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Email of the user',
        example: 'user@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'Password of the user',
        example: '12345678',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @ApiProperty({
        type: 'enum',
        enum: UserType,
        required: true,
        description: 'Type of the user',
        example: 'admin',
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