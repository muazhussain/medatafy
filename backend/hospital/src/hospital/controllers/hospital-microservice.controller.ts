import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HospitalService } from '../services/hospital.service';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';
import { GetAllHospitalDto } from '../dtos/get-all-hospital.dto';
import { UpdateHospitalDto } from '../dtos/update-hospital.dto';
import { commonResponse } from 'src/utils/output-message-format';

@Controller()
export class HospitalMicroserviceController {
    constructor(
        private readonly hospitalService: HospitalService,
    ) { }

    @MessagePattern({ cmd: 'createHospital' })
    async createHospital(@Payload() payload: CreateHospitalDto) {
        try {
            const res = await this.hospitalService.createHospital(payload);
            return commonResponse(true, 'Hospital created successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital creation failed', error);
        }
    }

    @MessagePattern({ cmd: 'getHospitalById' })
    async getHospitalById(@Payload() id: string) {
        try {
            const res = await this.hospitalService.getHospitalById(id);
            return commonResponse(true, 'Hospital fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital fetch failed', error);
        }
    }

    @MessagePattern({ cmd: 'getAllHospital' })
    async getAllHospital(@Payload() payload: GetAllHospitalDto) {
        try {
            const res = await this.hospitalService.getAllHospital(payload);
            return commonResponse(true, 'Hospital fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital fetch failed', error);
        }
    }

    @MessagePattern({ cmd: 'updateHospital' })
    async updateHospital(@Payload() payload: { id: string; data: UpdateHospitalDto }) {
        try {
            const res = await this.hospitalService.updateHospital(payload.id, payload.data);
            return commonResponse(true, 'Hospital updated successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital update failed', error);
        }
    }
}
