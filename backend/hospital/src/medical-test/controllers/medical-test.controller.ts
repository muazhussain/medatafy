import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { MedicalTestService } from '../services/medical-test.service';
import { CreateTestDto } from '../dtos/create-medical-test.dto';
import { GetAllTestDto } from '../dtos/get-all-medical-test.dto';
import { UpdateMedicalTestDto } from '../dtos/update-medical-test.dto';

@Controller()
export class MedicalTestController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
        private readonly medicalTestService: MedicalTestService,
    ) { }

    @EventPattern('createMedicalTest')
    async createMedicalTest(@Payload() payload: CreateTestDto) {
        try {
            const res = await this.medicalTestService.createMedicalTest(payload);
            if (res) {
                this.natsClient.emit('createMedicalTest', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('getMedicalTestById')
    async getMedicalTestById(@Payload() payload: string) {
        try {
            const res = await this.medicalTestService.getMedicalTestById(payload);
            if (res) {
                this.natsClient.emit('getMedicalTestById', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('getAllMedicalTest')
    async getAllMedicalTest(@Payload() payload: GetAllTestDto) {
        try {
            const res = await this.medicalTestService.getAllMedicalTest(payload);
            if (res) {
                this.natsClient.emit('getAllMedicalTest', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('updateMedicalTest')
    async updateMedicalTest(@Payload() payload: { id: string; data: UpdateMedicalTestDto }) {
        try {
            const { id, data } = payload;
            const res = await this.medicalTestService.updateMedicalTest(id, data);
            if (res) {
                this.natsClient.emit('updateMedicalTest', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('deleteMedicalTest')
    async deleteMedicalTest(@Payload() id: string) {
        try {
            const res = await this.medicalTestService.deleteMedicalTest(id);
            if (res) {
                this.natsClient.emit('deleteMedicalTest', res);
            }
        } catch (error) {
            throw error;
        }
    }
}
