import { Module } from '@nestjs/common';
import { MedicalReportService } from './services/medical-report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReportEntity } from './entities/medical-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalReportEntity,
    ]),
  ],
  controllers: [],
  providers: [MedicalReportService]
})
export class MedicalReportModule { }
