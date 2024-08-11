import { CommonEntity } from "src/utils/common.entity";
import { Entity, Column, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('medatafy_admin')
export class MedatafyAdminEntity extends CommonEntity {
    @Column()
    name: string;

    @OneToOne(() => UserEntity, (user) => user.medatafyAdmin,)
    user: UserEntity;
}