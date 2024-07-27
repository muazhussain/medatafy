import { Module } from '@nestjs/common';
import { PatientController } from './controllers/patient.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
  ],
  controllers: [PatientController]
})
export class PatientModule { }
