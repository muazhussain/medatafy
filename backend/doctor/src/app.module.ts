import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from './nats-client/nats-client.module';
import { DoctorAppointmentModule } from './doctor-appointment/doctor-appointment.module';
import { DoctorModule } from './doctor/doctor.module';
import { PrescriptionModule } from './prescription/prescription.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'muaz',
      password: '123',
      database: 'medatafy_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    NatsClientModule,
    DoctorAppointmentModule,
    DoctorModule,
    PrescriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
