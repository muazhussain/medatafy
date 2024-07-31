import { Module } from '@nestjs/common';
import { HospitalMicroserviceController } from './controllers/hospital-microservice.controller';
import { HospitalService } from './services/hospital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalEntity } from './entities/hospital.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HospitalEntity,
    ]),
  ],
  controllers: [HospitalMicroserviceController],
  providers: [HospitalService]
})
export class HospitalModule { }
