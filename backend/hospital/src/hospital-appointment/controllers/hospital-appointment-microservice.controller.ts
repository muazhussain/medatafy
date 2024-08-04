import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HospitalAppointmentService } from '../services/hospital-appointment.service';
import { CreateHospitalAppointmentDto } from '../dtos/create-hospital-appointment.dto';
import { GetAllHospitalAppointmentDto } from '../dtos/get-all-hospital-appointment.dto';
import { UpdateHospitalAppointmentDto } from '../dtos/update-hospital-appointment.dto';
import { commonResponse } from 'src/utils/output-message-format';

@Controller()
export class HospitalAppointmentMicroserviceController {
    constructor(
        private readonly hospitalAppointmentService: HospitalAppointmentService,
    ) { }

    @MessagePattern({ cmd: 'createHospitalAppointment' })
    async createHospitalAppointment(@Payload() payload: CreateHospitalAppointmentDto) {
        try {
            const res = await this.hospitalAppointmentService.createHospitalAppointment(payload);
            return commonResponse(true, 'Hospital appointment created successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital appointment creation failed', error);
        }
    }

    @MessagePattern({ cmd: 'getHospitalAppointmentById' })
    async getHospitalAppointmentById(@Payload() id: string) {
        try {
            const res = await this.hospitalAppointmentService.getHospitalAppointmentById(id);
            return commonResponse(true, 'Hospital appointment fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital appointment fetch failed', error);
        }
    }

    @MessagePattern({ cmd: 'getAllHospitalAppointment' })
    async getAllHospitalAppointment(@Payload() payload: GetAllHospitalAppointmentDto) {
        try {
            const res = await this.hospitalAppointmentService.getAllHospitalAppointment(payload);
            return commonResponse(true, 'Hospital appointment fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital appointment fetch failed', error);
        }
    }

    @MessagePattern({ cmd: 'updateHospitalAppointment' })
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

    @MessagePattern({ cmd: 'deleteHospitalAppointment' })
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