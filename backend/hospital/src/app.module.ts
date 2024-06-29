import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalModule } from './hospital/hospital.module';
import { MedicalTestModule as MedicalTestModule } from './medical-test/medical-test.module';
import { NatsClientModule } from './nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'muaz',
      password: '123',
      database: 'medatafy_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HospitalModule,
    MedicalTestModule,
    NatsClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
