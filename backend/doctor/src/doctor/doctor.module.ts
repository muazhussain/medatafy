import { Module } from '@nestjs/common';
import { DoctorMicroserviceController } from './controllers/doctor-microservice.controller';
import { DoctorService } from './services/doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorEntity,
    ]),
  ],
  controllers: [DoctorMicroserviceController],
  providers: [DoctorService]
})
export class DoctorModule { }
