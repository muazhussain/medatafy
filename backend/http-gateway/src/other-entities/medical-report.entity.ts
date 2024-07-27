import { CommonEntity } from "src/utils/common.entity";
import { MedicalTestEntity } from "src/other-entities/medical-test.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PatientEntity } from "./patient.entity";
import { DoctorEntity } from "./doctor.entity";
import { HospitalEntity } from "./hostpital.entity";

@Entity('medical_report')
export class MedicalReportEntity extends CommonEntity {
    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    issueDate?: Date;

    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    deliveryDate?: Date;

    @Column({
        nullable: true,
    })
    reportContent?: string;

    @Column({
        nullable: true,
    })
    summary?: string;

    @ManyToOne(() => MedicalTestEntity, (test) => test.medicalReports,)
    @JoinColumn({ name: 'medical_test_id' })
    medicalTest: MedicalTestEntity;

    @ManyToOne(() => PatientEntity, (patient) => patient.medicalReports,)
    @JoinColumn({ name: 'patient_id' })
    patient: PatientEntity;

    @ManyToOne(() => DoctorEntity, (doctor) => doctor.medicalReports,)
    @JoinColumn({ name: 'doctor_id' })
    doctor: DoctorEntity;

    @ManyToOne(() => HospitalEntity, (hospital) => hospital.medicalReports,)
    @JoinColumn({ name: 'hospital_id' })
    hospital: HospitalEntity;
}