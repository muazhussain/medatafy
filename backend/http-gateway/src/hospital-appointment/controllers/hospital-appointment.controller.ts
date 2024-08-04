import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateHospitalAppointmentDto } from '../dtos/create-hospital-appointment.dto';
import { GetAllHospitalAppointmentDto } from '../dtos/get-all-hospital-appointment.dto';
import { UpdateHospitalAppointmentDto } from '../dtos/update-hospital-appointment.dto';

@ApiTags('Hospital Appointment')
@Controller('hospital-appointment')
export class HospitalAppointmentController {
    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    ) { }

    @Post()
    createHospitalAppointment(@Body() payload: CreateHospitalAppointmentDto) {
        return this.natsClient.send({ cmd: 'createHospitalAppointment' }, payload);
    }

    @Get(':id')
    getHospitalAppointmentById(@Param('id') id: string) {
        return this.natsClient.send({ cmd: 'getHospitalAppointmentById' }, id);
    }

    @Get()
    getAllHospitalAppointment(@Query() payload: GetAllHospitalAppointmentDto) {
        return this.natsClient.send({ cmd: 'getAllHospitalAppointment' }, payload);
    }

    @Patch(':id')
    updateHospitalAppointment(@Param('id') id: string, @Body() data: UpdateHospitalAppointmentDto) {
        return this.natsClient.send({ cmd: 'updateHospitalAppointment' }, { id, data });
    }

    @Delete(':id')
    deleteHospitalAppointment(@Param('id') id: string) {
        return this.natsClient.send({ cmd: 'deleteHospitalAppointment' }, id);
    }
}
