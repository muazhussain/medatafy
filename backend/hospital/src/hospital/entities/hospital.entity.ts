import { CommonEntity } from "src/Utils/common.entity";
import { MedicalTestEntity } from "src/medical-test/entities/medical-test.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('hospital')
export class HospitalEntity extends CommonEntity {
    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    website: string;

    @Column()
    bin: string;

    @Column()
    tin: string;

    @OneToMany(() => MedicalTestEntity, (test) => test.hospital)
    tests: MedicalTestEntity[];
}