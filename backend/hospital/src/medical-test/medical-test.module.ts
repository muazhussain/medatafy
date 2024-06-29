import { Module } from '@nestjs/common';
import { MedicalTestService } from './services/medical-test.service';
import { MedicalTestController } from './controllers/medical-test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalTestEntity } from './entities/medical-test.entity';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalTestEntity,
    ]),
    NatsClientModule,
  ],
  providers: [MedicalTestService],
  controllers: [MedicalTestController]
})
export class MedicalTestModule { }
