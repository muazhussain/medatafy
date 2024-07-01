import { Module } from '@nestjs/common';
import { MedicalReportController } from './controllers/medical-report.controller';
import { MedicalReportService } from './services/medical-report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReportEntity } from './entities/medical-report.entity';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalReportEntity,
    ]),
    NatsClientModule,
  ],
  controllers: [MedicalReportController],
  providers: [MedicalReportService]
})
export class MedicalReportModule { }
