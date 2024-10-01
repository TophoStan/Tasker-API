import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mongoose, Schema as MongooseSchema } from "mongoose";
import {v4 as uuid} from 'uuid';
export type TaskDocument = Task & Document;


@Schema()
export class Task {

    @Prop({type: String, default: uuid})
    id: string;

    @Prop({required: true})
    title: string;

    @Prop({default: false, required: true})
    isCompleted: boolean;

    @Prop({default: Date.now})
    createdAt: Date;

    @Prop({default: Date.now})
    updatedAt: Date;

    @Prop({default: null})
    DateTimeToBeCompletedBy: Date;

    @Prop({default: false, required: true})
    isOverdue: boolean;

    @Prop({default: null})
    userId: string;

    @Prop({default: null, type: MongooseSchema.Types.ObjectId, ref: 'User'})
    userMongoId: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);