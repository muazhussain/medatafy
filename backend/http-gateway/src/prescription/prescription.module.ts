import { Module } from '@nestjs/common';
import { PrescriptionController } from './controllers/prescription.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
  ],
  controllers: [PrescriptionController]
})
export class PrescriptionModule { }
