import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { DoctorService } from '../services/doctor.service';
import { GetAllDoctorDto } from '../dtos/get-all-doctor.dto';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';
import { commonResponse } from 'src/utils/output-message-format';

@Controller('doctor')
export class DoctorController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
        private readonly doctorService: DoctorService,
    ) { }

    @EventPattern('getDoctorById')
    async getDoctorById(@Payload() id: string) {
        try {
            const res = await this.doctorService.getDoctorById(id);
            return commonResponse(true, 'Get doctor successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Get doctor failed', error);
        }
    }

    @EventPattern('getAllDoctor')
    async getAllDoctor(@Payload() payload: GetAllDoctorDto) {
        try {
            const res = await this.doctorService.getAllDoctor(payload);
            return commonResponse(true, 'Get all doctor successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Get all doctor failed', error);
        }
    }

    @EventPattern('updateDoctor')
    async updateDoctor(@Payload() payload: { id: string, data: UpdateDoctorDto }) {
        try {
            const { id, data } = payload;
            const res = await this.doctorService.updateDoctor(id, data);
            return commonResponse(true, 'Update doctor successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Update doctor failed', error);
        }
    }
}
