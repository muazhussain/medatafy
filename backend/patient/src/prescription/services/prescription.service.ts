import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PrescriptionEntity } from '../entities/prescription.entity';
import AppDataSource from 'src/data-source';
import { GetAllPrescriptionDto } from '../dtos/get-all-prescription.dto';

@Injectable()
export class PrescriptionService {
    constructor(
        @InjectRepository(PrescriptionEntity) private prescriptionRepository: Repository<PrescriptionEntity>,
    ) { }

    async getPrescriptionById(id: string): Promise<PrescriptionEntity> {
        try {
            const findPrescription = await this.prescriptionRepository.findOne({
                where: { id: id },
                relations: {
                    patient: true,
                    doctor: true,
                    medicinePrescriptionRelations: {
                        medicine: true,
                    },
                    medicalTestPrescriptionRelations: {
                        medicalTest: true
                    },
                },
            });
            if (!findPrescription) {
                throw new HttpException('Prescription not found', HttpStatus.NOT_FOUND);
            }
            return findPrescription;
        } catch (error) {
            throw error;
        }
    }

    async getAllPrescription(payload: GetAllPrescriptionDto): Promise<PrescriptionEntity[]> {
        try {
            return await this.prescriptionRepository.find({
                where: {
                    doctor: {
                        id: In(payload.doctors),
                    },
                    patient: {
                        id: In(payload.patients),
                    },
                    date: In(payload.dates),
                },
                relations: {
                    doctor: true,
                    patient: true,
                    medicinePrescriptionRelations: {
                        medicine: true,
                    },
                    medicalTestPrescriptionRelations: {
                        medicalTest: true,
                    },
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
    
    async deletePrescription(id: string): Promise<any> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findPrescription = await this.getPrescriptionById(id);
            if (!findPrescription) {
                throw new HttpException('Prescription not found', HttpStatus.NOT_FOUND);
            }
            await queryRunner.manager.softDelete(this.prescriptionRepository.metadata.target, { id: id });
            return findPrescription;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
