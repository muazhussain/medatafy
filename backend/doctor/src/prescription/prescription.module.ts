import { Module } from '@nestjs/common';
import { PrescriptionController } from './controllers/prescription.controller';
import { PrescriptionService } from './services/prescription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionEntity } from './entities/prescription.entity';
import { MedicinePrescriptionRelationEntity } from 'src/other-entities/medicine-prescription-relation.entity';
import { MedicalTestPrescriptionRelationEntity } from 'src/other-entities/medical-test-prescription-relation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PrescriptionEntity,
      MedicalTestPrescriptionRelationEntity,
      MedicinePrescriptionRelationEntity,
    ]),
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService]
})
export class PrescriptionModule { }
