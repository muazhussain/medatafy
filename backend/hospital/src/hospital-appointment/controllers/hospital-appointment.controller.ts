import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { HospitalAppointmentService } from '../services/hospital-appointment.service';
import { CreateHospitalAppointmentDto } from '../dtos/create-hospital-appointment.dto';
import { GetAllHospitalAppointmentDto } from '../dtos/get-all-hospital-appointment.dto';
import { UpdateHospitalAppointmentDto } from '../dtos/update-hospital-appointment.dto';
import { commonResponse } from 'src/utils/output-message-format';

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
            return commonResponse(true, 'Hospital appointment created successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital appointment creation failed', error);
        }
    }

    @EventPattern('getHospitalAppointmentById')
    async getHospitalAppointmentById(@Payload() id: string) {
        try {
            const res = await this.hospitalAppointmentService.getHospitalAppointmentById(id);
            return commonResponse(true, 'Hospital appointment fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital appointment fetch failed', error);
        }
    }

    @EventPattern('getAllHospitalAppointment')
    async getAllHospitalAppointment(@Payload() payload: GetAllHospitalAppointmentDto) {
        try {
            const res = await this.hospitalAppointmentService.getAllHospitalAppointment(payload);
            return commonResponse(true, 'Hospital appointment fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital appointment fetch failed', error);
        }
    }

    @EventPattern('updateHospitalAppointment')
    async updateHospitalAppointment(@Payload() payload: { id: string, data: UpdateHospitalAppointmentDto }) {
        try {
            const { id, data } = payload;
            const res = await this.hospitalAppointmentService.updateHospitalAppointment(id, data);
            return commonResponse(true, 'Hospital appointment updated successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital appointment update failed', error);
        }
    }

    @EventPattern('deleteHospitalAppointment')
    async deleteHospitalAppointment(@Payload() id: string) {
        try {
            const res = await this.hospitalAppointmentService.deleteHospitalAppointment(id);
            return commonResponse(true, 'Hospital appointment deleted successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital appointment delete failed', error);
        }
    }
}