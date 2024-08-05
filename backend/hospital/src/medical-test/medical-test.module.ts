import { Module } from '@nestjs/common';
import { MedicalTestService } from './services/medical-test.service';
import { MedicalTestMicroserviceController } from './controllers/medical-test-microservice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalTestEntity } from './entities/medical-test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalTestEntity,
    ]),
  ],
  providers: [MedicalTestService],
  controllers: [MedicalTestMicroserviceController]
})
export class MedicalTestModule { }