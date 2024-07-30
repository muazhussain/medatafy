import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { DoctorService } from '../services/doctor.service';
import { GetAllDoctorDto } from '../dtos/get-all-doctor.dto';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';
import { commonResponse } from 'src/utils/output-message-format';

@Controller()
export class DoctorMicroserviceController {
    constructor(
        private readonly doctorService: DoctorService,
    ) { }

    @MessagePattern({ cmd: 'getDoctorById' })
    async getDoctorById(@Payload() id: string) {
        try {
            const res = await this.doctorService.getDoctorById(id);
            return commonResponse(true, 'Get doctor successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Get doctor failed', error);
        }
    }

    @MessagePattern({ cmd: 'getAllDoctor' })
    async getAllDoctor(@Payload() payload: GetAllDoctorDto) {
        try {
            const res = await this.doctorService.getAllDoctor(payload);
            return commonResponse(true, 'Get all doctor successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Get all doctor failed', error);
        }
    }

    @MessagePattern({ cmd: 'updateDoctor' })
    async updateDoctor(@Payload() payload: { id: string, data: UpdateDoctorDto }) {
        try {
            const res = await this.doctorService.updateDoctor(payload.id, payload.data);
            return commonResponse(true, 'Update doctor successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Update doctor failed', error);
        }
    }
}
