import { CommonEntity } from "src/utils/common.entity";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { DoctorEntity } from "./doctor.entity";
import { MedicalTestPrescriptionRelationEntity } from "./medical-test-prescription-relation.entity";
import { PatientEntity } from "./patient.entity";
import { MedicinePrescriptionRelationEntity } from "./medicine-prescription-relation.entity";


@Entity('prescription')
export class PrescriptionEntity extends CommonEntity {
    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    date?: Date;

    @Column({
        nullable: true,
    })
    chiefComplaints?: string[];

    @Column({
        nullable: true,
    })
    advice?: string[];

    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    followUp?: Date;

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