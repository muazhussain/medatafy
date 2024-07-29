import { Module } from '@nestjs/common';
import { DoctorAppointmentController } from './controllers/doctor-appointment.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
  ],
  controllers: [DoctorAppointmentController]
})
export class DoctorAppointmentModule { }
