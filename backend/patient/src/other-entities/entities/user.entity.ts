import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { DoctorEntity } from "./doctor.entity";
import { PatientEntity } from "src/patient/entities/patient.entity";
import { HospitalEntity } from "./hospital.entity";
import { MedatafyAdminEntity } from "./medatafy-admin.entity";

export enum UserType {
    MEDATAFY_ADMIN = 'medatafy_admin',
    PATIENT = 'patient',
    DOCTOR = 'doctor',
    HOSPITAL = 'hospital',
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

@Entity('user')
export class UserEntity extends CommonEntity {
    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

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

    @OneToOne(() => DoctorEntity, (doctor) => doctor.user,)
    @JoinColumn({ name: 'doctor_id' })
    doctor?: DoctorEntity;

    @OneToOne(() => HospitalEntity, (hospital) => hospital.user,)
    @JoinColumn({ name: 'hospital_id' })
    hospital?: HospitalEntity;

    @OneToOne(() => PatientEntity, (patient) => patient.user,)
    @JoinColumn({ name: 'patient_id' })
    patient?: PatientEntity;

    @OneToOne(() => MedatafyAdminEntity, (medatafyAdmin) => medatafyAdmin.user,)
    @JoinColumn({ name: 'medatafy_admin_id' })
    medatafyAdmin?: MedatafyAdminEntity;
}