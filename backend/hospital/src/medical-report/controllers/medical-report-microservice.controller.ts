import { Controller } from '@nestjs/common';
import { MedicalReportService } from '../services/medical-report.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMedicalReportDto } from '../dtos/create-medical-reprot.dto';
import { GetAllMedicalReportDto } from '../dtos/get-all-medical-report.dto';
import { UpdateMedicalReportDto } from '../dtos/update-medical-report.dto';
import { commonResponse } from 'src/utils/output-message-format';

@Controller()
export class MedicalReportMicroserviceController {
    constructor(
        private readonly medicalReportService: MedicalReportService,
    ) { }

    @MessagePattern({ cmd: 'createMedicalReport' })
    async createMedicalReport(@Payload() payload: CreateMedicalReportDto) {
        try {
            const res = await this.medicalReportService.createMedicalReport(payload);
            return commonResponse(true, 'Medical report created successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Medical report creation failed', error);
        }
    }

    @MessagePattern({ cmd: 'getMedicalReportById' })
    async getMedicalReportById(@Payload() id: string) {
        try {
            const res = await this.medicalReportService.getMedicalReportById(id);
            return commonResponse(true, 'Medical report fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Medical report fetch failed', error);
        }
    }

    @MessagePattern({ cmd: 'getAllMedicalReport' })
    async getAllMedicalReport(@Payload() payload: GetAllMedicalReportDto) {
        try {
            const res = await this.medicalReportService.getAllMedicalReport(payload);
            return commonResponse(true, 'Medical report fetched successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Medical report fetch failed', error);
        }
    }

    @MessagePattern({ cmd: 'updateMedicalReport' })
    async updateMedicalReport(@Payload() payload: { id: string, data: UpdateMedicalReportDto }) {
        try {
            const { id, data } = payload;
            const res = await this.medicalReportService.updateMedicalReport(id, data);
            return commonResponse(true, 'Medical report updated successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Medical report update failed', error);
        }
    }

    @MessagePattern({ cmd: 'deleteMedicalReport' })
    async deleteMedicalReport(@Payload() id: string) {
        try {
            const res = await this.medicalReportService.deleteMedicalReport(id);
            return commonResponse(true, 'Medical report deleted successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Medical report delete failed', error);
        }
    }
}
