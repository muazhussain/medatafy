import { DoctorEntity } from "src/doctor/entities/doctor.entity";
import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { PatientEntity } from "./patient.entity";

export enum UserType {
    PATIENT = 'patient',
    DOCTOR = 'doctor',
    HOSPITAL_ADMIN = 'hospitalAdmin',
    HOSPITAL_EMPLOYEE = 'hospitalEmployee',
}

export enum AccountStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export enum AccountType {
    FREE = 'free',
    PREMIUM = 'premium',
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

@Entity('user')
export class UserEntity extends CommonEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    uniqueId: string;

    @Column({
        type: 'enum',
        enum: Gender
    })
    gender: Gender;

    @Column({ nullable: true })
    phone?: string;

    @Column()
    dateOfBirth: string;

    @Column({ nullable: true })
    image?: string;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.PATIENT
    })
    userType: UserType;

    @Column({
        type: 'enum',
        enum: AccountStatus,
        default: AccountStatus.PENDING
    })
    accountStatus: AccountStatus;

    @Column({
        type: 'enum',
        enum: AccountType,
        default: AccountType.FREE
    })
    accountType: AccountType;

    @Column({ nullable: true })
    mongoRef?: string;

    @OneToOne(() => DoctorEntity, doctor => doctor.user)
    doctor: DoctorEntity;

    @OneToOne(() => PatientEntity, patient => patient.user,)
    patient: PatientEntity;
}