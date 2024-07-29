import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateDoctorAppointmentDto } from '../dtos/create-doctor-appointment.dto';
import { GetAllDoctorAppointmentDto } from '../dtos/get-all-doctor-appointment.dto';
import { UpdateDoctorAppointmentDto } from '../dtos/update-doctor-appointment.dto';
import { DoctorAppointmentService } from '../services/doctor-appointment.service';
import { commonResponse } from 'src/utils/output-message-format';

@Controller()
export class DoctorAppointmentController {
    constructor(
        private readonly doctorAppointmentService: DoctorAppointmentService,
    ) { }

    @EventPattern('createDoctorAppointment')
    async createAppointment(@Payload() payload: CreateDoctorAppointmentDto) {
        try {
            const res = await this.doctorAppointmentService.createDoctorAppointment(payload);
            return commonResponse(true, 'Create doctor appointment successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Create doctor appointment failed', error);
        }
    }

    @EventPattern('getDoctorAppointmentById')
    async getAppointmentById(@Payload() id: string) {
        try {
            const res = await this.doctorAppointmentService.getDoctorAppointmentById(id);
            return commonResponse(true, 'Get doctor appointment successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Get doctor appointment failed', error);
        }
    }

    @EventPattern('getAllDoctorAppointment')
    async getAllAppointment(@Payload() payload: GetAllDoctorAppointmentDto) {
        try {
            const res = await this.doctorAppointmentService.getAllDoctorAppointment(payload);
            return commonResponse(true, 'Get all doctor appointment successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Get all doctor appointment failed', error);
        }
    }

    @EventPattern('updateDoctorAppointment')
    async updateAppointment(@Payload() payload: { id: string, data: UpdateDoctorAppointmentDto }) {
        try {
            const { id, data } = payload;
            const res = await this.doctorAppointmentService.updateDoctorAppointment(id, data);
            return commonResponse(true, 'Update doctor appointment successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Update doctor appointment failed', error);
        }
    }

    @EventPattern('deleteDoctorAppointment')
    async deleteAppointment(@Payload() id: string) {
        try {
            const res = await this.doctorAppointmentService.deleteDoctorAppointment(id);
            return commonResponse(true, 'Delete doctor appointment successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Delete doctor appointment failed', error);
        }
    }
}
