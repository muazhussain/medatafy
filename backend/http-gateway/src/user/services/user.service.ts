import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountStatus, AccountType, UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import * as crypto from 'crypto';
import { VerifyTokenDto } from '../dtos/verify-token.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import AppDataSource from 'src/data-source';
import { DoctorEntity } from 'src/other-entities/entities/doctor.entity';
import { HospitalEntity } from 'src/other-entities/entities/hostpital.entity';
import { MedatafyAdminEntity } from 'src/other-entities/entities/medatafy-admin.entity';
import { PatientEntity } from 'src/other-entities/entities/patient.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(DoctorEntity) private readonly doctorRepository: Repository<DoctorEntity>,
        @InjectRepository(HospitalEntity) private readonly hospitalRepository: Repository<HospitalEntity>,
        @InjectRepository(PatientEntity) private readonly patientRepository: Repository<PatientEntity>,
        @InjectRepository(MedatafyAdminEntity) private readonly medatafyAdminRepository: Repository<MedatafyAdminEntity>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectRedis() private readonly redisService: Redis,
        private readonly jwtService: JwtService,
    ) { }

    async createUser(payload: CreateUserDto): Promise<any> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        let savedUser: any;
        try {
            let findUser = await this.userModel.findOne({
                email: payload.email,
                userType: payload.userType,
            });
            if (findUser) {
                throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
            }

            if (payload.userType === 'medatafy_admin' && payload.medatafyAdmin === null) {
                throw new HttpException('Admin information is required', HttpStatus.BAD_REQUEST);
            }

            if (payload.userType === 'doctor' && payload.doctor === null) {
                throw new HttpException('Doctor information is required', HttpStatus.BAD_REQUEST);
            }

            if (payload.userType === 'patient' && payload.patient === null) {
                throw new HttpException('Patient information is required', HttpStatus.BAD_REQUEST);
            }

            if (payload.userType === 'hospital' && payload.hospital === null) {
                throw new HttpException('Hospital information is required', HttpStatus.BAD_REQUEST);
            }

            const hashedPassword = await bcrypt.hash(payload.password, 10);
            payload.password = hashedPassword;

            const newUser = await this.userModel.create({
                email: payload.email,
                password: payload.password,
                userType: payload.userType,
                accountStatus: AccountStatus.PENDING,
                accountType: AccountType.FREE,
            });
            savedUser = await newUser.save();

            const user = this.userRepository.create({
                email: payload.email,
                password: payload.password,
                userType: payload.userType,
                accountStatus: AccountStatus.PENDING,
                accountType: AccountType.FREE,
                mongoRef: savedUser._id.toString() as any,
            });
            const createdUser = await queryrunner.manager.save(this.userRepository.metadata.target, user);

            if (payload.userType === 'medatafy_admin') {
                const medatafyAdmin = this.medatafyAdminRepository.create({
                    name: payload.medatafyAdmin.name,
                    user: createdUser,
                });
                await queryrunner.manager.save(this.medatafyAdminRepository.metadata.target, medatafyAdmin);
            }
            else if (payload.userType === 'doctor') {
                const findUser = await this.doctorRepository.findOneBy({ phone: payload.doctor.phone });
                if (findUser) {
                    throw new HttpException('Phone number already exists', HttpStatus.BAD_REQUEST);
                }
                const doctor = this.doctorRepository.create({
                    name: payload.doctor.name,
                    gender: payload.doctor.gender,
                    phone: payload.doctor.phone,
                    dateOfBirth: payload.doctor.dateOfBirth,
                    image: payload.doctor.image,
                    address: payload.doctor.address,
                    bmdcRegNo: payload.doctor.bmdcRegNo,
                    speciality: payload.doctor.speciality,
                    officeHours: payload.doctor.officeHours,
                    user: createdUser,
                });
                await queryrunner.manager.save(this.doctorRepository.metadata.target, doctor);
            } else if (payload.userType === 'patient') {
                const findUser = await this.patientRepository.findOneBy({ phone: payload.patient.phone });
                if (findUser) {
                    throw new HttpException('Phone number already exists', HttpStatus.BAD_REQUEST);
                }
                const patient = this.patientRepository.create({
                    name: payload.patient.name,
                    gender: payload.patient.gender,
                    phone: payload.patient.phone,
                    dateOfBirth: payload.patient.dateOfBirth,
                    image: payload.patient.image,
                    address: payload.patient.address,
                    user: createdUser,
                });
                await queryrunner.manager.save(this.patientRepository.metadata.target, patient);
            } else if (payload.userType === 'hospital') {
                const findUser = await this.hospitalRepository.findOneBy({ phone: payload.hospital.phone });
                if (findUser) {
                    throw new HttpException('Phone number already exists', HttpStatus.BAD_REQUEST);
                }
                const hospital = this.hospitalRepository.create({
                    name: payload.hospital.name,
                    address: payload.hospital.address,
                    phone: payload.hospital.phone,
                    image: payload.hospital.image,
                    bin: payload.hospital.bin,
                    tin: payload.hospital.tin,
                    description: payload.hospital.description,
                    website: payload.hospital.website,
                    user: createdUser,
                });
                await queryrunner.manager.save(this.hospitalRepository.metadata.target, hospital);
            }
            await queryrunner.commitTransaction();
            const data = await this.userRepository.findOne({
                where: {
                    id: createdUser.id,
                },
                relations: {
                    doctor: payload.userType === 'doctor' ? true : false,
                    patient: payload.userType === 'patient' ? true : false,
                    hospital: payload.userType === 'hospital' ? true : false,
                    medatafyAdmin: payload.userType === 'medatafy_admin' ? true : false,
                },
            });
            return plainToClass(UserDto, data, { excludeExtraneousValues: true });
        } catch (error) {
            await this.userModel.deleteOne(savedUser);
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }

    async getUserById(id: string): Promise<any> {
        try {
            const findUser = await this.userRepository.findOneBy({ id: id });
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return plainToClass(UserDto, findUser, { excludeExtraneousValues: true });
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email: string): Promise<any> {
        try {
            const findUser = await this.userRepository.findOneBy({ email: email });
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return plainToClass(UserDto, findUser, { excludeExtraneousValues: true });
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: string, payload: UpdateUserDto): Promise<any> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const findUser = await this.userRepository.findOneBy({ id: id });
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            if (payload.email != null && payload.email != findUser.email) {
                const findUser = await this.userModel.findOne({ email: payload.email });
                if (findUser) {
                    throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
                }
            }

            // update on postgres
            const user = await this.userRepository.findOneBy({ id: id });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            user.email = payload.email ?? user.email;
            user.accountStatus = payload.accountStatus ?? user.accountStatus;
            user.accountType = payload.accountType ?? user.accountType;
            await queryrunner.manager.update(this.userRepository.metadata.target, { id: user.id }, user);

            // update on mongo
            const isValid = mongoose.Types.ObjectId.isValid(user.mongoRef);
            if (!isValid) {
                throw new HttpException('Invalid mongo id', HttpStatus.BAD_REQUEST);
            }
            await this.userModel.findOneAndUpdate({ _id: user.mongoRef }, {
                email: payload.email ?? user.email,
                accountStatus: payload.accountStatus ?? user.accountStatus,
                accountType: payload.accountType ?? user.accountType,
            });

            await queryrunner.commitTransaction();
            return user;
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }

    async deleteUser(id: string): Promise<any> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const user = await this.userRepository.findOneBy({ id: id });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            await queryrunner.manager.softDelete(this.userRepository.metadata.target, { id: user.id });
            const isValid = mongoose.Types.ObjectId.isValid(user.mongoRef);
            if (!isValid) {
                throw new HttpException('Invalid mongo id', HttpStatus.BAD_REQUEST);
            }
            const findUser = await this.userModel.findById(user.mongoRef);
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            }
            await this.userModel.findByIdAndDelete({ _id: user.mongoRef });
            await queryrunner.commitTransaction();
            return plainToClass(UserDto, user, { excludeExtraneousValues: true });
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const findUser = await this.userModel.findOne({ email: email });
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            }
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (!isMatch) {
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
            }
            const user = await this.userRepository.findOne({
                where: {
                    email: email
                },
                relations: {
                    doctor: true,
                    hospital: true,
                    patient: true,
                    medatafyAdmin: true,
                },
            });
            return plainToClass(UserDto, user, { excludeExtraneousValues: true });
        } catch (error) {
            throw error;
        }
    }

    async login(req: any): Promise<any> {
        try {
            const accessToken = this.jwtService.sign(
                {
                    user: req.user.id,
                    userAgent: req.headers['user-agent'],
                    tokenType: 'access',
                },
                {
                    expiresIn: '1h',
                },
            );
            const refreshToken = this.jwtService.sign(
                {
                    user: req.user.id,
                    userAgent: req.headers['user-agent'],
                    tokenType: 'refresh',
                },
                {
                    expiresIn: '3d',
                },
            );
            await this.redisService.set(req.user._id, refreshToken, 'EX', 60 * 60 * 24 * 3);

            const user = this.removeNullValues(req.user);

            return {
                user: user,
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        } catch (error) {
            throw error;
        }
    }

    async createAccessToken(refreshToken: string): Promise<any> {
        try {
            const decode = this.jwtService.decode(refreshToken);
            const refreshTokenKey = await this.redisService.get(decode['userId']);
            if (refreshTokenKey != refreshToken) {
                throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
            }
            return this.jwtService.sign(
                {
                    userId: decode['userId'],
                    email: decode['email'],
                    userAgent: decode['userAgent'],
                    tokenType: 'access',
                },
                {
                    expiresIn: '1h',
                },
            );
        } catch (error) {
            throw error;
        }
    }

    async changePassword(id: string, payload: ChangePasswordDto): Promise<any> {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
            }
            const findUser = await this.userRepository.findOneBy({ mongoRef: id });
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            }
            const isMatch = await bcrypt.compare(payload.oldPassword, findUser.password);
            if (!isMatch) {
                throw new HttpException('Old password is incorrect', HttpStatus.BAD_REQUEST);
            }
            findUser.password = await bcrypt.hash(payload.newPassword, 10);
            await this.userModel.findByIdAndUpdate({ _id: id }, { password: findUser.password });
            return await this.userRepository.update({ id: findUser.id }, findUser);
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(payload: ResetPasswordDto): Promise<any> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const findUser = await this.userRepository.findOneBy({ id: payload.id });
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            }
            findUser.password = await bcrypt.hash(payload.password, 10);
            await queryrunner.manager.update(this.userRepository.metadata.target, { id: payload.id }, findUser);
            const isValid = mongoose.Types.ObjectId.isValid(findUser.mongoRef);
            if (!isValid) {
                throw new HttpException('Invalid mongo id', HttpStatus.BAD_REQUEST);
            }
            await this.userModel.findByIdAndUpdate({ _id: findUser.mongoRef }, { password: findUser.password });
            await queryrunner.commitTransaction();
            return plainToClass(UserDto, findUser, { excludeExtraneousValues: true });
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }

    async forgotPassword(payload: ForgotPasswordDto): Promise<any> {
        try {
            const findUser = await this.userModel.findOne({ email: payload.email });
            if (!findUser) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            const token = crypto.randomBytes(4).toString('hex').toUpperCase();
            await this.redisService.set(`reset: ${token}`, findUser._id.toString(), 'EX', 60 * 2);

            // send email

            return token;
        } catch (error) {
            throw error;
        }
    }

    async verifyToken(payload: VerifyTokenDto): Promise<any> {
        try {
            const userId = await this.redisService.get(`${payload.type}: ${payload.token}`);
            if (!userId) {
                throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
            }
            return userId;
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

    private generateUniqueId(name: string, userType: string): string {
        const userPrefix = {
            patient: 'P',
            doctor: 'D',
            hospitalAdmin: 'H',
            hospitalEmployee: 'E'
        };

        const timestamp = this.encodeBase36();

        const randomSuffix1 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const randomSuffix2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const lastChar = name.charAt(name.length - 1).toUpperCase();
        const secondLastChar = name.charAt(name.length - 2).toUpperCase();

        const uniqueId = `${userPrefix[userType]}${timestamp}${randomSuffix1}${randomSuffix2}${lastChar}${secondLastChar}`;
        return uniqueId;
    }

    private removeNullValues(obj: Record<string, any>): Record<string, any> {
        return Object.keys(obj)
            .filter((key) => obj[key] !== null)
            .reduce((acc, key) => {
                acc[key] = obj[key];
                return acc;
            }, {} as Record<string, any>);
    }
}