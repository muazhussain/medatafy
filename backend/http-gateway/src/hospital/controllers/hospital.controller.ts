import { Body, Controller, Get, Inject, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllHospitalDto } from '../dtos/get-all-hospital.dto';
import { UpdateHospitalDto } from '../dtos/update-hospital.dto';
import { JwtGuard } from 'src/user/guards/jwt.guard';

@ApiTags('Hospital')
@Controller('hospital')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class HospitalController {
    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    ) { }

    @Get(':id')
    getHospitalById(@Param('id') id: string) {
        return this.natsClient.send({ cmd: 'getHospitalById' }, id);
    }

    @Get()
    getAllHospitals(@Query() payload: GetAllHospitalDto) {
        return this.natsClient.send({ cmd: 'getAllHospital' }, payload);
    }

    @Patch(':id')
    updateHospital(@Param('id') id: string, @Body() data: UpdateHospitalDto) {
        return this.natsClient.send({ cmd: 'updateHospital' }, { id, data });
    }
}
