import { Controller, Inject } from '@nestjs/common';
import { MedicalReportService } from '../services/medical-report.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { CreateMedicalReportDto } from '../dtos/create-medical-reprot.dto';
import { GetAllMedicalReportDto } from '../dtos/get-all-medical-report.dto';
import { UpdateMedicalReportDto } from '../dtos/update-medical-report.dto';

@Controller()
export class MedicalReportController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
        private readonly medicalReportService: MedicalReportService,
    ) { }

    @EventPattern('createMedicalReport')
    async createMedicalReport(payload: CreateMedicalReportDto) {
        try {
            const res = await this.medicalReportService.createMedicalReport(payload);
            if (res) {
                this.natsClient.emit('createMedicalReport', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('getMedicalReportById')
    async getMedicalReportById(id: string) {
        try {
            const res = await this.medicalReportService.getMedicalReportById(id);
            if (res) {
                this.natsClient.emit('getMedicalReportById', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('getAllMedicalReport')
    async getAllMedicalReport(payload: GetAllMedicalReportDto) {
        try {
            const res = await this.medicalReportService.getAllMedicalReport(payload);
            if (res) {
                this.natsClient.emit('getAllMedicalReport', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('updateMedicalReport')
    async updateMedicalReport(id: string, payload: UpdateMedicalReportDto) {
        try {
            const res = await this.medicalReportService.updateMedicalReport(id, payload);
            if (res) {
                this.natsClient.emit('updateMedicalReport', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @EventPattern('deleteMedicalReport')
    async deleteMedicalReport(id: string) {
        try {
            const res = await this.medicalReportService.deleteMedicalReport(id);
            if (res) {
                this.natsClient.emit('deleteMedicalReport', res);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
