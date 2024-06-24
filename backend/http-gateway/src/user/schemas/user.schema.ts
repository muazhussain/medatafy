import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AccountStatus, AccountType, Gender, UserType } from "../entities/user.entity";

@Schema({ collection: 'user' })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    uniqueId: string;

    @Prop({ required: true, enum: Gender })
    gender: Gender;

    @Prop()
    phone?: string;

    @Prop()
    dateOfBirth: string;

    @Prop()
    image?: string;

    @Prop({ required: true, enum: UserType })
    userType: UserType;

    @Prop({ required: true, enum: AccountStatus })
    accountStatus: AccountStatus;

    @Prop({ required: true, enum: AccountType })
    accountType: AccountType;
}

export const UserSchema = SchemaFactory.createForClass(User);