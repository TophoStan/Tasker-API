import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {v4 as uuid} from 'uuid';
export type TaskDocument = Task & Document;


@Schema()
export class Task {

    @Prop({type: String, default: uuid})
    id: string;

    @Prop()
    title: string;

    @Prop({default: false})
    isFinished: boolean;

}

export const TaskSchema = SchemaFactory.createForClass(Task);