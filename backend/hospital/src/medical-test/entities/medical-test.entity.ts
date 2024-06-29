import { CommonEntity } from "src/Utils/common.entity";
import { HospitalEntity } from "src/hospital/entities/hospital.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

export enum MedicalTestType {
    LAB = 'lab',
    IMAGING = 'imaging',
    OTHER = 'other',
}

@Entity('test')
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

    @ManyToOne(() => HospitalEntity, (hospital) => hospital.tests,)
    @JoinColumn({ name: 'hospital' })
    hospital: HospitalEntity[];
}