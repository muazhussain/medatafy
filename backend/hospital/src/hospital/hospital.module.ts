import { Module } from '@nestjs/common';
import { HospitalController } from './controllers/hospital.controller';
import { HospitalService } from './services/hospital.service';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalEntity } from './entities/hospital.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HospitalEntity,
    ]),
    NatsClientModule,
  ],
  controllers: [HospitalController],
  providers: [HospitalService]
})
export class HospitalModule { }
