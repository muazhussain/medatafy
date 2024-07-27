import { Body, Controller, Get, Inject, Param, Patch, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { GetAllDoctorDto } from '../dtos/get-all-doctor.dto';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
    ) { }

    @Get(':id')
    getDoctorById(@Param('id') id: string) {
        this.natsClient.emit('getDoctorById', id);
    }

    @Get()
    getAllDoctor(@Query() payload: GetAllDoctorDto) {
        this.natsClient.emit('getAllDoctor', payload);
    }

    @Patch(':id')
    updateDoctor(@Param('id') id: string, @Body() payload: UpdateDoctorDto) {
        this.natsClient.emit('updateDoctor', { id, payload });
    }
}
