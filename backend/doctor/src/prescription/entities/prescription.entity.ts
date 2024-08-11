import { CommonEntity } from "src/utils/common.entity";
import { MedicinePrescriptionRelationEntity } from "src/other-entities/entities/medicine-prescription-relation.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { DoctorEntity } from "src/doctor/entities/doctor.entity";
import { PatientEntity } from "src/other-entities/entities/patient.entity";
import { MedicalTestPrescriptionRelationEntity } from "src/other-entities/entities/medical-test-prescription-relation.entity";

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