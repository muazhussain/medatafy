import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PatientEntity } from "src/other-entities/patient.entity";
import { DoctorEntity } from "./doctor.entity";
import { MedicinePrescriptionRelationEntity } from "./medicine-prescription-relation.entity";
import { MedicalTestPrescriptionRelationEntity } from "./medical-test-prescription-relation.entity";

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