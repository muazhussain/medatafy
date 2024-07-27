import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppDataSource from './data-source';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log('Hospital Microservice is Running!');
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
