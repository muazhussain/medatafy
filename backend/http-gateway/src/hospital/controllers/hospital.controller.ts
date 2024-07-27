import { Body, Controller, Get, Inject, Param, Patch, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { GetAllHospitalDto } from '../dtos/get-all-hospital.dto';
import { UpdateHospitalDto } from '../dtos/update-hospital.dto';

@ApiTags('Hospital')
@Controller('hospital')
export class HospitalController {
    constructor(
        @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
    ) { }

    @Get(':id')
    getHospitalById(@Param() id: string) {
        this.natsClient.emit('getHospitalById', id);
    }

    @Get()
    getAllHospitals(@Query() payload: GetAllHospitalDto) {
        this.natsClient.emit('getAllHospitals', payload);
    }

    @Patch(':id')
    updateHospital(@Param('id') id: string, @Body() payload: UpdateHospitalDto) {
        this.natsClient.emit('updateHospital', { id, payload });
    }
}
