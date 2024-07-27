import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { HospitalService } from '../services/hospital.service';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';
import { GetAllHospitalDto } from '../dtos/get-all-hospital.dto';
import { UpdateHospitalDto } from '../dtos/update-hospital.dto';
import { commonResponse } from 'src/utils/output-message-format';

@Controller()
export class HospitalController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
        private readonly hospitalService: HospitalService,
    ) { }

    @EventPattern('createHospital')
    async createHospital(@Payload() payload: CreateHospitalDto) {
        try {
            const res = await this.hospitalService.createHospital(payload);
            return commonResponse(true, 'Hospital created successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital creation failed', error);
        }
    }

    @EventPattern('getHospitalById')
    async getHospitalById(@Payload() payload: string) {
        try {
            const res = await this.hospitalService.getHospitalById(payload);
            return commonResponse(true, 'Hospital fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital fetch failed', error);
        }
    }

    @EventPattern('getAllHospital')
    async getAllHospital(@Payload() payload: GetAllHospitalDto) {
        try {
            const res = await this.hospitalService.getAllHospital(payload);
            return commonResponse(true, 'Hospital fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital fetch failed', error);
        }
    }

    @EventPattern('updateHospital')
    async updateHospital(@Payload() payload: { id: string; data: UpdateHospitalDto }) {
        try {
            const { id, data } = payload;
            const res = await this.hospitalService.updateHospital(id, data);
            return commonResponse(true, 'Hospital updated successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Hospital update failed', error);
        }
    }

    // @EventPattern('deleteHospital')
    // async deleteHospital(@Payload() id: string) {
    //     try {
    //         const res = await this.hospitalService.deleteHospital(id);
    //         if (res) {
    //             this.natsClient.emit('deleteHospital', res);
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
