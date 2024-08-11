import { Module } from '@nestjs/common';
import { PrescriptionMicroserviceController } from './controllers/prescription-microservice.controller';
import { PrescriptionService } from './services/prescription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionEntity } from './entities/prescription.entity';
import { MedicinePrescriptionRelationEntity } from 'src/other-entities/entities/medicine-prescription-relation.entity';
import { MedicalTestPrescriptionRelationEntity } from 'src/other-entities/entities/medical-test-prescription-relation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PrescriptionEntity,
      MedicalTestPrescriptionRelationEntity,
      MedicinePrescriptionRelationEntity,
    ]),
  ],
  controllers: [PrescriptionMicroserviceController],
  providers: [PrescriptionService]
})
export class PrescriptionModule { }
