import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import AppDataSource from './data-source';

async function bootstrap() {
  console.log('Doctor Microservice is Running!');
  await AppDataSource.initialize();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats'],
      },
    },
  );
  await app.listen();
}
bootstrap();
