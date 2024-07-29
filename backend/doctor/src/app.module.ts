import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorAppointmentModule } from './doctor-appointment/doctor-appointment.module';
import { DoctorModule } from './doctor/doctor.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { HospitalAppointmentEntity } from './other-entities/hospital-appointment.entity';
import { HospitalEntity } from './other-entities/hospital.entity';
import { MedicalReportEntity } from './other-entities/medical-report.entity';
import { MedicalTestEntity } from './other-entities/medical-test.entity';
import { MedicineEntity } from './other-entities/medicine.entity';
import { PatientEntity } from './other-entities/patient.entity';
import { UserEntity } from './other-entities/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'muaz',
    //   password: '123',
    //   database: 'medatafy_db',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: process.env.SYNCHRONIZE === 'true',
    }),
    TypeOrmModule.forFeature([
      HospitalAppointmentEntity,
      HospitalEntity,
      MedicalReportEntity,
      MedicalTestEntity,
      MedicineEntity,
      PatientEntity,
      UserEntity,
    ]),
    DoctorAppointmentModule,
    DoctorModule,
    PrescriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
