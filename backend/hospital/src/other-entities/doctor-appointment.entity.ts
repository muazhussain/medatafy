import { CommonEntity } from "src/utils/common.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { DoctorEntity } from "./doctor.entity";
import { PatientEntity } from "./patient.entity";


export enum DoctorAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity('doctor_appointment')
export class DoctorAppointmentEntity extends CommonEntity {
    @Column({
        type: 'timestamptz',
    })
    appointmentTime: Date;

    @Column({
        type: 'enum',
        enum: DoctorAppointmentStatus,
        default: DoctorAppointmentStatus.PENDING,
    })
    status: DoctorAppointmentStatus;

    @ManyToOne(() => PatientEntity, (patient) => patient.doctorAppointments,)
    @JoinColumn({ name: 'patient_id' })
    patient: PatientEntity;

    @ManyToOne(() => DoctorEntity, (doctor) => doctor.doctorAppointments,)
    @JoinColumn({ name: 'doctor_id' })
    doctor: DoctorEntity;
}