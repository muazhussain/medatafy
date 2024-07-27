import { Module } from '@nestjs/common';
import { DoctorController } from './controllers/doctor.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
  ],
  controllers: [DoctorController]
})
export class DoctorModule { }
