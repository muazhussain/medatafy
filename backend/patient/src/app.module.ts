import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from './nats-client/nats-client.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
