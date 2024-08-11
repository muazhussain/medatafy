import { UserEntity } from "src/user/entities/user.entity";
import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity('medatafy_admin')
export class MedatafyAdminEntity extends CommonEntity {
    @Column()
    name: string;

    @OneToOne(() => UserEntity, (user) => user.medatafyAdmin,)
    user: UserEntity;
}