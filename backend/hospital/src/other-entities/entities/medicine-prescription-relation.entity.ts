import { CommonEntity } from "src/utils/common.entity";
import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { MedicineEntity } from "./medicine.entity";
import { PrescriptionEntity } from "./prescription.entity";

@Entity('medicine_prescription_relation')
export class MedicinePrescriptionRelationEntity extends CommonEntity {
    @ManyToOne(() => MedicineEntity, (medicine) => medicine.medicinePrescriptionRelations,)
    @JoinColumn({ name: 'medicine_id' })
    medicine: MedicineEntity;

    @ManyToOne(() => PrescriptionEntity, (prescription) => prescription.medicinePrescriptionRelations,)
    @JoinColumn({ name: 'prescription_id' })
    prescription: PrescriptionEntity;

    @Column({
        nullable: true,
    })
    instruction?: string;
}