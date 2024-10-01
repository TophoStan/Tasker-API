import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {v4 as uuid} from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({type: String, default: uuid})
    id: string;

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    email: string;

}

export const UserSchema = SchemaFactory.createForClass(User);