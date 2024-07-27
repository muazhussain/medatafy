import { Module } from '@nestjs/common';
import { HospitalAppointmentController } from './controllers/hospital-appointment.controller';
import { HospitalAppointmentService } from './services/hospital-appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalAppointmentEntity } from './entities/hospital-appointment.entity';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HospitalAppointmentEntity,
    ]),
    NatsClientModule,
  ],
  controllers: [HospitalAppointmentController],
  providers: [HospitalAppointmentService]
})
export class HospitalAppointmentModule { }
