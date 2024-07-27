import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { PrescriptionService } from '../services/prescription.service';
import { CreatePrescriptionDto } from '../dtos/create-prescription.dto';
import { GetAllPrescriptionDto } from '../dtos/get-all-prescription.dto';
import { UpdatePrescriptionDto } from '../dtos/update-prescription.dto';
import { commonResponse } from 'src/utils/output-message-format';

@Controller()
export class PrescriptionController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
        private readonly prescriptionService: PrescriptionService,
    ) { }

    @EventPattern('createPrescription')
    async createPrescription(@Payload() payload: CreatePrescriptionDto) {
        try {
            const res = await this.prescriptionService.createPrescription(payload);
            return commonResponse(true, 'Create prescription successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Create prescription failed', error);
        }
    }

    @EventPattern('getPrescriptionById')
    async getPrescriptionById(@Payload() id: string) {
        try {
            const res = await this.prescriptionService.getPrescriptionById(id);
            return commonResponse(true, 'Get prescription successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Get prescription failed', error);
        }
    }

    @EventPattern('getAllPrescription')
    async getAllPrescription(@Payload() payload: GetAllPrescriptionDto) {
        try {
            const res = await this.prescriptionService.getAllPrescription(payload);
            return commonResponse(true, 'Get all prescription successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Get all prescription failed', error);
        }
    }

    @EventPattern('updatePrescription')
    async updatePrescription(@Payload() payload: { id: string, data: UpdatePrescriptionDto }) {
        try {
            const { id, data } = payload;
            const res = await this.prescriptionService.updatePrescription(id, data);
            return commonResponse(true, 'Update prescription successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Update prescription failed', error);
        }
    }

    @EventPattern('deletePrescription')
    async deletePrescription(@Payload() id: string) {
        try {
            const res = await this.prescriptionService.deletePrescription(id);
            return commonResponse(true, 'Delete prescription successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'Delete prescription failed', error);
        }
    }
}
