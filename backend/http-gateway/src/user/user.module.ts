import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@nestjs-modules/ioredis';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { DoctorEntity } from 'src/other-entities/doctor.entity';
import { HospitalEntity } from 'src/other-entities/hostpital.entity';
import { PatientEntity } from 'src/other-entities/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      DoctorEntity,
      HospitalEntity,
      PatientEntity,
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    PassportModule,
    JwtModule.register({
      // secret: process.env.JWT_SECRET,
      secret: '1234',
      signOptions: { expiresIn: '1d' },
    }),
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
      type: 'single',
      options: {},
    }),
  ],
  controllers: [
    AuthController,
    UserController,
  ],
  providers: [
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
  ],
})
export class UserModule { }
