import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TaskDocument = Task & Document;


@Schema()
export class Task {
    @Prop()
    title: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);