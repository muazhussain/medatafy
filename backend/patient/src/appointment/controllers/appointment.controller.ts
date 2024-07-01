import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { AppointmentService } from '../services/appointment.service';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';
import { GetAllAppointmentDto } from '../dtos/get-all-appointment.dto';
import { UpdateAppointmentDto } from '../dtos/update-appointment.dto';

@Controller()
export class AppointmentController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
        private readonly appointmentService: AppointmentService,
    ) { }

    @EventPattern('createAppointment')
    async createAppointment(@Payload() payload: CreateAppointmentDto) {
        try {
            const res = await this.appointmentService.createAppointment(payload);
            if (res) {
                this.natsClient.emit('createAppointment', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('getAppointmentById')
    async getAppointmentById(@Payload() id: string) {
        try {
            const res = await this.appointmentService.getAppointmentById(id);
            if (res) {
                this.natsClient.emit('getAppointmentById', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('getAllAppointment')
    async getAllAppointment(@Payload() payload: GetAllAppointmentDto) {
        try {
            const res = await this.appointmentService.getAllAppointment(payload);
            if (res) {
                this.natsClient.emit('getAllAppointment', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('updateAppointment')
    async updateAppointment(@Payload() payload: { id: string, data: UpdateAppointmentDto }) {
        try {
            const { id, data } = payload;
            const res = await this.appointmentService.updateAppointment(id, data);
            if (res) {
                this.natsClient.emit('updateAppointment', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('deleteAppointment')
    async deleteAppointment(@Payload() id: string) {
        try {
            const res = await this.appointmentService.deleteAppointment(id);
            if (res) {
                this.natsClient.emit('deleteAppointment', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
