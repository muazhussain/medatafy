import { CommonEntity } from "src/utils/common.entity";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { DoctorEntity } from "./doctor.entity";
import { MedicalTestPrescriptionRelationEntity } from "./medical-test-prescription-relation.entity";
import { PatientEntity } from "./patient.entity";
import { MedicinePrescriptionRelationEntity } from "./medicine-prescription-relation.entity";

@Entity('prescription')
export class PrescriptionEntity extends CommonEntity {
    @Column({
        type: 'date',
    })
    date: string;

    @Column("text", {
        array: true,
        nullable: true,
    })
    chiefComplaints?: string[];

    @Column("text", {
        array: true,
        nullable: true,
    })
    advice?: string[];

    @Column({
        type: 'date',
        nullable: true,
    })
    followUp?: string;

    @ManyToOne(() => DoctorEntity, (doctor) => doctor.prescriptions,)
    @JoinColumn({ name: 'doctor_id' })
    doctor: DoctorEntity;

    @ManyToOne(() => PatientEntity, (patient) => patient.prescriptions,)
    @JoinColumn({ name: 'patient_id' })
    patient: PatientEntity;

    @OneToMany(() => MedicinePrescriptionRelationEntity, (medicine) => medicine.prescription,)
    medicinePrescriptionRelations: MedicinePrescriptionRelationEntity[];

    @OneToMany(() => MedicalTestPrescriptionRelationEntity, (medicalTest) => medicalTest.prescription,)
    medicalTestPrescriptionRelations: MedicalTestPrescriptionRelationEntity[];
}