import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { AccountStatus, AccountType, Gender } from "../entities/user.entity";

export class UpdateUserDto {
    @ApiProperty({
        required: false,
        type: 'string',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        example: 'pYI3H@example.com',
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        required: false,
        type: 'enum',
        enum: Gender,
    })
    @IsString()
    @IsOptional()
    gender?: Gender;

    @ApiProperty({
        required: false,
        type: 'string',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    phone?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        example: '1990-01-01',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    dateOfBirth?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        example: 'image.jpg',
    })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty({
        required: false,
        type: 'enum',
        enum: AccountStatus,
    })
    @IsString()
    @IsOptional()
    accountStatus?: AccountStatus;

    @ApiProperty({
        required: false,
        type: 'enum',
        enum: AccountType,
    })
    @IsString()
    @IsOptional()
    accountType?: AccountType;
}