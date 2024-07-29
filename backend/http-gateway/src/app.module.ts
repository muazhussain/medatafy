import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalTestEntity } from './other-entities/medical-test.entity';
import { DoctorAppointmentEntity } from './other-entities/doctor-appointment.entity';
import { HospitalAppointmentEntity } from './other-entities/hospital-appointment.entity';
import { MedicalReportEntity } from './other-entities/medical-report.entity';
import { MedicalTestPrescriptionRelationEntity } from './other-entities/medical-test-prescription-relation.entity';
import { MedicineEntity } from './other-entities/medicine.entity';
import { PatientEntity } from './other-entities/patient.entity';
import { PrescriptionEntity } from './other-entities/prescription.entity';
import { MedicinePrescriptionRelationEntity } from './other-entities/medicine-prescription-relation.entity';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { MedicalTestModule } from './medical-test/medical-test.module';
import { HospitalModule } from './hospital/hospital.module';
import { HospitalAppointmentModule } from './hospital-appointment/hospital-appointment.module';
import { DoctorAppointmentModule } from './doctor-appointment/doctor-appointment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
    }),

    TypeOrmModule.forFeature([
      DoctorAppointmentEntity,
      HospitalAppointmentEntity,
      MedicalReportEntity,
      MedicalTestPrescriptionRelationEntity,
      MedicalTestEntity,
      MedicinePrescriptionRelationEntity,
      MedicineEntity,
      PatientEntity,
      PrescriptionEntity,
    ]),

    MongooseModule.forRoot(process.env.MONGO_URI),

    UserModule,
    DoctorModule,
    PatientModule,
    PrescriptionModule,
    MedicalReportModule,
    MedicalTestModule,
    HospitalModule,
    HospitalAppointmentModule,
    DoctorAppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
