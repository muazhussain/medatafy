import { Expose, Type } from "class-transformer";

class Doctor {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    bmdcRegNo: string;

    @Expose()
    gender: string;

    @Expose()
    phone: string;

    @Expose()
    dateOfBirth: string;

    @Expose()
    image: string;

    @Expose()
    speciality: string;

    @Expose()
    address: string;

    @Expose()
    officeHours?: string;
}

class Hospital {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    address: string;

    @Expose()
    phone: string;

    @Expose()
    description: string;

    @Expose()
    image: string;

    @Expose()
    website: string;

    @Expose()
    bin: string;

    @Expose()
    tin: string;
}

class Patient {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    gender: string;

    @Expose()
    phone: string;

    @Expose()
    dateOfBirth: string;

    @Expose()
    image: string;

    @Expose()
    address: string;
}

class MedatafyAdmin {
    @Expose()
    id: string;

    @Expose()
    name: string;
}

export class UserDto {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    userType: string;

    @Expose()
    accountStatus: string;

    @Expose()
    accountType: string;

    @Expose()
    @Type(() => Doctor,)
    doctor?: Doctor;

    @Expose()
    @Type(() => Hospital,)
    hospital?: Hospital;

    @Expose()
    @Type(() => Patient,)
    patient?: Patient;

    @Expose()
    @Type(() => MedatafyAdmin,)
    medatafyAdmin?: MedatafyAdmin;
}