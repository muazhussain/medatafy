import { Module } from '@nestjs/common';
import { PrescriptionController } from './controllers/prescription.controller';
import { PrescriptionService } from './services/prescription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionEntity } from './entities/prescription.entity';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PrescriptionEntity,
    ]),
    NatsClientModule,
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService]
})
export class PrescriptionModule { }
