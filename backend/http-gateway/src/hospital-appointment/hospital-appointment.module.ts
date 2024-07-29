import { Module } from '@nestjs/common';
import { HospitalAppointmentController } from './controllers/hospital-appointment.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
  ],
  controllers: [HospitalAppointmentController]
})
export class HospitalAppointmentModule { }
