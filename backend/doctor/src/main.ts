import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import AppDataSource from './data-source';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  await AppDataSource.initialize();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats:4222'],
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    }),
  );

  await app.listen().then(() => console.log(`Doctor Microservice is running`));
}
bootstrap();
