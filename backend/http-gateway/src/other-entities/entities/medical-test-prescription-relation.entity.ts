import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { MedicalTestEntity } from "./medical-test.entity";
import { PrescriptionEntity } from "./prescription.entity";

@Entity('medical_test_prescription_relation')
export class MedicalTestPrescriptionRelationEntity extends CommonEntity {
    @ManyToOne(() => MedicalTestEntity, (medicalTest) => medicalTest.medicalTestPrescriptionRelations,)
    @JoinColumn({ name: 'medical_test_id' })
    medicalTest: MedicalTestEntity;

    @ManyToOne(() => PrescriptionEntity, (prescription) => prescription.medicalTestPrescriptionRelations,)
    @JoinColumn({ name: 'prescription_id' })
    prescription: PrescriptionEntity;

    @Column({
        nullable: true,
    })
    instruction?: string;
}