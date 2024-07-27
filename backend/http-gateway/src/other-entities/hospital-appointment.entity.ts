import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PatientEntity } from "./patient.entity";
import { HospitalEntity } from "./hostpital.entity";

export enum HospitalAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity('hospital_appointment')
export class HospitalAppointmentEntity extends CommonEntity {
    @Column({
        type: 'timestamptz',
    })
    appointmentTime: Date;

    @Column({
        type: 'enum',
        enum: HospitalAppointmentStatus,
        default: HospitalAppointmentStatus.PENDING,
    })
    status: HospitalAppointmentStatus;

    @ManyToOne(() => PatientEntity, (patient) => patient.hospitalAppointments,)
    @JoinColumn({ name: 'patient_id' })
    patient: PatientEntity;

    @ManyToOne(() => HospitalEntity, (hospital) => hospital.hospitalAppointments,)
    @JoinColumn({ name: 'hospital_id' })
    hospital: HospitalEntity;
}