import { HospitalEntity } from "src/hospital/entities/hospital.entity";
import { MedicalReportEntity } from "src/other-entities/medical-report.entity";
import { MedicalTestPrescriptionRelationEntity } from "src/other-entities/medical-test-prescription-relation.entity";
import { CommonEntity } from "src/utils/common.entity";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

export enum MedicalTestType {
    LAB = 'lab',
    IMAGING = 'imaging',
    OTHER = 'other',
}

@Entity('medical_test')
export class MedicalTestEntity extends CommonEntity {
    @Column()
    testName: string;

    @Column({
        enum: MedicalTestType,
        default: MedicalTestType.LAB,
    })
    testType: MedicalTestType;

    @Column('float')
    cost: number;

    @ManyToOne(() => HospitalEntity, (hospital) => hospital.medicalTests,)
    @JoinColumn({ name: 'hospital' })
    hospital: HospitalEntity[];

    @OneToMany(() => MedicalReportEntity, (medicalReport) => medicalReport.medicalTest,)
    medicalReports: MedicalReportEntity[];

    @OneToMany(() => MedicalTestPrescriptionRelationEntity, (medicalTestPrescriptionRelation) => medicalTestPrescriptionRelation.medicalTest,)
    medicalTestPrescriptionRelations: MedicalTestPrescriptionRelationEntity[];
}