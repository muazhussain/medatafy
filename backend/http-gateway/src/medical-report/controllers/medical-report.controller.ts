import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateMedicalReportDto } from '../dtos/create-medical-reprot.dto';
import { GetAllMedicalReportDto } from '../dtos/get-all-medical-report.dto';
import { UpdateMedicalReportDto } from '../dtos/update-medical-report.dto';
import { JwtGuard } from 'src/user/guards/jwt.guard';

@ApiTags('Medical Report')
@Controller('medical-report')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class MedicalReportController {
    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    ) { }

    @Post()
    createMedicalReport(@Body() payload: CreateMedicalReportDto) {
        return this.natsClient.send({ cmd: 'createMedicalReport' }, payload);
    }

    @Get(':id')
    getMedicalReportById(@Param('id') id: string) {
        return this.natsClient.send({ cmd: 'getMedicalReportById' }, id);
    }

    @Get()
    getAllMedicalReport(@Query() payload: GetAllMedicalReportDto) {
        return this.natsClient.send({ cmd: 'getAllMedicalReport' }, payload);
    }

    @Patch(':id')
    updateMedicalReport(@Param('id') id: string, @Body() data: UpdateMedicalReportDto) {
        return this.natsClient.send({ cmd: 'getAllMedicalReport' }, { id, data });
    }

    @Delete(':id')
    deleteMedicalReport(@Param('id') id: string) {
        return this.natsClient.send({ cmd: 'deleteMedicalReport' }, id);
    }
}
