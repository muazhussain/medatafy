import { Module } from '@nestjs/common';
import { DoctorAppointmentController } from './controllers/doctor-appointment.controller';
import { DoctorAppointmentService } from './services/doctor-appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorAppointmentEntity } from './entities/doctor-appointment.entity';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorAppointmentEntity
    ]),
    NatsClientModule,
  ],
  controllers: [DoctorAppointmentController],
  providers: [DoctorAppointmentService]
})
export class DoctorAppointmentModule { }
