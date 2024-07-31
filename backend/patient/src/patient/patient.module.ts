import { Module } from '@nestjs/common';
import { PatientMicroserviceController } from './controllers/patient-microservice.controller';
import { PatientService } from './services/patient.service';
import { PatientEntity } from './entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatientEntity
    ]),
  ],
  controllers: [PatientMicroserviceController],
  providers: [PatientService]
})
export class PatientModule { }
