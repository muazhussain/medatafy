import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalReportEntity } from '../entities/medical-report.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMedicalReportDto } from '../dtos/create-medical-reprot.dto';
import { GetAllMedicalReportDto } from '../dtos/get-all-medical-report.dto';
import { UpdateMedicalReportDto } from '../dtos/update-medical-report.dto';

@Injectable()
export class MedicalReportService {
    constructor(
        @InjectRepository(MedicalReportEntity) private medicalReportRepository: Repository<MedicalReportEntity>,
    ) { }

    async createMedicalReport(payload: CreateMedicalReportDto): Promise<MedicalReportEntity> {
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
            return await this.medicalReportRepository.save(newMedicalReport);
        } catch (error) {
            throw error;
        }
    }

    async getMedicalReportById(id: string): Promise<MedicalReportEntity> {
        try {
            return await this.medicalReportRepository.findOne({
                where: { id },
                relations: {
                    medicalTest: true,
                    patient: true,
                    doctor: true,
                    hospital: true
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getAllMedicalReport(payload: GetAllMedicalReportDto): Promise<MedicalReportEntity[]> {
        try {
            return await this.medicalReportRepository.find({
                where: {
                    medicalTest: {
                        id: payload.medicalTest,
                    },
                    patient: {
                        id: payload.patient,
                    },
                    doctor: {
                        id: payload.doctor,
                    },
                    hospital: {
                        id: payload.hospital,
                    },
                },
                relations: {
                    medicalTest: true,
                    patient: true,
                    doctor: true,
                    hospital: true
                },
                take: Math.max(payload.take, 0),
                skip: (Math.max(payload.page, 1) - 1) * Math.max(payload.take, 0),
            });
        } catch (error) {
            throw error;
        }
    }

    async updateMedicalReport(id: string, payload: UpdateMedicalReportDto): Promise<MedicalReportEntity> {
        try {
            const findMedicalReport = await this.getMedicalReportById(id);
            if (!findMedicalReport) {
                throw new Error('Medical report not found');
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
            await this.medicalReportRepository.update({ id }, findMedicalReport);
            return await this.getMedicalReportById(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteMedicalReport(id: string): Promise<DeleteResult> {
        try {
            const findMedicalReport = await this.getMedicalReportById(id);
            if (!findMedicalReport) {
                throw new Error('Medical report not found');
            }
            return await this.medicalReportRepository.softDelete({ id });
        } catch (error) {
            throw error;
        }
    }
}