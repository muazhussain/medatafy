import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalTestEntity } from '../entities/medical-test.entity';
import { In, Repository } from 'typeorm';
import { CreateMedicalTestDto } from '../dtos/create-medical-test.dto';
import { GetAllMedicalTestDto } from '../dtos/get-all-medical-test.dto';
import { UpdateMedicalTestDto } from '../dtos/update-medical-test.dto';
import AppDataSource from 'src/data-source';

@Injectable()
export class MedicalTestService {
    constructor(
        @InjectRepository(MedicalTestEntity) private readonly testRepository: Repository<MedicalTestEntity>,
    ) { }

    async createMedicalTest(payload: CreateMedicalTestDto): Promise<MedicalTestEntity> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const newTest = this.testRepository.create({
                testName: payload.testName,
                testType: payload.testType,
                cost: payload.cost,
                hospital: payload.hospital as any,
            });
            const savedTest = await queryrunner.manager.save(this.testRepository.metadata.target, newTest);
            await queryrunner.commitTransaction();
            return this.getMedicalTestById(savedTest.id);
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
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
                throw new HttpException('Test not found', HttpStatus.NOT_FOUND);
            }
            return findTest;
        } catch (error) {
            throw error;
        }
    }

    async getAllMedicalTest(payload: GetAllMedicalTestDto): Promise<MedicalTestEntity[]> {
        try {
            return await this.testRepository.find({
                where: {
                    testType: In(payload.testTypes),
                    hospital: {
                        id: In(payload.hospitals),
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
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const findTest = await this.getMedicalTestById(id);
            if (!findTest) {
                throw new HttpException('Test not found', HttpStatus.NOT_FOUND);
            }
            Object.assign(findTest, payload);
            await queryrunner.manager.update(this.testRepository.metadata.target, { id: id }, findTest);
            await queryrunner.commitTransaction();
            return this.getMedicalTestById(id);
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }

    async deleteMedicalTest(id: string): Promise<any> {
        let queryrunner = AppDataSource.createQueryRunner();
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try {
            const findTest = await this.getMedicalTestById(id);
            if (!findTest) {
                throw new Error('Test not found');
            }
            await queryrunner.manager.softDelete(this.testRepository.metadata.target, { id: id });
            await queryrunner.commitTransaction();
            return findTest;
        } catch (error) {
            await queryrunner.rollbackTransaction();
            throw error;
        } finally {
            await queryrunner.release();
        }
    }
}
