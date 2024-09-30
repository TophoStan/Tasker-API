import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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

}

export const TaskSchema = SchemaFactory.createForClass(Task);