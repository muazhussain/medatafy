import { CommonEntity } from "src/utils/common.entity";
import { DoctorEntity } from "src/other-entities/doctor.entity";
import { PatientEntity } from "src/patient/entities/patient.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

enum DoctorAppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED_BY_PATIENT = 'cancelled_by_patient',
    CANCELLED_BY_DOCTOR = 'cancelled_by_doctor',
}

@Entity('doctor_appointment')
export class DoctorAppointmentEntity extends CommonEntity {
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