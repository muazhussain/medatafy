import { CommonEntity } from "src/Utils/common.entity";
import { DoctorEntity } from "src/other-entities/doctor.entity";
import { PatientEntity } from "src/patient/entities/patient.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

export enum AppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity('appointment')
export class AppointmentEntity extends CommonEntity {
    @Column({
        type: 'timestamptz',
    })
    appointmentTime: Date;

    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.PENDING,
    })
    status: AppointmentStatus;

    @ManyToOne(() => PatientEntity, (patient) => patient.appointments,)
    @JoinColumn({ name: 'patient_id' })
    patient: PatientEntity;

    @ManyToOne(() => DoctorEntity, (doctor) => doctor.appointments,)
    @JoinColumn({ name: 'doctor_id' })
    doctor: DoctorEntity;
}