import { CommonEntity } from "src/utils/common.entity";
import { Entity, Column, OneToMany } from "typeorm";
import { MedicinePrescriptionRelationEntity } from "./medicine-prescription-relation.entity";

@Entity('medicine')
export class MedicineEntity extends CommonEntity {
    @Column()
    name: string;

    @Column('float')
    price: number;

    @Column({
        nullable: true,
    })
    sideEffect?: string;

    @Column()
    manufacturer: string;

    @OneToMany(() => MedicinePrescriptionRelationEntity, (medicinePrescriptionRelation) => medicinePrescriptionRelation.medicine,)
    medicinePrescriptionRelations: MedicinePrescriptionRelationEntity[];
}