import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppDataSource from './data-source';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
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
  await app.listen().then(() => console.log(`Hospital Microservice is running`));
}
bootstrap();
