import { Body, Controller, Delete, Get, Inject, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllPrescriptionDto } from '../dtos/get-all-prescription.dto';
import { UpdatePrescriptionDto } from '../dtos/update-prescription.dto';
import { JwtGuard } from 'src/user/guards/jwt.guard';

@ApiTags('Prescription')
@Controller('prescription')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class PrescriptionController {
    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    ) { }

    @Get(':id')
    getPrescriptionById(@Param('id') id: string) {
        this.natsClient.emit('getPrescriptionById', id);
    }

    @Get()
    getAllPrescription(@Query() payload: GetAllPrescriptionDto) {
        this.natsClient.emit('getAllPrescription', payload);
    }

    @Patch(':id')
    updatePrescription(@Param('id') id: string, @Body() payload: UpdatePrescriptionDto) {
        this.natsClient.emit('updatePrescription', { id, payload });
    }

    @Delete(':id')
    deletePrescription(@Param('id') id: string) {
        this.natsClient.emit('deletePrescription', id);
    }
}
