import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountStatus, AccountType, Gender, UserEntity, UserType } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async createUser(payload: CreateUserDto): Promise<any> {
        try {
            let findUser = await this.userRepository.findOneBy({ email: payload.email });
            if (findUser) {
                throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
            }
            findUser = await this.userRepository.findOneBy({ phone: payload.phone });
            if (findUser) {
                throw new HttpException('Phone number already exists', HttpStatus.BAD_REQUEST);
            }

            if (payload.userType != 'patient' && payload.userType != 'doctor' && payload.userType != 'hospitalAdmin' && payload.userType != 'hospitalEmployee') {
                throw new HttpException('Invalid user type', HttpStatus.BAD_REQUEST);
            }
            if (payload.gender != 'male' && payload.gender != 'female') {
                throw new HttpException('Invalid gender', HttpStatus.BAD_REQUEST);
            }

            const hashedPassword = await bcrypt.hash(payload.password, 10);
            payload.password = hashedPassword;
            const uniqueId = this.generateUniqueId(payload.name, payload.userType, payload.gender);
            const newUser = await this.userModel.create({
                name: payload.name,
                email: payload.email,
                password: payload.password,
                uniqueId: uniqueId,
                gender: payload.gender,
                phone: payload.phone,
                dateOfBirth: payload.dateOfBirth,
                image: payload.image,
                accountType: AccountType.FREE,
                accountStatus: AccountStatus.PENDING,
                userType: payload.userType,
            });
            const savedUser = await newUser.save();
            const user = await this.userRepository.save({
                name: payload.name,
                email: payload.email,
                password: payload.password,
                uniqueId: uniqueId,
                gender: payload.gender,
                phone: payload.phone,
                dateOfBirth: payload.dateOfBirth,
                image: payload.image,
                accountType: AccountType.FREE,
                accountStatus: AccountStatus.PENDING,
                userType: payload.userType,
                mongoRef: savedUser._id.toString() as any,
            });
            return plainToClass(UserDto, user, { excludeExtraneousValues: true });
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
            }
            return await this.userModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        try {
            return await this.userRepository.findOneBy({ email: email });
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: string, payload: UpdateUserDto): Promise<any> {
        try {
            const findUser = await this.userRepository.findOneBy({ id: id });
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            }
            if (payload.gender != null && payload.gender != 'male' && payload.gender != 'female') {
                throw new HttpException('Invalid gender', HttpStatus.BAD_REQUEST);
            }
            if (payload.accountStatus != null && payload.accountStatus != 'pending' && payload.accountStatus != 'active' && payload.accountStatus != 'inactive') {
                throw new HttpException('Invalid account status', HttpStatus.BAD_REQUEST);
            }
            if (payload.accountType != null && payload.accountType != 'free' && payload.accountType != 'premium') {
                throw new HttpException('Invalid account type', HttpStatus.BAD_REQUEST);
            }
            if (payload.email != null && payload.email != findUser.email) {
                const findUser = await this.userRepository.findOneBy({ email: payload.email });
                if (findUser) {
                    throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
                }
            }
            if (payload.phone != null && payload.phone != findUser.phone) {
                const findUser = await this.userRepository.findOneBy({ phone: payload.phone });
                if (findUser) {
                    throw new HttpException('Phone number already exists', HttpStatus.BAD_REQUEST);
                }
            }

            // update on postgres
            findUser.name = payload.name ?? findUser.name;
            findUser.email = payload.email ?? findUser.email;
            findUser.gender = payload.gender ?? findUser.gender;
            findUser.phone = payload.phone ?? findUser.phone;
            findUser.dateOfBirth = payload.dateOfBirth ?? findUser.dateOfBirth;
            findUser.image = payload.image ?? findUser.image;
            findUser.accountStatus = payload.accountStatus ?? findUser.accountStatus;
            findUser.accountType = payload.accountType ?? findUser.accountType;
            await this.userRepository.update({ id: id }, findUser);

            // update on mongo
            const user = await this.userModel.findOneAndUpdate({ _id: findUser.mongoRef }, {
                name: payload.name ?? findUser.name,
                email: payload.email ?? findUser.email,
                gender: payload.gender ?? findUser.gender,
                phone: payload.phone ?? findUser.phone,
                dateOfBirth: payload.dateOfBirth ?? findUser.dateOfBirth,
                image: payload.image ?? findUser.image,
                accountStatus: payload.accountStatus ?? findUser.accountStatus,
                accountType: payload.accountType ?? findUser.accountType,
            });

            return plainToClass(UserDto, findUser, { excludeExtraneousValues: true });
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id: string): Promise<any> {
        try {
            const findUser = await this.userRepository.findOneBy({ id: id });
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            }
            await this.userModel.findByIdAndDelete(findUser.mongoRef);
            return await this.userRepository.softDelete({ id: id });
        } catch (error) {
            throw error;
        }
    }

    private encodeBase36(): string {
        const BASE36_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let encoded = '';
        let num = new Date().getTime();
        while (num > 0) {
            const remainder = num % 36;
            encoded = BASE36_CHARS[remainder] + encoded;
            num = Math.floor(num / 36);
        }
        return encoded || '0';
    }

    private generateUniqueId(name: string, userType: string, gender: string): string {
        const userPrefix = {
            patient: 'P',
            doctor: 'D',
            hospitalAdmin: 'H',
            hospitalEmployee: 'E'
        };

        const genderPrefix = {
            male: 'M',
            female: 'F'
        };

        const timestamp = this.encodeBase36();

        const randomSuffix1 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const randomSuffix2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const lastChar = name.charAt(name.length - 1).toUpperCase();
        const secondLastChar = name.charAt(name.length - 2).toUpperCase();

        const uniqueId = `${userPrefix[userType]}${genderPrefix[gender]}${timestamp}${randomSuffix1}${randomSuffix2}${lastChar}${secondLastChar}`;
        return uniqueId;
    }
}