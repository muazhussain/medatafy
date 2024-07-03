import { Module } from '@nestjs/common';
import { DoctorAppointmentController } from './controllers/doctor-appointment.controller';
import { DoctorAppointmentService } from './services/doctor-appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { DoctorAppointmentEntity } from './entities/doctor-appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorAppointmentEntity,
    ]),
    NatsClientModule,
  ],
  controllers: [DoctorAppointmentController],
  providers: [DoctorAppointmentService]
})
export class DoctorAppointmentModule { }
