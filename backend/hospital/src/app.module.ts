import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalModule } from './hospital/hospital.module';
import { MedicalTestModule as MedicalTestModule } from './medical-test/medical-test.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { HospitalAppointmentModule } from './hospital-appointment/hospital-appointment.module';
import { DoctorAppointmentEntity } from './other-entities/entities/doctor-appointment.entity';
import { DoctorEntity } from './other-entities/entities/doctor.entity';
import { MedicalTestEntity } from './other-entities/entities/medical-test.entity';
import { MedicineEntity } from './other-entities/entities/medicine.entity';
import { PatientEntity } from './other-entities/entities/patient.entity';
import { PrescriptionEntity } from './other-entities/entities/prescription.entity';
import { UserEntity } from './other-entities/entities/user.entity';
import { HospitalAppointmentEntity } from './other-entities/entities/hospital-appointment.entity';
import { MedatafyAdminEntity } from './other-entities/entities/medatafy-admin.entity';
import { MedicalReportEntity } from './other-entities/entities/medical-report.entity';
import { MedicalTestPrescriptionRelationEntity } from './other-entities/entities/medical-test-prescription-relation.entity';
import { MedicinePrescriptionRelationEntity } from './other-entities/entities/medicine-prescription-relation.entity';

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
      DoctorEntity,
      HospitalAppointmentEntity,
      MedatafyAdminEntity,
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
