import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from './nats-client/nats-client.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { PatientModule } from './patient/patient.module';
import { DoctorAppointmentModule } from './doctor-appointment/doctor-appointment.module';
import { HospitalAppointmentModule } from './hospital-appointment/hospital-appointment.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { DoctorEntity } from './other-entities/entities/doctor.entity';
import { HospitalEntity } from './other-entities/entities/hospital.entity';
import { MedatafyAdminEntity } from './other-entities/entities/medatafy-admin.entity';
import { MedicalTestPrescriptionRelationEntity } from './other-entities/entities/medical-test-prescription-relation.entity';
import { MedicalTestEntity } from './other-entities/entities/medical-test.entity';
import { MedicinePrescriptionRelationEntity } from './other-entities/entities/medicine-prescription-relation.entity';
import { MedicineEntity } from './other-entities/entities/medicine.entity';
import { UserEntity } from './other-entities/entities/user.entity';

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
      DoctorEntity,
      HospitalEntity,
      MedatafyAdminEntity,
      MedicalTestPrescriptionRelationEntity,
      MedicalTestEntity,
      MedicinePrescriptionRelationEntity,
      MedicineEntity,
      UserEntity,
    ]),

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
