import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalEntity } from '../entities/hospital.entity';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';
import { UpdateHospitalDto } from '../dtos/update-hospital.dto';
import { DeleteResult, Repository } from 'typeorm';
import { GetAllHospitalDto } from '../dtos/get-all-hospital.dto';

@Injectable()
export class HospitalService {
    constructor(
        @InjectRepository(HospitalEntity) private readonly hospitalRepository: Repository<HospitalEntity>,
    ) { }

    async createHospital(payload: CreateHospitalDto): Promise<HospitalEntity> {
        try {
            const newHospital = this.hospitalRepository.create(payload);
            return await this.hospitalRepository.save(newHospital);
        } catch (error) {
            throw error;
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
                throw new Error('Hospital not found');
            }
            return findHospital;
        } catch (error) {
            throw error;
        }
    }

    async getAllHospital(payload: GetAllHospitalDto): Promise<HospitalEntity[]> {
        try {
            return await this.hospitalRepository.find({
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
        try {
            const hospital = await this.getHospitalById(id);
            Object.assign(hospital, payload);
            await this.hospitalRepository.update({ id }, hospital);
            return hospital;
        } catch (error) {
            throw error;
        }
    }

    async deleteHospital(id: string): Promise<DeleteResult> {
        try {
            return await this.hospitalRepository.softDelete({ id });
        } catch (error) {
            throw error;
        }
    }
}
