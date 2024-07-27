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
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
    ) { }

    @Post()
    createHospitalAppointment(@Body() payload: CreateHospitalAppointmentDto) {
        this.natsClient.emit('createHospitalAppointment', payload);
    }

    @Get(':id')
    getHospitalAppointmentById(@Param('id') id: string) {
        this.natsClient.emit('getHospitalAppointmentById', id);
    }

    @Get()
    getAllHospitalAppointment(@Query() payload: GetAllHospitalAppointmentDto) {
        this.natsClient.emit('getAllHospitalAppointment', payload);
    }

    @Patch(':id')
    updateHospitalAppointment(@Param('id') id: string, @Body() payload: UpdateHospitalAppointmentDto) {
        this.natsClient.emit('updateHospitalAppointment', { id, payload });
    }

    @Delete(':id')
    deleteHospitalAppointment(@Param('id') id: string) {
        this.natsClient.emit('deleteHospitalAppointment', id);
    }
}
