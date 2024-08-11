import { CommonEntity } from "src/utils/common.entity";
import { MedicalTestEntity } from "src/medical-test/entities/medical-test.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { HospitalAppointmentEntity } from "src/hospital-appointment/entities/hospital-appointment.entity";
import { MedicalReportEntity } from "src/medical-report/entities/medical-report.entity";
import { UserEntity } from "src/other-entities/entities/user.entity";

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