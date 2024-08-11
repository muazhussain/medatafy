import { Body, Controller, Get, Inject, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllPatientDto } from '../dtos/get-all-patient.dto';
import { UpdatePatientDto } from '../dtos/update-patient.dto';
import { JwtGuard } from 'src/user/guards/jwt.guard';

@ApiTags('Patient')
@Controller('patient')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class PatientController {
    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    ) { }

    @Get(':id')
    getPatientById(@Param('id') id: string) {
        return this.natsClient.send({ cmd: 'getPatientById' }, id);
    }

    @Get()
    getAllPatient(@Query() payload: GetAllPatientDto) {
        return this.natsClient.send({ cmd: 'getAllPatient' }, payload);
    }

    @Patch(':id')
    updatePatient(@Param('id') id: string, @Body() data: UpdatePatientDto) {
        return this.natsClient.send({ cmd: 'updatePatient' }, { id, data });
    }
}
