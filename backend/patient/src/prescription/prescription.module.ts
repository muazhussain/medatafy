import { Module } from '@nestjs/common';
import { PrescriptionService } from './services/prescription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionEntity } from './entities/prescription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PrescriptionEntity,
    ]),
  ],
  controllers: [],
  providers: [PrescriptionService]
})
export class PrescriptionModule { }
