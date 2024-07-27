import { Module } from '@nestjs/common';
import { HospitalAppointmentController } from './controllers/hospital-appointment.controller';

@Module({
  controllers: [HospitalAppointmentController]
})
export class HospitalAppointmentModule {}
