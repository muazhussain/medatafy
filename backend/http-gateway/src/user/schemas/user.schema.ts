import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AccountStatus, AccountType, UserType } from "../entities/user.entity";

@Schema({ collection: 'user' })
export class User {
    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: UserType })
    userType: UserType;

    @Prop({ required: true, enum: AccountStatus })
    accountStatus: AccountStatus;

    @Prop({ required: true, enum: AccountType })
    accountType: AccountType;
}

export const UserSchema = SchemaFactory.createForClass(User);