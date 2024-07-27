import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PrescriptionEntity } from "./prescription.entity";
import { MedicineEntity } from "./medicine.entity";

@Entity('medicine_prescription_relation')
export class MedicinePrescriptionRelationEntity extends CommonEntity {
    @ManyToOne(() => MedicineEntity, (medicine) => medicine.medicinePrescriptionRelations,)
    @JoinColumn({ name: 'medicine_id' })
    medicine: MedicineEntity;

    @ManyToOne(() => PrescriptionEntity, (prescription) => prescription.medicinePrescriptionRelations,)
    @JoinColumn({ name: 'prescription_id' })
    prescription: PrescriptionEntity;

    @Column()
    instruction: string;
}