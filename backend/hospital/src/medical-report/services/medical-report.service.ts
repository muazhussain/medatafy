import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalReportEntity } from '../entities/medical-report.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { GetAllMedicalReportDto } from '../dtos/get-all-medical-report.dto';
import { UpdateMedicalReportDto } from '../dtos/update-medical-report.dto';
import { CreateMedicalReportDto } from '../dtos/create-medical-reprot.dto';
import AppDataSource from 'src/data-source';

@Injectable()
export class MedicalReportService {
    constructor(
        @InjectRepository(MedicalReportEntity) private medicalReportRepository: Repository<MedicalReportEntity>,
    ) { }

    async createMedicalReport(payload: CreateMedicalReportDto): Promise<MedicalReportEntity> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const newMedicalReport = this.medicalReportRepository.create({
                issueDate: payload.issueDate,
                deliveryDate: payload.deliveryDate,
                reportContent: payload.reportContent,
                summary: payload.summary,
                medicalTest: payload.medicalTest as any,
                patient: payload.patient as any,
                doctor: payload.doctor as any,
                hospital: payload.hospital as any,
            });
            const medicalReport = await queryrunner.manager.save(this.medicalReportRepository.metadata.target, newMedicalReport);
            await queryrunner.commitTransaction();
            return this.getMedicalReportById(medicalReport.id);
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }

    async getMedicalReportById(id: string): Promise<MedicalReportEntity> {
        try {
            const findMedicalReport = await this.medicalReportRepository.findOne({
                where: { id: id },
                relations: {
                    medicalTest: true,
                    patient: true,
                    doctor: true,
                    hospital: true
                },
            });
            if (!findMedicalReport) {
                throw new HttpException('Medical report not found', HttpStatus.NOT_FOUND);
            }
            return findMedicalReport;
        } catch (error) {
            throw error;
        }
    }

    async getAllMedicalReport(payload: GetAllMedicalReportDto): Promise<MedicalReportEntity[]> {
        try {
            return await this.medicalReportRepository.find({
                where: {
                    medicalTest: {
                        id: In(payload.medicalTests),
                    },
                    patient: {
                        id: In(payload.patients),
                    },
                    doctor: {
                        id: In(payload.doctors),
                    },
                    hospital: {
                        id: In(payload.hospitals),
                    },
                },
                relations: {
                    medicalTest: true,
                    patient: true,
                    doctor: true,
                    hospital: true
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

    async updateMedicalReport(id: string, payload: UpdateMedicalReportDto): Promise<MedicalReportEntity> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const findMedicalReport = await this.getMedicalReportById(id);
            if (!findMedicalReport) {
                throw new HttpException('Medical report not found', HttpStatus.NOT_FOUND);
            }
            const { medicalTest, doctor, hospital, ...data } = payload;
            Object.assign(findMedicalReport, data);
            if (medicalTest) {
                findMedicalReport.medicalTest = medicalTest as any;
            }
            if (doctor) {
                findMedicalReport.doctor = doctor as any;
            }
            if (hospital) {
                findMedicalReport.hospital = hospital as any;
            }
            await queryrunner.manager.update(this.medicalReportRepository.metadata.target, { id: id }, findMedicalReport);
            await queryrunner.commitTransaction();
            return await this.getMedicalReportById(id);
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }

    async deleteMedicalReport(id: string): Promise<any> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const findMedicalReport = await this.getMedicalReportById(id);
            if (!findMedicalReport) {
                throw new HttpException('Medical report not found', HttpStatus.NOT_FOUND);
            }
            await queryrunner.manager.softDelete(this.medicalReportRepository.metadata.target, { id: id });
            await queryrunner.commitTransaction();
            return findMedicalReport;
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }
}