import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalAppointmentEntity } from '../entities/hospital-appointment.entity';
import { In, Repository } from 'typeorm';
import { CreateHospitalAppointmentDto } from '../dtos/create-hospital-appointment.dto';
import { GetAllHospitalAppointmentDto } from '../dtos/get-all-hospital-appointment.dto';
import { UpdateHospitalAppointmentDto } from '../dtos/update-hospital-appointment.dto';
import AppDataSource from 'src/data-source';

@Injectable()
export class HospitalAppointmentService {
    constructor(
        @InjectRepository(HospitalAppointmentEntity) private readonly hospitalAppointmentRepository: Repository<HospitalAppointmentEntity>,
    ) { }

    async createHospitalAppointment(payload: CreateHospitalAppointmentDto): Promise<HospitalAppointmentEntity> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newAppointment = this.hospitalAppointmentRepository.create({
                date: payload.date,
                time: payload.time,
                status: payload.status,
                patient: payload.patient as any,
                hospital: payload.hospital as any,
            });
            const appointment = await queryRunner.manager.save(this.hospitalAppointmentRepository.metadata.target, newAppointment);
            return this.getHospitalAppointmentById(appointment.id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getHospitalAppointmentById(id: string): Promise<HospitalAppointmentEntity> {
        try {
            const findAppointment = await this.hospitalAppointmentRepository.findOne({
                where: { id },
                relations: {
                    patient: true,
                    hospital: true
                },
            });

            if (!findAppointment) {
                throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
            }
            return findAppointment;
        } catch (error) {
            throw error;
        }
    }

    async getAllHospitalAppointment(payload: GetAllHospitalAppointmentDto): Promise<HospitalAppointmentEntity[]> {
        try {
            return await this.hospitalAppointmentRepository.find({
                where: {
                    date: In(payload.dates),
                    status: In(payload.status),
                    patient: {
                        id: In(payload.patients),
                    },
                    hospital: {
                        id: In(payload.hospitals),
                    },
                },
                relations: {
                    patient: true,
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

    async updateHospitalAppointment(id: string, payload: UpdateHospitalAppointmentDto): Promise<HospitalAppointmentEntity> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findAppointment = await this.hospitalAppointmentRepository.findOne({ where: { id } });
            if (!findAppointment) {
                throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
            }
            const { patient, hospital, ...data } = payload;
            Object.assign(findAppointment, data);
            if (patient) {
                findAppointment.patient = patient as any;
            }
            if (hospital) {
                findAppointment.hospital = hospital as any;
            }
            await queryRunner.manager.update(this.hospitalAppointmentRepository.metadata.target, { id: id }, findAppointment);
            await queryRunner.commitTransaction();
            return await this.getHospitalAppointmentById(id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async deleteHospitalAppointment(id: string): Promise<any> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findAppointment = await this.getHospitalAppointmentById(id);
            if (!findAppointment) {
                throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
            }
            await queryRunner.manager.softDelete(this.hospitalAppointmentRepository.metadata.target, { id: id });
            await queryRunner.commitTransaction();
            return findAppointment;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
