import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { MedicalTestEntity } from "./medical-test.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { MedicalReportEntity } from "./medical-report.entity";
import { HospitalAppointmentEntity } from "./hospital-appointment.entity";

@Entity('hospital')
export class HospitalEntity extends CommonEntity {
    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

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

    @OneToOne(() => UserEntity, (user) => user.hospital,)
    user: UserEntity;

    @OneToMany(() => MedicalTestEntity, (test) => test.hospital,)
    medicalTests: MedicalTestEntity[];

    @OneToMany(() => MedicalReportEntity, (report) => report.hospital,)
    medicalReports: MedicalReportEntity[];

    @OneToMany(() => HospitalAppointmentEntity, (appointment) => appointment.hospital,)
    hospitalAppointments: HospitalAppointmentEntity[];
}