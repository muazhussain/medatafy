import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { DoctorAppointmentService } from '../services/doctor-appointment.service';
import { CreateDoctorAppointmentDto } from '../dtos/create-doctor-appointment.dto';
import { GetAllDoctorAppointmentDto } from '../dtos/get-all-doctor-appointment.dto';
import { UpdateDoctorAppointmentDto } from '../dtos/update-doctor-appointment.dto';

@Controller()
export class DoctorAppointmentController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
        private readonly doctorAppointmentService: DoctorAppointmentService,
    ) { }

    @EventPattern('createDoctorAppointment')
    async createAppointment(@Payload() payload: CreateDoctorAppointmentDto) {
        try {
            const res = await this.doctorAppointmentService.createDoctorAppointment(payload);
            if (res) {
                this.natsClient.emit('createDoctorAppointment', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('getDoctorAppointmentById')
    async getAppointmentById(@Payload() id: string) {
        try {
            const res = await this.doctorAppointmentService.getDoctorAppointmentById(id);
            if (res) {
                this.natsClient.emit('getDoctorAppointmentById', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('getAllDoctorAppointment')
    async getAllAppointment(@Payload() payload: GetAllDoctorAppointmentDto) {
        try {
            const res = await this.doctorAppointmentService.getAllDoctorAppointment(payload);
            if (res) {
                this.natsClient.emit('getAllDoctorAppointment', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('updateDoctorAppointment')
    async updateAppointment(@Payload() payload: { id: string, data: UpdateDoctorAppointmentDto }) {
        try {
            const { id, data } = payload;
            const res = await this.doctorAppointmentService.updateDoctorAppointment(id, data);
            if (res) {
                this.natsClient.emit('updateDoctorAppointment', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('deleteDoctorAppointment')
    async deleteAppointment(@Payload() id: string) {
        try {
            const res = await this.doctorAppointmentService.deleteDoctorAppointment(id);
            if (res) {
                this.natsClient.emit('deleteDoctorAppointment', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
