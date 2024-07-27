import { Module } from '@nestjs/common';
import { MedicalReportController } from './controllers/medical-report.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
  ],
  controllers: [MedicalReportController]
})
export class MedicalReportModule { }
