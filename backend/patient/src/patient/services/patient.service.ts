import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from '../entities/patient.entity';
import { Repository } from 'typeorm';
import { UpdatePatientDto } from '../dtos/update-patient.dto';
import AppDataSource from 'src/data-source';
import { GetAllPatientDto } from '../dtos/get-all-patient.dto';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(PatientEntity) private readonly patientRepository: Repository<PatientEntity>,
    ) { }

    async getPatientById(id: string): Promise<PatientEntity> {
        try {
            const findPatient = await this.patientRepository.findOne({
                where: { id: id },
                relations: {
                    user: true,
                },
            });
            if (!findPatient) {
                throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
            }
            return findPatient;
        } catch (error) {
            throw error;
        }
    }

    async getAllPatient(payload: GetAllPatientDto): Promise<PatientEntity[]> {
        try {
            return await this.patientRepository.find({
                where: {
                    gender: payload.gender,
                },
                relations: {
                    user: true,
                },
                take: Math.max(payload.take, 0),
                skip: (Math.max(payload.page, 1) - 1) * Math.max(payload.take, 0),
            });
        } catch (error) {
            throw error;
        }
    }

    async updatePatient(id: string, payload: UpdatePatientDto): Promise<PatientEntity> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const findPatient = await this.patientRepository.findOneBy({ id: id });
            if (!findPatient) {
                throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
            }
            Object.assign(findPatient, payload);
            await queryrunner.manager.update(this.patientRepository.metadata.target, { id }, findPatient);
            await queryrunner.commitTransaction();
            return findPatient;
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }
}
