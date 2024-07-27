import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { HospitalAppointmentService } from '../services/hospital-appointment.service';
import { CreateHospitalAppointmentDto } from '../dtos/create-hospital-appointment.dto';
import { GetAllHospitalAppointmentDto } from '../dtos/get-all-hospital-appointment.dto';
import { UpdateHospitalAppointmentDto } from '../dtos/update-hospital-appointment.dto';

@Controller()
export class HospitalAppointmentController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
        private readonly hospitalAppointmentService: HospitalAppointmentService,
    ) { }

    @EventPattern('createHospitalAppointment')
    async createHospitalAppointment(@Payload() payload: CreateHospitalAppointmentDto) {
        try {
            const res = await this.hospitalAppointmentService.createHospitalAppointment(payload);
            if (res) {
                this.natsClient.emit('createHospitalAppointment', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('getHospitalAppointmentById')
    async getHospitalAppointmentById(@Payload() id: string) {
        try {
            const res = await this.hospitalAppointmentService.getHospitalAppointmentById(id);
            if (res) {
                this.natsClient.emit('getHospitalAppointmentById', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('getAllHospitalAppointment')
    async getAllHospitalAppointment(@Payload() payload: GetAllHospitalAppointmentDto) {
        try {
            const res = await this.hospitalAppointmentService.getAllHospitalAppointment(payload);
            if (res) {
                this.natsClient.emit('getAllHospitalAppointment', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('updateHospitalAppointment')
    async updateHospitalAppointment(@Payload() payload: { id: string, data: UpdateHospitalAppointmentDto }) {
        try {
            const { id, data } = payload;
            const res = await this.hospitalAppointmentService.updateHospitalAppointment(id, data);
            if (res) {
                this.natsClient.emit('updateHospitalAppointment', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('deleteHospitalAppointment')
    async deleteHospitalAppointment(@Payload() id: string) {
        try {
            const res = await this.hospitalAppointmentService.deleteHospitalAppointment(id);
            if (res) {
                this.natsClient.emit('deleteHospitalAppointment', res);
            }
        } catch (error) {
            throw error;
        }
    }
}