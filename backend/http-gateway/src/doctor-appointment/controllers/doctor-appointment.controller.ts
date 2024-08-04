import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateDoctorAppointmentDto } from '../dtos/create-doctor-appointment.dto';
import { GetAllDoctorAppointmentDto } from '../dtos/get-all-doctor-appointment.dto';
import { UpdateDoctorAppointmentDto } from '../dtos/update-doctor-appointment.dto';

@ApiTags('Doctor Appointment')
@Controller('doctor-appointment')
export class DoctorAppointmentController {
    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    ) { }

    @Post()
    createDoctorAppointment(@Body() payload: CreateDoctorAppointmentDto) {
        return this.natsClient.send({ cmd: 'createDoctorAppointment' }, payload);
    }

    @Get(':id')
    getDoctorAppointmentById(@Param('id') id: string) {
        return this.natsClient.send({ cmd: 'getDoctorAppointmentById' }, id);
    }

    @Get()
    getAllDoctorAppointment(@Query() payload: GetAllDoctorAppointmentDto) {
        return this.natsClient.send({ cmd: 'getAllDoctorAppointment' }, payload);
    }

    @Patch(':id')
    updateDoctorAppointment(@Param('id') id: string, @Body() data: UpdateDoctorAppointmentDto) {
        return this.natsClient.send({ cmd: 'updateDoctorAppointment' }, { id, data });
    }

    @Delete(':id')
    deleteDoctorAppointment(@Param('id') id: string) {
        return this.natsClient.send({ cmd: 'deleteDoctorAppointment' }, id);
    }
}
