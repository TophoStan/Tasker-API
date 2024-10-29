import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {v4 as uuid} from 'uuid';

export type UserIdentityDocument = UserIdentity & Document;

@Schema()
export class UserIdentity {

    @Prop({type: String, default: uuid})
    id: string;

    @Prop({required: true})
    username: string;

    @Prop({required: true, unique: true})
    email: string;

    // Is a hashed password
    @Prop({required: true})
    password: string;

}

export const UserIdentitySchema = SchemaFactory.createForClass(UserIdentity);