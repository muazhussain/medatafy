import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateMedicalReportDto } from '../dtos/create-medical-reprot.dto';
import { GetAllMedicalReportDto } from '../dtos/get-all-medical-report.dto';
import { UpdateMedicalReportDto } from '../dtos/update-medical-report.dto';

@ApiTags('Medical Report')
@Controller('medical-report')
export class MedicalReportController {
    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    ) { }

    @Post()
    createMedicalReport(@Body() payload: CreateMedicalReportDto) {
        this.natsClient.emit('createMedicalReport', payload);
    }

    @Get(':id')
    getMedicalReportById(@Param('id') id: string) {
        this.natsClient.emit('getMedicalReportById', id);
    }

    @Get()
    getAllMedicalReport(@Query() payload: GetAllMedicalReportDto) {
        this.natsClient.emit('getAllMedicalReport', payload);
    }

    @Patch(':id')
    updateMedicalReport(@Param('id') id: string, @Body() payload: UpdateMedicalReportDto) {
        this.natsClient.emit('updateMedicalReport', { id, payload });
    }

    @Delete(':id')
    deleteMedicalReport(@Param('id') id: string) {
        this.natsClient.emit('deleteMedicalReport', id);
    }
}
