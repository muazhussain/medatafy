import { DoctorAppointmentEntity } from "src/doctor-appointment/entities/doctor-appointment.entity";
import { CommonEntity } from "src/utils/common.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { MedicalReportEntity } from "./medical-report.entity";
import { UserEntity } from "./user.entity";
import { PrescriptionEntity } from "src/prescription/entities/prescription.entity";
import { HospitalAppointmentEntity } from "./hospital-appointment.entity";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

@Entity('patient')
export class PatientEntity extends CommonEntity {
    @Column()
    name: string;

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
    address: string;

    @OneToOne(() => UserEntity, (user) => user.patient,)
    user: UserEntity;

    @OneToMany(() => MedicalReportEntity, (medicalReport) => medicalReport.patient,)
    medicalReports: MedicalReportEntity[];

    @OneToMany(() => DoctorAppointmentEntity, (doctorAppointment) => doctorAppointment.patient,)
    doctorAppointments: DoctorAppointmentEntity[];

    @OneToMany(() => HospitalAppointmentEntity, (hospitalAppointment) => hospitalAppointment.patient,)
    hospitalAppointments: HospitalAppointmentEntity[];

    @OneToMany(() => PrescriptionEntity, (prescription) => prescription.patient,)
    prescriptions: PrescriptionEntity[];
}