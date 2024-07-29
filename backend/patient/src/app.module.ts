import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from './nats-client/nats-client.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { PatientModule } from './patient/patient.module';
import { DoctorAppointmentModule } from './doctor-appointment/doctor-appointment.module';
import { HospitalAppointmentModule } from './hospital-appointment/hospital-appointment.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { DoctorEntity } from './other-entities/doctor.entity';
import { HospitalEntity } from './other-entities/hospital.entity';
import { MedicalTestPrescriptionRelationEntity } from './other-entities/medical-test-prescription-relation.entity';
import { MedicalTestEntity } from './other-entities/medical-test.entity';
import { MedicinePrescriptionRelationEntity } from './other-entities/medicine-prescription-relation.entity';
import { MedicineEntity } from './other-entities/medicine.entity';
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
      DoctorEntity,
      HospitalEntity,
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
