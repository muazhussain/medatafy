import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalEntity } from './other-entities/hostpital.entity';
import { MedicalTestEntity } from './other-entities/medical-test.entity';
import { DoctorAppointmentEntity } from './other-entities/doctor-appointment.entity';
import { DoctorEntity } from './other-entities/doctor.entity';
import { HospitalAppointmentEntity } from './other-entities/hospital-appointment.entity';
import { MedicalReportEntity } from './other-entities/medical-report.entity';
import { MedicalTestPrescriptionRelationEntity } from './other-entities/medical-test-prescription-relation.entity';
import { MedicineEntity } from './other-entities/medicine.entity';
import { PatientEntity } from './other-entities/patient.entity';
import { PrescriptionEntity } from './other-entities/prescription.entity';
import { MedicinePrescriptionRelationEntity } from './other-entities/medicine-prescription-relation.entity';
import { DoctorModule } from './doctor/doctor.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { PatientModule } from './patient/patient.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { MedicalTestModule } from './medical-test/medical-test.module';
import { HospitalModule } from './hospital/hospital.module';
import { HospitalAppointmentModule } from './hospital-appointment/hospital-appointment.module';
import { DoctorAppointmentModule } from './doctor-appointment/doctor-appointment.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [
            'nats://nats'
          ],
        },
      },
    ]),

    // Docker
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

    // Local
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   port: 5432,
    //   username: 'muaz',
    //   password: '123',
    //   database: 'medatafy_db',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),

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

    // MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forRoot('mongodb://localhost:27017/medatafy_db'),

    UserModule,
    DoctorModule,
    NatsClientModule,
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
