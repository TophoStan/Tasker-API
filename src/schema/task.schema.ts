import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type taskDocument = task & Document;


@Schema()
export class task {
    @Prop()
    title: string;
}

export const taskSchema = SchemaFactory.createForClass(task);