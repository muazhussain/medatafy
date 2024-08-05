import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateMedicalTestDto } from '../dtos/create-medical-test.dto';
import { GetAllMedicalTestDto } from '../dtos/get-all-medical-test.dto';
import { UpdateMedicalTestDto } from '../dtos/update-medical-test.dto';

@ApiTags('Medical Test')
@Controller('medical-test')
export class MedicalTestController {
    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    ) { }

    @Post()
    createMedicalTest(@Body() payload: CreateMedicalTestDto) {
        return this.natsClient.send({ cmd: 'createMedicalTest' }, payload);
    }

    @Get(':id')
    getMedicalTestById(@Param('id') id: string) {
        return this.natsClient.send({ cmd: 'getMedicalTestById' }, id);
    }

    @Get()
    getAllMedicalTest(@Query() payload: GetAllMedicalTestDto) {
        this.natsClient.send({ cmd: 'getAllMedicalTest' }, payload);
    }

    @Patch(':id')
    updateMedicalTest(@Param('id') id: string, @Body() payload: UpdateMedicalTestDto) {
        this.natsClient.send({ cmd: 'updateMedicalTest' }, { id, payload });
    }

    @Delete(':id')
    deleteMedicalTest(@Param('id') id: string) {
        this.natsClient.send({ cmd: 'deleteMedicalTest' }, id);
    }
}
