import { CommonEntity } from "src/utils/common.entity";
import { HospitalEntity } from "src/other-entities/hospital.entity";
import { PatientEntity } from "src/patient/entities/patient.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

export enum HospitalAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_HOSPITAL = 'cancelled_by_hospital',
}

@Entity('hospital_appointment')
export class HospitalAppointmentEntity extends CommonEntity {
    @Column({
        type: 'date',
    })
    date: string;

    @Column({
        type: 'time',
    })
    time: string;

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