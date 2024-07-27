import { HospitalEntity } from "src/hospital/entities/hospital.entity";
import { MedicalTestEntity } from "src/medical-test/entities/medical-test.entity";
import { CommonEntity } from "src/utils/common.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { DoctorEntity } from "./doctor.entity";
import { PatientEntity } from "./patient.entity";

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

    @ManyToOne(() => MedicalTestEntity, (medicalTest) => medicalTest.hospital,)
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