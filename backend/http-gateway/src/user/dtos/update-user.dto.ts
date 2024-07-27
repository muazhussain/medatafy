import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AccountStatus, AccountType } from "../entities/user.entity";

export class UpdateUserDto {
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
        description: 'Email',
        example: 'pYI3H@example.com',
        default: 'pYI3H@example.com',
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        type: 'enum',
        enum: AccountStatus,
        required: false,
        nullable: true,
        description: 'Account status',
        example: 'active',
        default: 'active',
    })
    @IsEnum(AccountStatus, { message: 'Invalid account status' })
    @IsOptional()
    accountStatus?: AccountStatus;

    @ApiProperty({
        type: 'enum',
        enum: AccountType,
        required: false,
        description: 'Account type',
        example: 'free',
        default: 'free',
    })
    @IsEnum(AccountType, { message: 'Invalid account type' })
    @IsOptional()
    accountType?: AccountType;
}