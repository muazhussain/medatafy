import { CommonEntity } from "src/utils/common.entity";
import { DoctorEntity } from "src/other-entities/doctor.entity";
import { MedicinePrescriptionRelationEntity } from "src/other-entities/medicine-prescription-relation.entity";
import { PatientEntity } from "src/patient/entities/patient.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { MedicalTestPrescriptionRelationEntity } from "src/other-entities/medical-test-prescription-relation.entity";

@Entity('prescription')
export class PrescriptionEntity extends CommonEntity {
    @Column({
        type: 'date',
    })
    date: string;

    @Column({
        nullable: true,
    })
    chiefComplaints?: string[];

    @Column({
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