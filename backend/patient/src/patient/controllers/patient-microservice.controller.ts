import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PatientService } from '../services/patient.service';
import { GetAllPatientDto } from '../dtos/get-all-patient.dto';
import { UpdatePatientDto } from '../dtos/update-patient.dto';
import { commonResponse } from 'src/utils/output-message-format';

@Controller()
export class PatientMicroserviceController {
    constructor(
        private readonly patientService: PatientService,
    ) { }

    @MessagePattern({ cmd: 'getPatientById' })
    async getPatientById(@Payload() id: string) {
        try {
            const res = await this.patientService.getPatientById(id);
            return commonResponse(true, 'Get patient successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Get patient failed', error);
        }
    }

    @MessagePattern({ cmd: 'getAllPatient' })
    async getAllPatient(@Payload() payload: GetAllPatientDto) {
        try {
            const res = await this.patientService.getAllPatient(payload);
            return commonResponse(true, 'Get all patient successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Get all patient failed', error);
        }
    }

    @MessagePattern({ cmd: 'updatePatient' })
    async updatePatient(@Payload() payload: { id: string, data: UpdatePatientDto }) {
        try {
            console.log(payload);
            const res = await this.patientService.updatePatient(payload.id, payload.data);
            return commonResponse(true, 'Update patient successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Update patient failed', error);
        }
    }
}
