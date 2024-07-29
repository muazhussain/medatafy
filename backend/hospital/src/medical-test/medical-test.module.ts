import { Module } from '@nestjs/common';
import { MedicalTestService } from './services/medical-test.service';
import { MedicalTestController } from './controllers/medical-test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalTestEntity } from './entities/medical-test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalTestEntity,
    ]),
  ],
  providers: [MedicalTestService],
  controllers: [MedicalTestController]
})
export class MedicalTestModule { }