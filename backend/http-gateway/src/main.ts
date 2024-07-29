import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import AppDataSource from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    }),
  );

  app.enableCors({ exposedHeaders: ['Content-Disposition'] });

  // Docker
  const basicAuthUser = process.env.BASIC_AUTH_USER;
  const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD;

  // Local
  // const basicAuthUser = 'medatafy_api';
  // const basicAuthPassword = '1234';

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [basicAuthUser]: basicAuthPassword,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'MEDATAFY API')
    .setDescription(process.env.SWAGGER_DESCRIPTION || 'MEDATAFY Backend API')
    .setVersion(process.env.SWAGGER_VERSION || '1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      caches: 'no-cache',
    },
  });

  await AppDataSource.initialize();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT).then(() => console.log(`"HTTP Gateway" listening on port ${PORT}`));
}
bootstrap();
