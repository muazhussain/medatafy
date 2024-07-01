import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from '../entities/appointment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';
import { GetAllAppointmentDto } from '../dtos/get-all-appointment.dto';
import { UpdateAppointmentDto } from '../dtos/update-appointment.dto';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(AppointmentEntity) private appointmentRepository: Repository<AppointmentEntity>,
    ) { }

    async createAppointment(payload: CreateAppointmentDto): Promise<AppointmentEntity> {
        try {
            if (payload.status != 'pending' && payload.status != 'completed' && payload.status != 'cancelled') {
                throw new Error('Invalid status');
            }
            const newAppointment = this.appointmentRepository.create({
                appointmentTime: payload.appointmentTime,
                status: payload.status,
                patient: payload.patient as any,
                doctor: payload.doctor as any,
            });
            return await this.appointmentRepository.save(newAppointment);
        } catch (error) {
            throw error;
        }
    }

    async getAppointmentById(id: string): Promise<AppointmentEntity> {
        try {
            return await this.appointmentRepository.findOne({
                where: { id },
                relations: {
                    patient: true,
                    doctor: true
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getAllAppointment(payload: GetAllAppointmentDto): Promise<AppointmentEntity[]> {
        try {
            if (payload.status != 'pending' && payload.status != 'completed' && payload.status != 'cancelled') {
                throw new Error('Invalid status');
            }
            return await this.appointmentRepository.find({
                where: {
                    appointmentTime: payload.date,
                    status: payload.status,
                    patient: {
                        id: payload.patient,
                    },
                    doctor: {
                        id: payload.doctor,
                    },
                },
                relations: {
                    patient: true,
                    doctor: true
                },
                take: Math.max(payload.take, 0),
                skip: (Math.max(payload.page, 1) - 1) * Math.max(payload.take, 0),
            });
        } catch (error) {
            throw error;
        }
    }

    async updateAppointment(id: string, payload: UpdateAppointmentDto): Promise<AppointmentEntity> {
        try {
            const findAppointment = await this.getAppointmentById(id);
            if (!findAppointment) {
                throw new Error('Appointment not found');
            }
            const { patient, doctor, ...data } = payload;
            Object.assign(findAppointment, data);
            if (patient) {
                findAppointment.patient = patient as any;
            }
            if (doctor) {
                findAppointment.doctor = doctor as any;
            }
            await this.appointmentRepository.update({ id }, findAppointment);
            return await this.getAppointmentById(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteAppointment(id: string): Promise<DeleteResult> {
        try {
            const findAppointment = await this.getAppointmentById(id);
            if (!findAppointment) {
                throw new Error('Appointment not found');
            }
            return await this.appointmentRepository.softDelete({ id });
        } catch (error) {
            throw error;
        }
    }
}
