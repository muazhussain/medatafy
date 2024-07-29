import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MedicalTestService } from '../services/medical-test.service';
import { CreateMedicalTestDto } from '../dtos/create-medical-test.dto';
import { GetAllMedicalTestDto } from '../dtos/get-all-medical-test.dto';
import { UpdateMedicalTestDto } from '../dtos/update-medical-test.dto';
import { commonResponse } from 'src/utils/output-message-format';

@Controller()
export class MedicalTestController {
    constructor(
        private readonly medicalTestService: MedicalTestService,
    ) { }

    @EventPattern('createMedicalTest')
    async createMedicalTest(@Payload() payload: CreateMedicalTestDto) {
        try {
            const res = await this.medicalTestService.createMedicalTest(payload);
            return commonResponse(true, 'Medical test created successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Medical test creation failed', error);
        }
    }

    @EventPattern('getMedicalTestById')
    async getMedicalTestById(@Payload() payload: string) {
        try {
            const res = await this.medicalTestService.getMedicalTestById(payload);
            return commonResponse(true, 'Medical test fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Medical test fetch failed', error);
        }
    }

    @EventPattern('getAllMedicalTest')
    async getAllMedicalTest(@Payload() payload: GetAllMedicalTestDto) {
        try {
            const res = await this.medicalTestService.getAllMedicalTest(payload);
            return commonResponse(true, 'Medical test fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Medical test fetch failed', error);
        }
    }

    @EventPattern('updateMedicalTest')
    async updateMedicalTest(@Payload() payload: { id: string; data: UpdateMedicalTestDto }) {
        try {
            const { id, data } = payload;
            const res = await this.medicalTestService.updateMedicalTest(id, data);
            return commonResponse(true, 'Medical test updated successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Medical test update failed', error);
        }
    }

    @EventPattern('deleteMedicalTest')
    async deleteMedicalTest(@Payload() id: string) {
        try {
            const res = await this.medicalTestService.deleteMedicalTest(id);
            return commonResponse(true, 'Medical test deleted successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Medical test delete failed', error);
        }
    }
}
