import { Module } from '@nestjs/common';
import { HospitalAppointmentService } from './services/hospital-appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalAppointmentEntity } from './entities/hospital-appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HospitalAppointmentEntity,
    ]),
  ],
  controllers: [],
  providers: [HospitalAppointmentService]
})
export class HospitalAppointmentModule { }
