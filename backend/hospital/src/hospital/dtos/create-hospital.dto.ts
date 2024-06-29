import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateHospitalDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    website: string;

    @IsString()
    @IsNotEmpty()
    bin: string;

    @IsString()
    @IsNotEmpty()
    tin: string;
}