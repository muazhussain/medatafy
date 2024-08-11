import { Body, Controller, Get, Inject, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllDoctorDto } from '../dtos/get-all-doctor.dto';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';
import { JwtGuard } from 'src/user/guards/jwt.guard';

@ApiTags('Doctor')
@Controller('doctor')
@UseGuards(JwtGuard)
@ApiBearerAuth()
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
