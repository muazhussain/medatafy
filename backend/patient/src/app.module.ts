import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from './nats-client/nats-client.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { PatientModule } from './patient/patient.module';
import { DoctorAppointmentModule } from './doctor-appointment/doctor-appointment.module';
import { HospitalAppointmentModule } from './hospital-appointment/hospital-appointment.module';
import { PrescriptionModule } from './prescription/prescription.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'muaz',
      password: '123',
      database: 'medatafy_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    NatsClientModule,
    MedicalReportModule,
    PatientModule,
    DoctorAppointmentModule,
    HospitalAppointmentModule,
    PrescriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
