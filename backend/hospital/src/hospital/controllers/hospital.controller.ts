import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { HospitalService } from '../services/hospital.service';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';
import { GetAllHospitalDto } from '../dtos/get-all-hospital.dto';
import { UpdateHospitalDto } from '../dtos/update-hospital.dto';

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
            if (res) {
                this.natsClient.emit('createHospital', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('getHospitalById')
    async getHospitalById(@Payload() payload: string) {
        try {
            const res = await this.hospitalService.getHospitalById(payload);
            if (res) {
                this.natsClient.emit('getHospitalById', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('getAllHospital')
    async getAllHospital(@Payload() payload: GetAllHospitalDto) {
        try {
            const res = await this.hospitalService.getAllHospital(payload);
            if (res) {
                this.natsClient.emit('getAllHospital', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('updateHospital')
    async updateHospital(@Payload() payload: { id: string; data: UpdateHospitalDto }) {
        try {
            const { id, data } = payload;
            const res = await this.hospitalService.updateHospital(id, data);
            if (res) {
                this.natsClient.emit('updateHospital', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('deleteHospital')
    async deleteHospital(@Payload() id: string) {
        try {
            const res = await this.hospitalService.deleteHospital(id);
            if (res) {
                this.natsClient.emit('deleteHospital', res);
            }
        } catch (error) {
            throw error;
        }
    }
}
