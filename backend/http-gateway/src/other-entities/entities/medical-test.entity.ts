import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { HospitalEntity } from "./hostpital.entity";
import { MedicalReportEntity } from "./medical-report.entity";
import { MedicalTestPrescriptionRelationEntity } from "./medical-test-prescription-relation.entity";

enum MedicalTestType {
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