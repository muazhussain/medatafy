import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalModule } from './hospital/hospital.module';
import { MedicalTestModule as MedicalTestModule } from './medical-test/medical-test.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { HospitalAppointmentModule } from './hospital-appointment/hospital-appointment.module';
import { DoctorAppointmentEntity } from './other-entities/doctor-appointment.entity';
import { DoctorEntity } from './other-entities/doctor.entity';
import { HospitalAppointmentEntity } from './other-entities/hospital-appointment.entity';
import { MedicalReportEntity } from './other-entities/medical-report.entity';
import { MedicalTestEntity } from './other-entities/medical-test.entity';
import { MedicalTestPrescriptionRelationEntity } from './other-entities/medical-test-prescription-relation.entity';
import { MedicinePrescriptionRelationEntity } from './other-entities/medicine-prescription-relation.entity';
import { MedicineEntity } from './other-entities/medicine.entity';
import { PatientEntity } from './other-entities/patient.entity';
import { PrescriptionEntity } from './other-entities/prescription.entity';
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
      DoctorAppointmentEntity,
      DoctorEntity,
      HospitalAppointmentEntity,
      MedicalReportEntity,
      MedicalTestPrescriptionRelationEntity,
      MedicalTestEntity,
      MedicinePrescriptionRelationEntity,
      MedicineEntity,
      PatientEntity,
      PrescriptionEntity,
      UserEntity,
    ]),
    HospitalModule,
    MedicalTestModule,
    MedicalReportModule,
    HospitalAppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
