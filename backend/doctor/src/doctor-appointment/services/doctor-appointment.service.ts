import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorAppointmentEntity } from '../entities/doctor-appointment.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { CreateDoctorAppointmentDto } from '../dtos/create-doctor-appointment.dto';
import { GetAllDoctorAppointmentDto } from '../dtos/get-all-doctor-appointment.dto';
import { UpdateDoctorAppointmentDto } from '../dtos/update-doctor-appointment.dto';
import AppDataSource from 'src/data-source';

@Injectable()
export class DoctorAppointmentService {
    constructor(
        @InjectRepository(DoctorAppointmentEntity) private readonly doctorAppointmentRepository: Repository<DoctorAppointmentEntity>,
    ) { }

    async createDoctorAppointment(payload: CreateDoctorAppointmentDto): Promise<DoctorAppointmentEntity> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newDoctorAppointment = this.doctorAppointmentRepository.create({
                date: payload.date,
                time: payload.time,
                status: payload.status,
                patient: payload.patient as any,
                doctor: payload.doctor as any,
            });
            const doctorAppointment = await queryRunner.manager.save(this.doctorAppointmentRepository.metadata.target, newDoctorAppointment);
            await queryRunner.commitTransaction();
            return await this.getDoctorAppointmentById(doctorAppointment.id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getDoctorAppointmentById(id: string): Promise<DoctorAppointmentEntity> {
        try {
            const findDoctorAppointment = await this.doctorAppointmentRepository.findOne({
                where: { id },
                relations: {
                    patient: true,
                    doctor: true
                },
            });
            if (!findDoctorAppointment) {
                throw new HttpException('Doctor Appointment not found', HttpStatus.NOT_FOUND);
            }
            return findDoctorAppointment;
        } catch (error) {
            throw error;
        }
    }

    async getAllDoctorAppointment(payload: GetAllDoctorAppointmentDto): Promise<DoctorAppointmentEntity[]> {
        try {
            return await this.doctorAppointmentRepository.find({
                where: {
                    date: In(payload.dates),
                    status: In(payload.status),
                    patient: {
                        id: In(payload.patients),
                    },
                    doctor: {
                        id: In(payload.doctors),
                    },
                },
                relations: {
                    patient: true,
                    doctor: true
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

    async updateDoctorAppointment(id: string, payload: UpdateDoctorAppointmentDto): Promise<DoctorAppointmentEntity> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findAppointment = await this.getDoctorAppointmentById(id);
            if (!findAppointment) {
                throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
            }
            const { patient, doctor, ...data } = payload;
            Object.assign(findAppointment, data);
            if (patient) {
                findAppointment.patient = patient as any;
            }
            if (doctor) {
                findAppointment.doctor = doctor as any;
            }
            await queryRunner.manager.update(this.doctorAppointmentRepository.metadata.target, { id: id }, findAppointment);
            await queryRunner.commitTransaction();
            return await this.getDoctorAppointmentById(id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async deleteDoctorAppointment(id: string): Promise<any> {
        let queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const findAppointment = await this.getDoctorAppointmentById(id);
            if (!findAppointment) {
                throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
            }
            await queryRunner.manager.softDelete(this.doctorAppointmentRepository.metadata.target, { id: id });
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
