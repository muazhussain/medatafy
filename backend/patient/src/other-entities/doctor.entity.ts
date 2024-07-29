import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { MedicalReportEntity } from "src/medical-report/entities/medical-report.entity";
import { DoctorAppointmentEntity } from "src/doctor-appointment/entities/doctor-appointment.entity";
import { PrescriptionEntity } from "src/prescription/entities/prescription.entity";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

@Entity('doctor')
export class DoctorEntity extends CommonEntity {
    @Column()
    name: string;

    @Column({
        unique: true,
    })
    bmdcRegNo: string;

    @Column({
        type: 'enum',
        enum: Gender
    })
    gender: Gender;

    @Column()
    phone: string;

    @Column({
        type: 'date',
    })
    dateOfBirth: string;

    @Column()
    image: string;

    @Column()
    speciality: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    officeHours?: string;

    @OneToOne(() => UserEntity, (user) => user.doctor,)
    user: UserEntity;

    @OneToMany(() => MedicalReportEntity, (medicalReport) => medicalReport.doctor,)
    medicalReports: MedicalReportEntity[];

    @OneToMany(() => DoctorAppointmentEntity, (doctorAppointment) => doctorAppointment.doctor,)
    doctorAppointments: DoctorAppointmentEntity[];

    @OneToMany(() => PrescriptionEntity, (prescription) => prescription.doctor,)
    prescriptions: PrescriptionEntity[];
}