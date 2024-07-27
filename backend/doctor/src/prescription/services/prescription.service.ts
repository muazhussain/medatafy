import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { MedicinePrescriptionRelationEntity } from 'src/other-entities/medicine-prescription-relation.entity';
import { MedicalTestPrescriptionRelationEntity } from 'src/other-entities/medical-test-prescription-relation.entity';
import { CreatePrescriptionDto } from '../dtos/create-prescription.dto';
import AppDataSource from 'src/data-source';
import { PrescriptionEntity } from '../entities/prescription.entity';
import { GetAllPrescriptionDto } from '../dtos/get-all-prescription.dto';
import { UpdatePrescriptionDto } from '../dtos/update-prescription.dto';

@Injectable()
export class PrescriptionService {
    constructor(
        @InjectRepository(PrescriptionEntity) private prescriptionRepository: Repository<PrescriptionEntity>,
        @InjectRepository(MedicinePrescriptionRelationEntity) private medicinePrescriptionRelationRepository: Repository<MedicinePrescriptionRelationEntity>,
        @InjectRepository(MedicalTestPrescriptionRelationEntity) private medicalTestPrescriptionRelationRepository: Repository<MedicalTestPrescriptionRelationEntity>,
    ) { }

    async createPrescription(payload: CreatePrescriptionDto): Promise<any> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const newPrescription = this.prescriptionRepository.create({
                date: payload.date,
                chiefComplaints: payload.chiefComplaints,
                advice: payload.advice,
                followUp: payload.followUp,
                doctor: payload.doctor as any,
                patient: payload.patient as any,
            });
            const savedPrescription = await queryRunner.manager.save(this.prescriptionRepository.metadata.target, newPrescription);

            if (payload.medicines) {
                const prescribedMedicines = payload.medicines.map(item => {
                    return this.medicinePrescriptionRelationRepository.create({
                        prescription: savedPrescription,
                        medicine: item.medicine as any,
                        instruction: item.instruction,
                    });
                });
                await queryRunner.manager.save(this.medicinePrescriptionRelationRepository.metadata.target, prescribedMedicines);
            }

            if (payload.medicalTests) {
                const prescribedMedicalTests = payload.medicalTests.map(item => {
                    return this.medicalTestPrescriptionRelationRepository.create({
                        prescription: savedPrescription,
                        medicalTest: item.medicalTest as any,
                        instruction: item.instruction,
                    });
                });
                await queryRunner.manager.save(this.medicalTestPrescriptionRelationRepository.metadata.target, prescribedMedicalTests);
            }
            await queryRunner.commitTransaction();
            return await this.getPrescriptionById(savedPrescription.id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getPrescriptionById(id: string): Promise<PrescriptionEntity> {
        try {
            const findPrescription = await this.prescriptionRepository.findOne({
                where: { id },
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
            });
            if (!findPrescription) {
                throw new HttpException('Prescription not found', HttpStatus.BAD_REQUEST);
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

    async updatePrescription(id: string, payload: UpdatePrescriptionDto): Promise<PrescriptionEntity> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findPrescription = await this.getPrescriptionById(id);
            if (!findPrescription) {
                throw new HttpException('Prescription not found', HttpStatus.NOT_FOUND);
            }
            const { doctor, patient, ...data } = payload;
            Object.assign(findPrescription, data);
            if (doctor) {
                findPrescription.doctor = doctor as any;
            }
            if (patient) {
                findPrescription.patient = patient as any;
            }
            await queryRunner.manager.save(this.prescriptionRepository.metadata.target, findPrescription);

            if (payload.medicines) {
                await queryRunner.manager.delete(this.medicinePrescriptionRelationRepository.metadata.target, { prescription: { id } });
                const prescribedMedicines = payload.medicines.map(item => {
                    return this.medicinePrescriptionRelationRepository.create({
                        prescription: findPrescription,
                        medicine: item.medicine as any,
                        instruction: item.instruction,
                    });
                });
                await queryRunner.manager.save(this.medicinePrescriptionRelationRepository.metadata.target, prescribedMedicines);
            }

            if (payload.medicalTests) {
                await queryRunner.manager.delete(this.medicalTestPrescriptionRelationRepository.metadata.target, { prescription: { id } });
                const prescribedMedicalTests = payload.medicalTests.map(item => {
                    return this.medicalTestPrescriptionRelationRepository.create({
                        prescription: findPrescription,
                        medicalTest: item.medicalTest as any,
                        instruction: item.instruction,
                    });
                });
                await queryRunner.manager.save(this.medicalTestPrescriptionRelationRepository.metadata.target, prescribedMedicalTests);
            }

            await queryRunner.commitTransaction();
            return await this.getPrescriptionById(id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async deletePrescription(id: string): Promise<DeleteResult> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findPrescription = await this.getPrescriptionById(id);
            if (!findPrescription) {
                throw new HttpException('Prescription not found', HttpStatus.NOT_FOUND);
            }
            return await queryRunner.manager.softDelete(this.prescriptionRepository.metadata.target, { id: id });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
