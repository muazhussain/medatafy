import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { Repository } from 'typeorm';
import { GetAllDoctorDto } from '../dtos/get-all-doctor.dto';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';
import AppDataSource from 'src/data-source';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(DoctorEntity) private readonly doctorRepository: Repository<DoctorEntity>,
    ) { }

    async getDoctorById(id: string): Promise<DoctorEntity> {
        try {
            const findDoctor = await this.doctorRepository.findOne({
                where: { id: id },
            });
            if (!findDoctor) {
                throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
            }
            return findDoctor;
        } catch (error) {
            throw error;
        }
    }

    async getAllDoctor(payload: GetAllDoctorDto): Promise<DoctorEntity[]> {
        try {
            return await this.doctorRepository.find({
                where: {
                    gender: payload.gender,
                    speciality: payload.speciality,
                    address: payload.address,
                },
                order: {
                    createdAt: 'DESC',
                },
                take: Math.max(payload.take, 0),
                skip: (Math.max(payload.page, 1) - 1) * Math.max(payload.take, 0),
            });
        } catch (error) {
            throw error;
        }
    }

    async updateDoctor(id: string, payload: UpdateDoctorDto): Promise<DoctorEntity> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findDoctor = await this.getDoctorById(id);
            if (!findDoctor) {
                throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
            }
            Object.assign(findDoctor, payload);
            await queryRunner.manager.update(this.doctorRepository.metadata.target, { id: id }, findDoctor);
            await queryRunner.commitTransaction();
            return findDoctor;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
