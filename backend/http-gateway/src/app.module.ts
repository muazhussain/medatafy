import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [
            'nats://nats'
          ],
        },
      },
    ]),
    // Docker
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.POSTGRES_HOST,
    //   port: parseInt(process.env.POSTGRES_PORT, 10),
    //   username: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRES_PASSWORD,
    //   database: process.env.POSTGRES_DB,
    //   autoLoadEntities: true,
    //   synchronize: process.env.SYNCHRONIZE === 'true',
    // }),
    // MongooseModule.forRoot(process.env.MONGODB_URL),

    // Local
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'muaz',
      password: '123',
      database: 'medatafy_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/medatafy_db'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
