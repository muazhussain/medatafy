import { Module } from '@nestjs/common';
import { DoctorAppointmentMircoserviceController } from './controllers/doctor-appointment-microservice.controller';
import { DoctorAppointmentService } from './services/doctor-appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorAppointmentEntity } from './entities/doctor-appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorAppointmentEntity
    ]),
  ],
  controllers: [DoctorAppointmentMircoserviceController],
  providers: [DoctorAppointmentService]
})
export class DoctorAppointmentModule { }
