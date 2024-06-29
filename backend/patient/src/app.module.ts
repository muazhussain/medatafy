import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
