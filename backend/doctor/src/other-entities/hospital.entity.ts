import { CommonEntity } from "src/Utils/common.entity";
import { Entity, OneToMany } from "typeorm";
import { MedicalReportEntity } from "./medical-report.entity";
import { HospitalAppointmentEntity } from "./hospital-appointment.entity";

@Entity('hospital')
export class HospitalEntity extends CommonEntity {
    @OneToMany(() => MedicalReportEntity, (medicalReport) => medicalReport.hospital,)
    medicalReports: MedicalReportEntity[];

    @OneToMany(() => HospitalAppointmentEntity, (hospitalAppointment) => hospitalAppointment.hospital,)
    hospitalAppointments: HospitalAppointmentEntity[];
}