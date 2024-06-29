import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalTestEntity } from '../entities/medical-test.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTestDto } from '../dtos/create-medical-test.dto';
import { GetAllTestDto } from '../dtos/get-all-medical-test.dto';
import { UpdateMedicalTestDto } from '../dtos/update-medical-test.dto';

@Injectable()
export class MedicalTestService {
    constructor(
        @InjectRepository(MedicalTestEntity) private readonly testRepository: Repository<MedicalTestEntity>,
    ) { }

    async createMedicalTest(payload: CreateTestDto): Promise<MedicalTestEntity> {
        try {
            if (payload.testType != 'lab' && payload.testType != 'imaging' && payload.testType != 'other') {
                throw new Error('Invalid test type');
            }
            const newTest = this.testRepository.create({
                testName: payload.testName,
                testType: payload.testType,
                cost: payload.cost,
                hospital: payload.hospital as any,
            });
            return await this.testRepository.save(newTest);
        } catch (error) {
            throw error;
        }
    }

    async getMedicalTestById(id: string): Promise<MedicalTestEntity> {
        try {
            const findTest = this.testRepository.findOne({
                where: {
                    id: id,
                },
                relations: {
                    hospital: true,
                },
            });
            if (!findTest) {
                throw new Error('Test not found');
            }
            return findTest;
        } catch (error) {
            throw error;
        }
    }

    async getAllMedicalTest(payload: GetAllTestDto): Promise<MedicalTestEntity[]> {
        try {
            return await this.testRepository.find({
                where: {
                    hospital: {
                        id: payload.hospital,
                    },
                },
                relations: {
                    hospital: true,
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

    async updateMedicalTest(id: string, payload: UpdateMedicalTestDto): Promise<MedicalTestEntity> {
        try {
            const test = await this.getMedicalTestById(id);
            if (payload.testType != null && payload.testType != 'lab' && payload.testType != 'imaging' && payload.testType != 'other') {
                throw new Error('Invalid test type');
            }
            Object.assign(test, payload);
            await this.testRepository.update({ id }, test);
            return test;
        } catch (error) {
            throw error;
        }
    }

    async deleteMedicalTest(id: string): Promise<DeleteResult> {
        try {
            const findTest = await this.getMedicalTestById(id);
            if (!findTest) {
                throw new Error('Test not found');
            }
            return await this.testRepository.softDelete({ id });
        } catch (error) {
            throw error;
        }
    }
}
