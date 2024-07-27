import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { PrescriptionService } from '../services/prescription.service';
import { GetAllPrescriptionDto } from '../dtos/get-all-prescription.dto';

@Controller()
export class PrescriptionController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
        private readonly prescriptionService: PrescriptionService,
    ) { }

    @EventPattern('getPrescriptionById')
    async getPrescriptionById(@Payload() id: string) {
        try {
            const res = await this.prescriptionService.getPrescriptionById(id);
            if (res) {
                this.natsClient.emit('getPrescriptionById', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('getAllPrescription')
    async getAllPrescription(@Payload() payload: GetAllPrescriptionDto) {
        try {
            const res = await this.prescriptionService.getAllPrescription(payload);
            if (res) {
                this.natsClient.emit('getAllPrescription', res);
            }
        } catch (error) {
            throw error;
        }
    }

    @EventPattern('deletePrescription')
    async deletePrescription(@Payload() id: string) {
        try {
            const res = await this.prescriptionService.deletePrescription(id);
            if (res) {
                this.natsClient.emit('deletePrescription', res);
            }
        } catch (error) {
            throw error;
        }
    }
}
