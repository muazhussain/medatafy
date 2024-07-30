import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { GetAllDoctorDto } from '../dtos/get-all-doctor.dto';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
    constructor(
        @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    ) { }

    @Get(':id')
    getDoctorById(@Param('id') id: string) {
        return this.natsClient.send({ cmd: 'getDoctorById' }, id);
    }

    @Get()
    getAllDoctor(@Query() payload: GetAllDoctorDto) {
        return this.natsClient.send({ cmd: 'getAllDoctor' }, payload);
    }

    @Patch(':id')
    updateDoctor(@Param('id') id: string, @Body() data: UpdateDoctorDto) {
        return this.natsClient.send({ cmd: 'updateDoctor' }, { id, data });
    }
}
