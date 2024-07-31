import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalEntity } from '../entities/hospital.entity';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';
import { UpdateHospitalDto } from '../dtos/update-hospital.dto';
import { Repository } from 'typeorm';
import { GetAllHospitalDto } from '../dtos/get-all-hospital.dto';
import AppDataSource from 'src/data-source';

@Injectable()
export class HospitalService {
    constructor(
        @InjectRepository(HospitalEntity) private readonly hospitalRepository: Repository<HospitalEntity>,
    ) { }

    async createHospital(payload: CreateHospitalDto): Promise<HospitalEntity> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const newHospital = this.hospitalRepository.create(payload);
            const hospital = await queryrunner.manager.save(this.hospitalRepository.metadata.target, newHospital);
            await queryrunner.commitTransaction();
            return this.getHospitalById(hospital.id);
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }

    async getHospitalById(id: string): Promise<HospitalEntity> {
        try {
            const findHospital = this.hospitalRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!findHospital) {
                throw new HttpException('Hospital not found', HttpStatus.NOT_FOUND);
            }
            return findHospital;
        } catch (error) {
            throw error;
        }
    }

    async getAllHospital(payload: GetAllHospitalDto): Promise<HospitalEntity[]> {
        try {
            return await this.hospitalRepository.find({
                where: {
                    name: payload.name,
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

    async updateHospital(id: string, payload: UpdateHospitalDto): Promise<HospitalEntity> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const findHospital = await this.getHospitalById(id);
            if (!findHospital) {
                throw new HttpException('Hospital not found', HttpStatus.NOT_FOUND);
            }
            Object.assign(findHospital, payload);
            await queryrunner.manager.update(this.hospitalRepository.metadata.target, { id: id }, findHospital);
            await queryrunner.commitTransaction();
            return findHospital;
        } catch (error) {
            await queryrunner.commitTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }

    // async deleteHospital(id: string): Promise<any> {
    //     let queryrunner = AppDataSource.createQueryRunner();
    //     await queryrunner.connect();
    //     await queryrunner.startTransaction();
    //     try {
    //         const findHospital = this.hospitalRepository.findOne({
    //             where: {
    //                 id: id,
    //             },
    //         });
    //         if (!findHospital) {
    //             throw new HttpException('Hospital not found', HttpStatus.NOT_FOUND);
    //         }
    //         await queryrunner.manager.softDelete(this.hospitalRepository.metadata.target, { id: id });
    //         await queryrunner.commitTransaction();
    //         return findHospital;
    //     } catch (error) {
    //         await queryrunner.rollbackTransaction();
    //         throw error;
    //     } finally {
    //         await queryrunner.release();
    //     }
    // }
}
