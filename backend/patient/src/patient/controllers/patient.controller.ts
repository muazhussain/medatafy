import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { PatientService } from '../services/patient.service';
import { GetAllPatientDto } from '../dtos/get-all-patient.dto';
import { UpdatePatientDto } from '../dtos/update-patient.dto';

@Controller('patient')
export class PatientController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
        private readonly patientService: PatientService,
    ) { }

    @EventPattern('getPatientById')
    async getPatientById(@Payload() id: string) {
        try {
            const res = await this.patientService.getPatientById(id);
            if (res) {
                this.natsClient.emit('getPatientById', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('getAllPatient')
    async getAllPatient(@Payload() payload: GetAllPatientDto) {
        try {
            const res = await this.patientService.getAllPatient(payload);
            if (res) {
                this.natsClient.emit('getAllPatient', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('updatePatient')
    async updatePatient(@Payload() payload: { id: string, data: UpdatePatientDto }) {
        try {
            const { id, data } = payload;
            const res = await this.patientService.updatePatient(id, data);
            if (res) {
                this.natsClient.emit('updatePatient', res);
            }
        } catch (error) {
            throw error;
        }
    }
}
