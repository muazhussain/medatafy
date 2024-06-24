import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    uniqueId: string;

    @Expose()
    gender: string;

    @Expose()
    phone: string;

    @Expose()
    dateOfBirth: string;

    @Expose()
    image: string;

    @Expose()
    userType: string;
}