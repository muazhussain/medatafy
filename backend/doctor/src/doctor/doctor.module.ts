import { Module } from '@nestjs/common';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorService } from './services/doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorAppointmentEntity } from 'src/doctor-appointment/entities/doctor-appointment.entity';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorAppointmentEntity,
    ]),
    NatsClientModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService]
})
export class DoctorModule { }
