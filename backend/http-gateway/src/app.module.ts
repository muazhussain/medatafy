import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { MedicalTestModule } from './medical-test/medical-test.module';
import { HospitalModule } from './hospital/hospital.module';
import { HospitalAppointmentModule } from './hospital-appointment/hospital-appointment.module';
import { DoctorAppointmentModule } from './doctor-appointment/doctor-appointment.module';
import { DoctorAppointmentEntity } from './other-entities/entities/doctor-appointment.entity';
import { HospitalAppointmentEntity } from './other-entities/entities/hospital-appointment.entity';
import { MedicalReportEntity } from './other-entities/entities/medical-report.entity';
import { MedicalTestPrescriptionRelationEntity } from './other-entities/entities/medical-test-prescription-relation.entity';
import { MedicalTestEntity } from './other-entities/entities/medical-test.entity';
import { MedicinePrescriptionRelationEntity } from './other-entities/entities/medicine-prescription-relation.entity';
import { MedicineEntity } from './other-entities/entities/medicine.entity';
import { PrescriptionEntity } from './other-entities/entities/prescription.entity';

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
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [process.env.TYPEORM_ENTITIES],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      autoLoadEntities: process.env.TYPEORM_AUTOLOADENTITIES === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
    }),

    TypeOrmModule.forFeature([
      DoctorAppointmentEntity,
      HospitalAppointmentEntity,
      MedicalReportEntity,
      MedicalTestPrescriptionRelationEntity,
      MedicalTestEntity,
      MedicinePrescriptionRelationEntity,
      MedicineEntity,
      PrescriptionEntity,
    ]),

    MongooseModule.forRoot(process.env.MONGO_URI),
    // MongooseModule.forRoot('mongodb://localhost:27017/medatafy_db'),

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
