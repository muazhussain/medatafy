import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorAppointmentEntity } from '../entities/doctor-appointment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateDoctorAppointmentDto } from '../dtos/create-doctor-appointment.dto';
import { GetAllDoctorAppointmentDto } from '../dtos/get-all-doctor-appointment.dto';
import { UpdateDoctorAppointmentDto } from '../dtos/update-doctor-appointment.dto';

@Injectable()
export class DoctorAppointmentService {
    constructor(
        @InjectRepository(DoctorAppointmentEntity) private doctorAppointmentRepository: Repository<DoctorAppointmentEntity>,
    ) { }

    async createDoctorAppointment(payload: CreateDoctorAppointmentDto): Promise<DoctorAppointmentEntity> {
        try {
            if (payload.status != 'pending' && payload.status != 'completed' && payload.status != 'cancelled') {
                throw new Error('Invalid status');
            }
            const newAppointment = this.doctorAppointmentRepository.create({
                appointmentTime: payload.appointmentTime,
                status: payload.status,
                patient: payload.patient as any,
                doctor: payload.doctor as any,
            });
            return await this.doctorAppointmentRepository.save(newAppointment);
        } catch (error) {
            throw error;
        }
    }

    async getDoctorAppointmentById(id: string): Promise<DoctorAppointmentEntity> {
        try {
            return await this.doctorAppointmentRepository.findOne({
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

    async getAllDoctorAppointment(payload: GetAllDoctorAppointmentDto): Promise<DoctorAppointmentEntity[]> {
        try {
            if (payload.status != 'pending' && payload.status != 'completed' && payload.status != 'cancelled') {
                throw new Error('Invalid status');
            }
            return await this.doctorAppointmentRepository.find({
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

    async updateDoctorAppointment(id: string, payload: UpdateDoctorAppointmentDto): Promise<DoctorAppointmentEntity> {
        try {
            const findAppointment = await this.getDoctorAppointmentById(id);
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
            await this.doctorAppointmentRepository.update({ id }, findAppointment);
            return await this.getDoctorAppointmentById(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteDoctorAppointment(id: string): Promise<DeleteResult> {
        try {
            const findAppointment = await this.getDoctorAppointmentById(id);
            if (!findAppointment) {
                throw new Error('Appointment not found');
            }
            return await this.doctorAppointmentRepository.softDelete({ id });
        } catch (error) {
            throw error;
        }
    }
}
