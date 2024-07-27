import { Module } from '@nestjs/common';
import { DoctorAppointmentController } from './controllers/doctor-appointment.controller';

@Module({
  controllers: [DoctorAppointmentController]
})
export class DoctorAppointmentModule {}
