import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Gender, UserType } from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty({
        required: true,
        type: 'string',
        example: 'John Doe'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;

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
        example: Gender,
    })
    @IsString()
    @IsNotEmpty()
    gender: Gender;

    @ApiProperty({
        required: true,
        type: 'string',
        example: '12345678'
    })
    @IsString()
    phone: string;

    @ApiProperty({
        required: true,
        type: 'string',
        example: 'YYYY-MM-DD'
    })
    @IsString()
    dateOfBirth?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        example: 'image.png'
    })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty({
        required: true,
        type: 'enum',
        example: UserType,
    })
    @IsString()
    @IsNotEmpty()
    userType: UserType;
}