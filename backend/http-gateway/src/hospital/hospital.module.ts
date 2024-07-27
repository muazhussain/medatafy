import { Module } from '@nestjs/common';
import { HospitalController } from './controllers/hospital.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
  ],
  controllers: [HospitalController]
})
export class HospitalModule { }
