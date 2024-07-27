import { Module } from '@nestjs/common';
import { MedicalTestController } from './controllers/medical-test.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
  ],
  controllers: [MedicalTestController]
})
export class MedicalTestModule { }
