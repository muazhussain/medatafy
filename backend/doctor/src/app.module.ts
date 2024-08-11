import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorAppointmentModule } from './doctor-appointment/doctor-appointment.module';
import { DoctorModule } from './doctor/doctor.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { HospitalAppointmentEntity } from './other-entities/entities/hospital-appointment.entity';
import { HospitalEntity } from './other-entities/entities/hospital.entity';
import { MedicalReportEntity } from './other-entities/entities/medical-report.entity';
import { MedicalTestEntity } from './other-entities/entities/medical-test.entity';
import { MedicineEntity } from './other-entities/entities/medicine.entity';
import { PatientEntity } from './other-entities/entities/patient.entity';
import { UserEntity } from './other-entities/entities/user.entity';
import { MedatafyAdminEntity } from './other-entities/entities/medatafy-admin.entity';

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
      HospitalAppointmentEntity,
      HospitalEntity,
      MedatafyAdminEntity,
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
